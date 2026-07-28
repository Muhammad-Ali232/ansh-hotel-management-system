import { ObjectId } from "mongodb";
import { database } from "../connection/connection.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const SignUp = async (req, res) => {
  try {
    const { username, email, phone, dob, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const profilePicUrl = req.file ? req.file.path : null; // Cloudinary URL
    const guestRole = await database.collection("roles").findOne({ roleName: "Guest" });

    if (!guestRole) {
      return res.status(400).json({ message: "Guest role not found" });
    }

    const result = await database.collection('users').insertOne({
      Username: username,
      Email: email,
      Phone: phone,
      DOB: dob, 
      Password: passwordHash,
      profilePic: profilePicUrl,
      CreatedAt: new Date(),
      roleId: guestRole._id,
      Status: "active"
    });

    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (e) {
    console.error('Signup Error:', e);
    res.status(500).json({ message: 'Server error' });
  }
};


export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await database.collection('users').findOne({ Email: email });
    if (!user) {
      return res.json({ success: false, message: "Email not found" });
    }


    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }


    const role = await database.collection('roles').findOne({ _id: user.roleId });
    if (!role) {
      return res.json({ success: false, message: "Role not assigned. Contact admin." });
    }


    const token = jwt.sign(
      { userId: user._id, roleName: role.roleName }, 
      "secretkey",
      { expiresIn: "1h" }
    );

  
return res.json({
  success: true,
  message: "Logged in successfully",
  token, // ✅ yahan
  user: {
    _id: user._id,
    username: user.Username,
    email: user.Email,
    phone: user.Phone, // 👉 add this
    roleName: role.roleName,
    image: user.profilePic
  }
});

  } catch (error) {
    console.error('SignIn Error:', error);
    return res.json({ success: false, message: "Server error, please try again" });
  }
};



export const AddRole = async (req, res) => {

    try{
        const {rolename, roledescription} = req.body;
         const existingRole = await database.collection('roles').findOne({
      roleName: rolename
    });

    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }
        await database.collection('roles').insertOne({
            roleName: rolename,
            roleDescription: roledescription,
        })
        res.status(200).json({ success: true, message: "Role added successfully" });
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const ViewRole = async (req, res) => {

    try{
        const roles = await database.collection('roles')
        .find({}).toArray();
        
        res.status(200).json(roles);
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const DeleteRole = async (req, res) => {
    try{
        const id = req.params.id;
        await database.collection("roles").deleteOne({
            _id: new ObjectId(id)
        });
        
        res.send("Role Deleted")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}


export const EditRole = async (req, res) => {
    try {
        const id = req.params.id;
        const {rolename, roledescription } = req.body;

        await database.collection("roles").updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                roleName: rolename,
                roleDescription: roledescription,
            }}
        );

        res.send("Role Updated Successfully");
    } catch (error) {
        console.log(error),
        res.status(500).send("Error updating role: ")
    }
}

export const ViewSingleRole = async (req, res) => {
  try {
    const { id } = req.params; 

    const role = await database.collection('roles')
    .findOne({ _id: new ObjectId(id) });


    res.status(200).json(role);
  } catch (err) {
    console.error('Error fetching single role:', err);
    res.status(500).json({ message: 'Server error' });
  }
}


export const AddServiceCo = async (req, res) => {

    try{
        const {username, email, password, roleId} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        await database.collection('users').insertOne({
            Username: username,
            Email: email,
            Password: passwordHash,
            roleId: roleId,
            Status: "active"
        })
        res.status(200).json({ success: true, message: "Role added successfully" });
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}


export const ViewServiceCo = async (req, res) => {

  try {
    const users = await database.collection('users').aggregate([
      
      // 🔹 roleId ko ObjectId me convert karo (agar string hai)
      {
        $addFields: {
          roleObjId: { $toObjectId: "$roleId" }
        }
      },

      // 🔹 JOIN with roles collection
      {
        $lookup: {
          from: "roles",
          localField: "roleObjId",
          foreignField: "_id",
          as: "roleData"
        }
      },

      // 🔹 unwind (array ko object banao)
      {
        $unwind: {
          path: "$roleData",
          preserveNullAndEmptyArrays: true
        }
      },

      // 🔹 final fields
      {
        $project: {
          Username: 1,
          Email: 1,
          profilePic: 1,
          roleName: "$roleData.roleName"
        }
      }

    ]).toArray();
        
        res.status(200).json(users);
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}


export const DeleteServiceCo = async (req, res) => {
    try{
        const id = req.params.id;
        await database.collection("users").deleteOne({
            _id: new ObjectId(id)
        });
        
        res.send("User Deleted")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}


export const AddRoom = async (req, res) => {
  try {
    const { name, price, size, capacity, bed, services, roomtype } = req.body;
    
    const roomPic = req.file ? req.file.path : null;  // multer ke through file save hui ho to filename
    

    await database.collection('rooms').insertOne({
      name,
      roomtype,
      price,
      size,
      capacity,
      bed,
      services,
      roomPic,
      status: "active", // default status
      createdAt: new Date()
    });

    res.status(200).json({ success: true, message: "Room added successfully" });
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


export const UserProfile = async (req, res) => {
 try {

    const userId = req.params.id;

    // STEP 1: Get User
    const user = await database.collection("users").findOne({
      _id: new ObjectId(userId)
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // STEP 2: Get Role using user.role
    const role = await database.collection("roles").findOne({
      _id: new ObjectId(user.roleId)
    });

    // STEP 3: Add roleName in response
    res.status(200).json({
      success: true,
      data: {
        ...user,
        roleName: role?.roleName || "No Role"
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}

export const EditAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Debug logs
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let updatedData = {
  Username: req.body.Username,
  Email: req.body.Email,
  Phone: req.body.Phone,
  DOB: req.body.DOB,
  Status: req.body.Status,
};

    // 🔥 If new image uploaded (Cloudinary URL already in req.file.path)
    if (req.file) {
      updatedData.profilePic = req.file.path;
    }

    // 🔥 MongoDB update
    const result = await database.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully ❤️",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found or not updated",
      });
    }

  } catch (error) {
    console.log("🔥 Update Error Full:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ViewRoomListing = async (req, res) => {
  try {

    const { type } = req.query; // 👈 NEW FILTER

    let pipeline = [

      {
        $addFields: {
          roomtype: { $toObjectId: "$roomtype" }
        }
      },

      {
        $lookup: {
          from: "roomtypes",
          localField: "roomtype",
          foreignField: "_id",
          as: "roomtype"
        }
      },

      {
        $unwind: {
          path: "$roomtype",
          preserveNullAndEmptyArrays: true
        }
      }

    ];

    // 🔥 FILTER ADD (safe)
    if (type) {
      pipeline.push({
        $match: {
          "roomtype.typeName": {
            $regex: new RegExp(type, "i") 
          }
        }
      });
    }

    const rooms = await database.collection("rooms")
      .aggregate(pipeline)
      .toArray();

    res.status(200).json(rooms);

  } catch (e) {
    console.log("Error: ", e);
    res.status(500).json({ error: "Server Error" });
  }
};

export const DeleteRoomListing = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await database.collection("rooms").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Room deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

  } catch (e) {
    console.log("Delete Error:", e);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const EditRoomListing = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Debug logs (VERY IMPORTANT)
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // 🔥 Safe update object
    let updatedData = {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      capacity: req.body.capacity,
      bed: req.body.bed,
      services: req.body.services,
      roomtype: req.body.roomtype
    };

    // 🔥 If new image uploaded (Cloudinary)
    if (req.file) {
      updatedData.roomPic = req.file.path; 
      // 👆 Cloudinary URL aati hai req.file.path me
    }

    // 🔥 MongoDB update
    const result = await database.collection("rooms").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Room updated successfully ❤️",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Room not found or not updated",
      });
    }

  } catch (e) {
    console.log("🔥 Update Error Full:", e);

    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// export const GetSingleRoom = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const room = await database.collection("rooms").findOne({
//       _id: new ObjectId(id),
//     });

//     res.status(200).json({
//       success: true,
//       room,
//     });

//   } catch (e) {
//     console.log("Single Room Error:", e);
//   }
// };

export const ViewSingleRoomListing = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await database.collection("rooms").aggregate([
      {
        $match: {
          _id: new ObjectId(id)
        }
      },
      {
        $addFields: {
          roomtype: { $toObjectId: "$roomtype" }
        }
      },
      {
        $lookup: {
          from: "roomtypes",
          localField: "roomtype",
          foreignField: "_id",
          as: "roomtype"
        }
      },
      {
        $unwind: {
          path: "$roomtype",
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();

    res.status(200).json({
      success: true,
      room: room[0]  
    });

  } catch (e) {
    console.log("Single Room Error:", e);
    res.status(500).json({ success: false });
  }
}


export const AddRoomType = async (req, res) => {

    try{
        const { typename } = req.body;
        await database.collection('roomtypes').insertOne({
            typeName: typename,
        })
        res.status(200).json({ success: true, message: "RoomType added successfully" });
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const ViewRoomType = async (req, res) => {

    try{
        const rt = await database.collection('roomtypes')
        .find({}).toArray();
        
        res.status(200).json(rt);
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const DeleteRoomType = async (req, res) => {
    try{
        const id = req.params.id;
        await database.collection("roomtypes").deleteOne({
            _id: new ObjectId(id)
        });
        
        res.send("Room Type Deleted")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}


export const EditRoomType = async (req, res) => {
    try {
        const id = req.params.id;
        const { typename } = req.body;

        await database.collection("roomtypes").updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                typeName: typename
            }}
        );

        res.send("Room Type Updated Successfully");
    } catch (error) {
        console.log(error),
        res.status(500).send("Error updating room type: ")
    }
}


export const ViewSingleRoomType = async (req, res) => {
  try {
    const { id } = req.params; 

    const rt = await database.collection('roomtypes')
    .findOne({ _id: new ObjectId(id) });


    res.status(200).json(rt);
  } catch (err) {
    console.error('Error fetching single room type:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const EditUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Debug logs
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // 🔥 Safe update object
    let updatedData = {
      Username: req.body.Username,
      Email: req.body.Email,
    };

    if (req.file) {
      updatedData.profilePic = req.file.path;
    }

    const result = await database.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully ❤️",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found or not updated",
      });
    }

  } catch (error) {
    console.log("🔥 Update Error Full:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const SaveContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).send("All fields required");
    }

    await database.collection("contacts").insertOne({
      username,
      email,
      message,
      createdAt: new Date()
    });

    res.send("Message Saved Successfully ✅");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving contact");
  }
};

export const ViewContactList = async (req, res) => {
  try {
    const contacts = await database
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(contacts);
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).send("Error fetching contacts");
  }
};

export const DeleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    await database.collection("contacts").deleteOne({
      _id: new ObjectId(id)
    });

    res.send("Contact Deleted Successfully ✅");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting contact");
  }
}


export const AddService = async (req, res) => {

    try{
        const { servicename, servicedescription, serviceprice } = req.body;
        await database.collection('services').insertOne({
            serviceName: servicename,
            serviceDescription: servicedescription,
            servicePrice: serviceprice,
        })
        res.status(200).json({ success: true, message: "Service added successfully" });
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const ViewServices = async (req, res) => {

    try{
        const services = await database.collection('services')
        .find({}).toArray();
        
        res.status(200).json(services);
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}

export const DeleteService = async (req, res) => {
    try{
        const id = req.params.id;
        await database.collection("services").deleteOne({
            _id: new ObjectId(id)
        });
        
        res.send("Service Deleted")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}


export const EditService = async (req, res) => {
    try {
        const id = req.params.id;
        const {servicename, servicedescription, serviceprice } = req.body;

        await database.collection("services").updateOne(
            {_id: new ObjectId(id)},
            {$set: {
            serviceName: servicename,
            serviceDescription: servicedescription,
            servicePrice: serviceprice,
            }}
        );

        res.send("Service Updated Successfully");
    } catch (error) {
        console.log(error),
        res.status(500).send("Error updating service: ")
    }
}

export const ViewSingleService = async (req, res) => {
  try {
    const { id } = req.params; 

    const service = await database.collection('services')
    .findOne({ _id: new ObjectId(id) });


    res.status(200).json(service);
  } catch (err) {
    console.error('Error fetching single service:', err);
    res.status(500).json({ message: 'Server error' });
  }
}


export const CreateReservation = async (req, res) => {
  try {
    const { userId, roomId, email, phone , checkInDate, checkOutDate, totalAmount, services, paymentMethod } = req.body;

    if (!userId || !roomId) {
      return res.json({
        success: false,
        message: "Missing userId or roomId"
      });
    }

    const result = await database.collection('reservations').insertOne({
      userId,
      roomId,
      email,
      phone,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalAmount,
      services: services || [],
      paymentMethod: paymentMethod || "cash",
      status: "Pending",
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: "Reservation created",
      id: result.insertedId
    });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error creating reservation" });
  }
}


export const RoomAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut, guests } = req.body;

    const checkInDate = new Date(checkIn + "T00:00:00");
    const checkOutDate = new Date(checkOut + "T00:00:00");

    const rooms = await database.collection("rooms")
      .find()
      .toArray();

    const conflictingReservations = await database.collection("reservations")
  .find({
    checkInDate: { $lt: new Date(checkOutDate) },
    checkOutDate: { $gt: new Date(checkInDate) }
  })
  .toArray();

const bookedRoomIds = conflictingReservations.map(r =>
  r.roomId.toString()
);

const availableRooms = rooms.filter(room => {
  const capacityMatch = (parseInt(room.capacity.match(/\d+/)?.[0] || 0) >= Number(guests));

  const notBooked = !bookedRoomIds.includes(room._id.toString());

  return capacityMatch && notBooked;
});

    // 🔥 YAHAN LOGS ADD KARO
    console.log("Guests:", guests);
    console.log("Rooms Found:", rooms.length);
    console.log("Conflicting:", conflictingReservations.length);
    console.log("Available:", availableRooms.length);

    res.json({
      success: true,
      rooms: availableRooms
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const CheckReservation = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.json({
        success: false,
        message: "Missing required fields"
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // ================= OVERLAP LOGIC =================
    const conflict = await database.collection("reservations").findOne({
      roomId,
      status: { $ne: "Cancelled" }, // optional safety
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn }
        }
      ]
    });

    if (conflict) {
      return res.json({
        success: true,
        conflict: true,
        message: "Room already booked for selected dates"
      });
    }

    return res.json({
      success: true,
      conflict: false,
      message: "Room is available"
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server error"
    });
  }
}


export const ViewReservation = async (req, res) => {
    try {
        const reservations = await database.collection('reservations').aggregate([
            {
                $addFields: {
                    userObjectId: {
                        $toObjectId: "$userId"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",          
                    localField: "userObjectId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();

        res.status(200).json(reservations);
        console.log(reservations);

    } catch (e) {
        console.log('Error: ', e);
        res.status(500).json({ error: e.message });
    }
};


export const GetRoomBookings = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.json({
        success: false,
        message: "roomId is required"
      });
    }

    const bookings = await database
      .collection("reservations")
      .find({
        roomId,
        status: { $ne: "Cancelled" } // optional safety
      })
      .project({
        checkInDate: 1,
        checkOutDate: 1,
        _id: 0
      })
      .toArray();

    return res.json({
      success: true,
      bookings
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server error"
    });
  }
}


export const CreateReview = async (req, res) => {
  try {
    const { roomId, name, email, rating, comment } = req.body;

    // validation
    if (!roomId || !name || !comment) {
      return res.json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newReview = {
      roomId,
      name,
      email: email || "",
      rating: Number(rating) || 0,
      comment,
      createdAt: new Date()
    };

    await database.collection("reviews").insertOne(newReview);

    return res.json({
      success: true,
      message: "Review added successfully"
    });

  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Server error"
    });
  }
}


export const GetRoomReviews = async (req, res) => {
  try {
    const { roomId } = req.params;

    const reviews = await database
      .collection("reviews")
      .find({ roomId })
      .sort({ createdAt: -1 })
      .toArray();

    return res.json({
      success: true,
      reviews
    });

  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error fetching reviews"
    });
  }
}


export const GetRoomRating = async (req, res) => {
  try {
    const { roomId } = req.params;

    const result = await database
      .collection("reviews")
      .aggregate([
        { $match: { roomId } },
        {
          $group: {
            _id: "$roomId",
            avgRating: { $avg: "$rating" },
            totalReviews: { $sum: 1 }
          }
        }
      ])
      .toArray();

    return res.json({
      success: true,
      data: result[0] || { avgRating: 0, totalReviews: 0 }
    });

  } catch (err) {
    console.log(err);
    return res.json({
      success: false
    });
  }
}


export const ViewAllReviews = async (req, res) => {

    try{
        const reviews = await database.collection('reviews')
        .find({}).toArray();
        
        res.status(200).json(reviews);
    }
    catch(e){
        console.log('Error: ', e);
    }
    
}


export const DeleteReview = async (req, res) => {
    try{
        const id = req.params.id;
        await database.collection("reviews").deleteOne({
            _id: new ObjectId(id)
        });
        
        res.send("Review Deleted")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}


// export const getAdminDashboard = async (req, res) => {
//   try {

//     // 🔢 TOTAL USERS
//     const totalUsers = await database.collection("users").countDocuments();

//     // 🏨 ROOMS STATS
//     const totalRooms = await database.collection("rooms").countDocuments();

//     const occupiedRooms = await database.collection("rooms").countDocuments({
//       status: "Occupied"
//     });

//     const availableRooms = await database.collection("rooms").countDocuments({
//       status: "active"
//     });

//     // 📅 RESERVATIONS STATS
//     const totalReservations = await database.collection("reservations").countDocuments();

//     const pendingReservations = await database.collection("reservations").countDocuments({
//       status: "Pending"
//     });

//     const confirmedReservations = await database.collection("reservations").countDocuments({
//       status: "Confirmed"
//     });

//     // 💰 REVENUE CALCULATION
//     const revenueAgg = await database.collection("reservations").aggregate([
//       {
//         $match: { status: "Confirmed" }
//       },
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]).toArray();

//     const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

//     // 📅 TODAY CHECKINS / CHECKOUTS
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     const todayCheckins = await database.collection("reservations").countDocuments({
//       checkInDate: { $gte: startOfDay, $lte: endOfDay }
//     });

//     const todayCheckouts = await database.collection("reservations").countDocuments({
//       checkOutDate: { $gte: startOfDay, $lte: endOfDay }
//     });

//     // 📦 FINAL RESPONSE
//     res.status(200).json({
//       totalUsers,
//       totalRooms,
//       occupiedRooms,
//       availableRooms,
//       totalReservations,
//       pendingReservations,
//       confirmedReservations,
//       totalRevenue,
//       todayCheckins,
//       todayCheckouts
//     });

//   } catch (error) {
//     console.log("Dashboard Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }


export const getAdminDashboard = async (req, res) => {
  try {
    
    // 📦 FETCH DATA
    // -------------------------
    const users = await database.collection("users").find({}).toArray();
    const rooms = await database.collection("rooms").find({}).toArray();
    const reservations = await database.collection('reservations').aggregate([
            {
                $addFields: {
                    userObjectId: {
                        $toObjectId: "$userId"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",          
                    localField: "userObjectId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();
    const maintenance = await database.collection("maintenance").find({}).toArray();

    // -------------------------
    // 🏨 ROOM STATS
    // -------------------------
    const totalRooms = rooms.length;

    const occupiedRooms = rooms.filter(
      (r) => r.status === "Occupied"
    ).length;

    const availableRooms = rooms.filter(
      (r) => r.status === "Available"
    ).length;

    const cleaningRooms = rooms.filter(
      (r) => r.status === "Cleaning"
    ).length;

    // -------------------------
    // 👤 USER STATS
    // -------------------------
    const totalUsers = users.length;

    const guests = users.filter(u => u.role === "Guest");

    // -------------------------
    // 📅 RESERVATION STATS
    // -------------------------
    const totalReservations = reservations.length;

    const pendingReservations = reservations.filter(
      (r) => r.status === "Pending"
    ).length;

    const confirmedReservations = reservations.filter(
      (r) => r.status === "Confirmed"
    ).length;

    // -------------------------
    // 💰 TOTAL REVENUE
    // -------------------------
    const totalRevenue = reservations.reduce(
      (sum, r) => sum + Number(r.totalAmount || 0),
      0
    );

    // -------------------------
    // 💸 EXPENSES (basic simulation if not stored)
    // -------------------------
    const totalExpenses = totalRevenue * 0.35;

    // -------------------------
    // 📈 REVENUE VS EXPENSES
    // -------------------------
    const revenueVsExpenses = [
      {
        label: "Hotel",
        revenue: totalRevenue,
        expenses: totalExpenses
      }
    ];

    // -------------------------
    // 📈 PROFIT TREND
    // -------------------------
    const profitTrend = [];

    const monthlyProfit = {};

    reservations.forEach((r) => {
      const month = new Date(r.createdAt).toLocaleString("default", {
        month: "short",
      });

      monthlyProfit[month] =
        (monthlyProfit[month] || 0) + Number(r.totalAmount || 0);
    });

    Object.keys(monthlyProfit).forEach((m) => {
      profitTrend.push({
        date: m,
        profit: monthlyProfit[m] * 0.65 // after expense cut
      });
    });

    // -------------------------
    // 📊 MONTHLY REVENUE CHART
    // -------------------------
    const monthlyRevenue = {};

    reservations.forEach((r) => {
      const month = new Date(r.createdAt).toLocaleString("default", {
        month: "short",
      });

      monthlyRevenue[month] =
        (monthlyRevenue[month] || 0) + Number(r.totalAmount || 0);
    });

    const revenueChart = Object.keys(monthlyRevenue).map((m) => ({
      month: m,
      revenue: monthlyRevenue[m],
    }));

    // -------------------------
    // 📊 WEEKLY BOOKINGS
    // -------------------------
    const weekly = {};

    reservations.forEach((r) => {
      const day = new Date(r.createdAt).toLocaleString("default", {
        weekday: "short",
      });

      weekly[day] = (weekly[day] || 0) + 1;
    });

    const bookingChart = Object.keys(weekly).map((d) => ({
      day: d,
      bookings: weekly[d],
    }));

    // -------------------------
    // 🏆 TOP CUSTOMERS
    // -------------------------
    const topCustomers = guests
      .map((g) => ({
        name: g.Username,
        spent: reservations
          .filter(r => r.userId?.toString() === g._id?.toString())
          .reduce((sum, r) => sum + Number(r.totalAmount || 0), 0)
      }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);

    // -------------------------
    // ⚠ PENDING PAYMENTS
    // -------------------------
    const pendingPayments = reservations
      .filter(r => r.status === "Pending")
      .map(r => ({
        guest: r.user.Username || "Guest",
        amount: r.totalAmount
      }));

    // -------------------------
    // 🧹 HOUSEKEEPING
    // -------------------------
    const roomsNeedingCleaning = rooms
      .filter(r => r.status === "Cleaning")
      .map(r => ({
        number: r.number,
        staff: r.assignedStaff || null
      }));

    // -------------------------
    // 🔧 MAINTENANCE
    // -------------------------
    const maintenanceIssues = maintenance.map(m => ({
      type: m.type,
      status: m.status,
      priority: m.priority,
      technician: m.technician || null
    }));

    const avgResolutionTime =
      maintenance.length > 0
        ? maintenance.reduce((sum, m) => sum + (m.resolutionHours || 0), 0) /
          maintenance.length
        : 0;

    // -------------------------
    // 📤 FINAL RESPONSE
    // -------------------------
    res.status(200).json({
      // cards
      totalUsers,
      totalRooms,
      occupiedRooms,
      availableRooms,
      cleaningRooms,
      totalReservations,
      pendingReservations,
      confirmedReservations,
      totalRevenue,

      // charts
      revenueChart,
      bookingChart,
      revenueVsExpenses,
      profitTrend,

      // billing intelligence
      topCustomers,
      pendingPayments,

      // operations
      roomsNeedingCleaning,
      maintenanceIssues,
      avgResolutionTime
    });

  } catch (error) {
    console.log("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}


import React, { useEffect, useState } from "react";
import AdminFooter from "../Shared/AdminFooter";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddRoom() {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);
  const [room, setRoom] = useState({
    name: "",
    price: "",
    size: "",
    capacity: "",
    bed: "",
    services: "",
    roomtype: "",
    roomPic: null,
  });

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "roomPic") {
    setRoom({ ...room, roomPic: files[0] });
  } else {
    setRoom({ ...room, [name]: value });
  }
};

  useEffect(() => {
  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewroomtype");
      setRoomTypes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTypes();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 🔹 FormData for image + other fields
    const formData = new FormData();
    formData.append("name", room.name);
    formData.append("price", room.price);
    formData.append("size", room.size);
    formData.append("capacity", room.capacity);
    formData.append("bed", room.bed);
    formData.append("services", room.services);
    formData.append("roomtype", room.roomtype);

    if (room.roomPic) {
      formData.append("roomPic", room.roomPic); // file
    }

    // 🔹 POST request to backend
    const response = await axios.post("http://localhost:3000/addroom", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      alert(`🎉 Awesome, ${room.name}! Room added successfully.`);
      // Reset form after success
      setRoom({
        name: "",
        price: "",
        size: "",
        capacity: "",
        bed: "",
        services: "",
        image: null,
      });
      navigate("/roomlisting");
    } else {
      alert("Failed to add room. Please try again.");
    }
  } catch (err) {
    console.log("AddRoom error:", err);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Modernize Free</title>
      <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
      <link rel="stylesheet" href="../assets/css/styles.min.css" />

      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <AdminSidebar />
        <div className="body-wrapper">
          <AdminHeader />

          <div className="container-fluid">
            <div className="position-relative mb-4">
              <h3 className="text-center fw-bold">Add New Room</h3>
              <Link to="/roomlisting" className="btn btn-secondary position-absolute end-0 top-0"> Back </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Room Name</label>
                        <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Premium King Room" value={room.name} required />
                      </div>

                      <div className="mb-3">
  <label className="form-label fw-semibold">Room Type</label>

  <select
    name="roomtype"
    className="form-control"
    onChange={handleChange}
    // value={room.roomtype}
    required
  >
    <option value="">Select Room Type</option>

    {roomTypes.map((type) => (
      <option key={type._id} value={type._id}>
        {type.typeName}
      </option>
    ))}
  </select>
</div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Price per Night ($)</label>
                        <input type="number" name="price" onChange={handleChange} className="form-control" placeholder="159" value={room.price} required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Room Size</label>
                        <input type="text" name="size" onChange={handleChange} className="form-control" placeholder="30 ft" value={room.size} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Capacity</label>
                        <input type="text" name="capacity" onChange={handleChange} className="form-control" placeholder="Max person 3" value={room.capacity} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Bed Type</label>
                        <input type="text" name="bed" onChange={handleChange} className="form-control" placeholder="King Beds" value={room.bed} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Services</label>
                        <input type="text" name="services" onChange={handleChange} className="form-control" placeholder="Wifi, Television, Bathroom,..." value={room.services} />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">Room Image</label>
                        <input type="file" name="roomPic" accept="image/*" onChange={handleChange} className="form-control" />
                      </div>

                      <div className="d-flex justify-content-between">
                        <button type="reset" className="btn btn-light">Reset</button>
                        <button type="submit" className="btn btn-primary">Save Room</button>
                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
import React, { useEffect, useState } from "react";
import AdminFooter from "../Shared/AdminFooter";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditRoomListing() {
  const { id } = useParams();
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

  const [preview, setPreview] = useState("");

  // ================= FETCH SINGLE ROOM =================
  useEffect(() => {
    fetchSingleRoom();
    fetchRoomTypes();
  }, []);


  const fetchRoomTypes = async () => {
  try {
    const res = await axios.get("http://localhost:3000/viewroomtype");
    setRoomTypes(res.data);
  } catch (err) {
    console.log(err);
  }
};


  const fetchSingleRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/viewroomlisting/${id}`
      );

      if (response.data.success) {
        const data = response.data.room;

        setRoom({
          name: data.name || "",
          price: data.price || "",
          size: data.size || "",
          capacity: data.capacity || "",
          bed: data.bed || "",
          services: data.services || "",
          roomPic: data.roomPic || null,
          roomtype: data.roomtype || ""
        });

        // 🔥 Cloudinary direct URL (IMPORTANT FIX)
        setPreview(data.roomPic || "");
      }
    } catch (err) {
      console.log("Fetch Single Room Error:", err);
    }
  };

  // ================= TEXT INPUT =================
  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setRoom({
      ...room,
      roomPic: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // ================= UPDATE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", room.name);
      formData.append("price", room.price);
      formData.append("size", room.size);
      formData.append("capacity", room.capacity);
      formData.append("bed", room.bed);
      formData.append("services", room.services);
      formData.append("roomtype", room.roomtype);

      // 🔥 Cloudinary image only if new file selected
      if (room.roomPic instanceof File) {
        formData.append("roomPic", room.roomPic);
      }

      const response = await axios.put(
        `http://localhost:3000/editroomlisting/${id}`,
        formData
      );

      if (response.data.success) {
        alert("Room Updated Successfully ❤️");
        navigate("/roomlisting");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.log("Update Error:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Edit Role</title>
      <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
      <link rel="stylesheet" href="../assets/css/styles.min.css" />

      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <AdminSidebar />
        <div className="body-wrapper">
          <AdminHeader />

          <div className="container-fluid">

            <div className="position-relative mb-4">
              <h3 className="text-center fw-bold">Edit Room</h3>

              <Link
                to="/roomlisting"
                className="btn btn-secondary position-absolute end-0 top-0"
              >
                Back
              </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-6">

                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    {/* IMAGE PREVIEW (FIXED CLOUDINARY) */}
                    {preview && (
                      <div className="mb-3 text-center">
                        <img
                          src={preview}
                          alt="room"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>

                      <div className="mb-3">
                        <label>Room Name</label>
                        <input
                          type="text"
                          name="name"
                          value={room.name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>


                      <div className="mb-3">
  <label>Room Type</label>

  <select
    name="roomtype"
    className="form-control"
    value={room.roomtype}
    onChange={handleChange}
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
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          value={room.price}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Size</label>
                        <input
                          type="text"
                          name="size"
                          value={room.size}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Capacity</label>
                        <input
                          type="text"
                          name="capacity"
                          value={room.capacity}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Bed</label>
                        <input
                          type="text"
                          name="bed"
                          value={room.bed}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Services</label>
                        <input
                          type="text"
                          name="services"
                          value={room.services}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Change Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="form-control"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                        Update Room
                      </button>

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

export default EditRoomListing;
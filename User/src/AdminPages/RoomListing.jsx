import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "../Shared/AdminFooter";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import { Link } from "react-router-dom";

function RoomListing() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

const fetchRooms = async () => {
  try {
    const response = await axios.get("http://localhost:3000/viewroomlisting");

    console.log(response.data);

    setRooms(response.data);

  } catch (err) {
    console.log("Fetch Rooms Error:", err);
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/deleteroomlisting/${id}`);

    alert("Room Deleted");

    fetchRooms();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div>
    <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Modernize Free</title>
  <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
  <link rel="stylesheet" href="../assets/css/styles.min.css" />
  {/*  Body Wrapper */}
  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    {/* Sidebar Start */}
    <AdminSidebar />
        <div className="body-wrapper">
          <AdminHeader />

      <div className="container-fluid">
            <hr/>

                       {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div></div>

              <div>
                <h3 className="fw-bold text-center">Room Listing</h3>
              </div>

              <div>
                <Link to='/addroom' className="btn btn-primary">
                  <i className="ti ti-plus"></i> Add Room
                </Link>
              </div>
            </div>

            <div className="row align-items-stretch">

  {rooms.map((room) => (
    
    <div className="col-md-4 mb-4" key={room._id}>

      <div className="card shadow border-0 rounded-4 d-flex flex-column h-100">

        <img
          src={room.roomPic}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column h-100">

          {/* CONTENT */}
          <div className="flex-grow-1">

            <h5 className="fw-bold">{room.name}</h5>

            <p className="mb-1"><strong>Room Type:</strong> {room.roomtype.typeName}</p>
            <p className="mb-1"><strong>Price:</strong> ${room.price}</p>
            <p className="mb-1"><strong>Size:</strong> {room.size}</p>
            <p className="mb-1"><strong>Capacity:</strong> {room.capacity}</p>
            <p className="mb-1"><strong>Bed:</strong> {room.bed}</p>
            <p className="mb-2"><strong>Services:</strong> {room.services}</p>

          </div>

          {/* BUTTONS FIXED BOTTOM */}
          <div className="mt-auto d-flex gap-2">

            <Link
              to={`/editroomlisting/${room._id}`}
              className="btn btn-warning btn-sm w-50"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(room._id)}
              className="btn btn-danger btn-sm w-50"
            >
              Delete
            </button>

          </div>

        </div>
      </div>

    </div>
  ))}
</div>

            <AdminFooter />

          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomListing;
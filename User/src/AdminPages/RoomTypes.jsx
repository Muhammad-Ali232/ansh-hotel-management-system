import React, { useEffect, useState } from 'react'
import AdminHeader from '../Shared/AdminHeader'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminFooter from '../Shared/AdminFooter'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RoomTypes() {

  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room type?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deleteroomtype/${id}`);
      fetchRoomTypes();
    } catch (err) {
      console.log("Error deleting room type:", err);
      alert("Failed to delete room type.");
    }
  };

  // READ
  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/viewroomtype");
      setRoomTypes(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

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

            <hr />

            {/* Top Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <div />

              <div>
                <h3 className="fw-bold text-center">Room Types Management</h3>
              </div>

              <div>
                <NavLink to="/addroomtype" className="btn btn-primary">
                  <i className="ti ti-plus" /> Add New Room Type
                </NavLink>
              </div>

            </div>

            {/* Cards */}
            <div className="row">

              {roomTypes.map((roomtype) => (
                <div className="col-md-4 col-lg-3" key={roomtype._id}>
                  <div className="card shadow">
                    <div className="card-body text-center">

                      <h5 className="fw-semibold">
                        {roomtype.typeName}
                      </h5>

                      <div className="d-flex justify-content-center gap-2 mt-3">

                        <button
                          onClick={() => navigate(`/editroomtype/${roomtype._id}`)}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(roomtype._id)}
                          className="btn btn-sm btn-danger"
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
  )
}

export default RoomTypes
import React, { useEffect, useState } from 'react'
import AdminHeader from '../Shared/AdminHeader'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminFooter from '../Shared/AdminFooter'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ServicesCo() {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewserviceco");
      setUsers(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deleteserviceco/${id}`);
      fetchUsers();
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

            <hr />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div></div>

              <div>
                <h3 className="fw-bold text-center">Service Users</h3>
              </div>

              <div>
                <NavLink to='/addservicesco' className="btn btn-primary">
                  <i className="ti ti-plus"></i> Add User
                </NavLink>
              </div>
            </div>

            {/* Cards */}
            <div className="row">
              {users.map((user) => (
                <div className="col-md-4 col-lg-3" key={user._id}>
                  <div className="card shadow text-center p-3">

                    {/* Profile Image */}
                    <div className="mb-3">
                      <img
                        src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="profile"
                        className="rounded-circle"
                        width="80"
                        height="80"
                      />
                    </div>

                    {/* Name */}
                    <h5 className="fw-semibold">{user.Username}</h5>

                    {/* Email */}
                    <p className="text-muted mb-1">{user.Email}</p>

                    {/* Role */}
                    <span className="badge bg-info mb-2">
                      {user.roleName || "No Role"}
                    </span>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      {/* <button
                        onClick={() => navigate(`/editserviceco/${user._id}`)}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </button> */}

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
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

export default ServicesCo;
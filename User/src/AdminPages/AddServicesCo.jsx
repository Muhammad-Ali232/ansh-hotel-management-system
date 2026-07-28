import React, { useState, useEffect } from 'react'
import AdminFooter from '../Shared/AdminFooter'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminHeader from '../Shared/AdminHeader'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddServicesCo() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: ""
  });

  const [roles, setRoles] = useState([]);

  // 🔹 Fetch roles for dropdown
  useEffect(() => {
    axios.get("http://localhost:3000/viewrole")
      .then(res => {
        setRoles(res.data);
      })
      .catch(err => {
        console.log("Error fetching roles", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/addserviceco", formData);
      alert("User Added Successfully!");
      navigate('/servicesco');
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

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

            {/* Header */}
           <div className="position-relative mb-4">
             <h3 className="text-center fw-bold">Add Service User</h3> 
           <Link to="/servicesco" className="btn btn-secondary position-absolute end-0 top-0"> Back </Link> </div>

            {/* Form */}
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Create User</h4>
                      <p className="text-muted fs-3">Add service company user</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                      {/* Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter email"
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter password"
                          required
                        />
                      </div>

                      {/* Role Dropdown */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">Select Role</label>
                        <select
                          name="roleId"
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="">-- Select Role --</option>
                          {
                            roles.map((role, index) => (
                              <option key={index} value={role._id}>
                                {role.roleName}
                              </option>
                            ))
                          }
                        </select>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-between">
                        <button type="reset" className="btn btn-light">
                          Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save User
                        </button>
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
  )
}

export default AddServicesCo
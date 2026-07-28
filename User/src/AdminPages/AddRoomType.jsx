import React, { useState } from 'react'
import AdminFooter from '../Shared/AdminFooter'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminHeader from '../Shared/AdminHeader'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddRoomType() {

  const navigate = useNavigate();

  const [roomType, setRoomType] = useState({
    typename: ""
  });

  const handleChange = (e) => {
    setRoomType({ ...roomType, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/addroomtype", roomType);
      alert("Room Type Added!");
      navigate('/roomtype');
    }
    catch (e) {
      console.log("Error: ", e);
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

            {/* Top Header */}
            <div className="position-relative mb-4">
              <h3 className="text-center fw-bold">Add New Room Type</h3>

              <Link to="/roomtype" className="btn btn-secondary position-absolute end-0 top-0">
                <i className="ti ti-arrow-left" /> Back
              </Link>
            </div>

            {/* Form Card */}
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    {/* Form Title */}
                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Create Room Type</h4>
                      <p className="text-muted fs-3">Add a new room type</p>
                    </div>

                    {/* Form Start */}
                    <form onSubmit={handleSubmit}>

                      {/* Type Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Type Name</label>
                        <input
                          name="typename"
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="e.g. Single, Double, Suite"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-between">
                        <button type="reset" className="btn btn-light">
                          Reset
                        </button>

                        <button type="submit" className="btn btn-primary">
                          <i className="ti ti-device-floppy" /> Save Room Type
                        </button>
                      </div>

                    </form>
                    {/* Form End */}

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

export default AddRoomType
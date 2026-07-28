import React, { useState } from 'react'
import AdminFooter from '../Shared/AdminFooter'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminHeader from '../Shared/AdminHeader'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddService() {

  const navigate = useNavigate();

  const [service, setService] = useState({
    servicename: "",
    servicedescription: "",
    serviceprice: ""
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/addservice", service);
      alert("Service Added Successfully!");
      navigate('/services');
    } catch (error) {
      console.log("Error: ", error);
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
              <h3 className="text-center fw-bold">Add New Service</h3>
              <Link to="/services" className="btn btn-secondary position-absolute end-0 top-0">
                Back
              </Link>
            </div>

            {/* Card */}
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Create Service</h4>
                      <p className="text-muted fs-3">Add hotel services like room, food, spa etc.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                      {/* Service Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Service Name</label>
                        <input
                          name="servicename"
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Enter service name"
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                          name="servicedescription"
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Enter service description"
                          required
                        />
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Price</label>
                        <input
                          name="serviceprice"
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Enter service price range"
                          required
                        />
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-between">
                        <button type="reset" className="btn btn-light">
                          Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Service
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

export default AddService
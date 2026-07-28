import React, { useEffect, useState } from 'react'
import AdminHeader from '../Shared/AdminHeader'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminFooter from '../Shared/AdminFooter'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Services() {

  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  // Delete Service
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deleteservice/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Failed to delete service");
    }
  };

  // Fetch Services
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewservice");
      setServices(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchServices();
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

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div></div>

              <div>
                <h3 className="fw-bold text-center">Services Management</h3>
              </div>

              <div>
                <NavLink to='/addservices' className="btn btn-primary">
                  <i className="ti ti-plus" /> Add Service
                </NavLink>
              </div>
            </div>

            {/* Cards */}
<div className="row">

  {services.map((service) => (
    <div className="col-md-4 col-lg-3 mb-4" key={service._id}>

      <div
        className="card shadow border-0 h-100 d-flex flex-column"
        style={{ minHeight: "340px" }}
      >

        <div className="card-body d-flex flex-column">

          {/* NAME (TOP) */}
          <h5 className="fw-bold text-center mb-3">
            {service.serviceName}
          </h5>

          {/* BOX (ICON + DESCRIPTION) */}
          <div
            className="p-1 rounded-4 text-center mb-3"
            style={{
              background: "#f8f9fa",
              flexGrow: 1
            }}
          >
            <i
              className={`${service.icon} text-primary`}
              style={{ fontSize: "45px" }}
            ></i>

            <p className="text-muted small mt-3 mb-0">
              {service.serviceDescription}
            </p>
          </div>

          {/* PRICE */}
          <h5 className="text-success fw-bold text-center mb-3">
            {service.servicePrice}
          </h5>

          {/* BUTTONS (FIXED BOTTOM AREA) */}
          <div className="d-flex justify-content-center gap-2 mt-auto">
            <button
              onClick={() => navigate(`/editservice/${service._id}`)}
              className="btn btn-sm btn-warning"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(service._id)}
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

export default Services;
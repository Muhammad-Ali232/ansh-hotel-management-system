import React, { useState, useEffect } from 'react';
import AdminFooter from '../Shared/AdminFooter';
import AdminSidebar from '../Shared/AdminSidebar';
import AdminHeader from '../Shared/AdminHeader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditService() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [serviceData, setServiceData] = useState({
    servicename: '',
    servicedescription: '',
    serviceprice: ''
  });

  const [originalData, setOriginalData] = useState({
    servicename: '',
    servicedescription: '',
    serviceprice: ''
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewservice/${id}`);

        const data = {
          serviceName: res.data.serviceName,
          serviceDescription: res.data.serviceDescription,
          servicePrice: res.data.servicePrice,
        };

        setServiceData(data);
        setOriginalData(data);

      } catch (err) {
        console.log("Error fetching service:", err);
      }
    };

    fetchService();
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value
    });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/editservice/${id}`, serviceData);
      alert("Service updated successfully!");
      navigate("/services");
    } catch (err) {
      console.log("Update error:", err);
      alert("Failed to update service");
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
          <br/>

          <div className="container-fluid">

            {/* HEADER */}
            <div className="position-relative mb-4">
              <h3 className="text-center fw-bold">Edit Service</h3>

              <Link
                to="/services"
                className="btn btn-secondary position-absolute end-0 top-0"
              >
                <i className="ti ti-arrow-left" /> Back
              </Link>
            </div>

            {/* CARD */}
            <div className="row justify-content-center">

              <div className="col-lg-6">

                <div className="card shadow-lg border-0 rounded-3">

                  <div className="card-body p-5">

                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Update Service</h4>
                      <p className="text-muted fs-3">
                        Edit service details below
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                      {/* SERVICE NAME */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Service Name
                        </label>
                        <input
                          name="servicename"
                          onChange={handleChange}
                          value={serviceData.serviceName}
                          type="text"
                          className="form-control"
                          placeholder="Enter service name"
                        />
                      </div>
                     

                      {/* DESCRIPTION */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Description
                        </label>
                        <textarea
                          name="servicedescription"
                          onChange={handleChange}
                          value={serviceData.serviceDescription}
                          className="form-control"
                          rows={3}
                          placeholder="Enter service description"
                        />
                      </div>

                      {/* PRICE */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Price
                        </label>
                        <input
                          name="serviceprice"
                          onChange={handleChange}
                          value={serviceData.servicePrice}
                          type="text"
                          className="form-control"
                          placeholder="Enter service price"
                        />
                      </div>

                      {/* BUTTONS */}
                      <div className="d-flex justify-content-between">

                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => setServiceData(originalData)}
                        >
                          Reset
                        </button>

                        <button type="submit" className="btn btn-primary">
                          <i className="ti ti-device-floppy" /> Update Service
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
  );
}

export default EditService;
import React, { useState, useEffect } from 'react';
import AdminFooter from '../Shared/AdminFooter';
import AdminSidebar from '../Shared/AdminSidebar';
import AdminHeader from '../Shared/AdminHeader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditRoomType() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [roomTypeData, setRoomTypeData] = useState({
    typename: ''
  });

  const [originalData, setOriginalData] = useState({
    typename: ''
  });

  // FETCH ROOM TYPE
  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewroomtype/${id}`);

        const data = {
          typename: res.data.typename || res.data.typeName || ""
        };

        setRoomTypeData(data);
        setOriginalData(data);

      } catch (err) {
        console.log("Error fetching room type:", err);
      }
    };

    fetchRoomType();
  }, [id]);

  const handleChange = (e) => {
    setRoomTypeData({ ...roomTypeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/editroomtype/${id}`, roomTypeData);
      alert("Room Type updated successfully!");
      navigate('/roomtype');
    } catch (err) {
      console.log("Error updating room type:", err);
      alert("Failed to update room type.");
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

            {/* Header */}
            <div className="position-relative mb-4">
              <h3 className="text-center fw-bold">Edit Room Type</h3>

              <Link to="/roomtype" className="btn btn-secondary position-absolute end-0 top-0">
                <i className="ti ti-arrow-left" /> Back
              </Link>
            </div>

            {/* Form Card */}
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">

                    {/* Title */}
                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Update Room Type</h4>
                      <p className="text-muted fs-3">Edit room type details</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                      {/* Type Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Type Name</label>
                        <input
                          name="typename"
                          value={roomTypeData.typename}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                        //   placeholder="e.g. Single, Double, Suite"
                        />
                      </div>


                      {/* Buttons */}
                      <div className="d-flex justify-content-between">

                        <button
                          type="reset"
                          className="btn btn-light"
                          onClick={() => setRoomTypeData(originalData)}
                        >
                          Reset
                        </button>

                        <button type="submit" className="btn btn-primary">
                          <i className="ti ti-device-floppy" /> Update Room Type
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

export default EditRoomType;
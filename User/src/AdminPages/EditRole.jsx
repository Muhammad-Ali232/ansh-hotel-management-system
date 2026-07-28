import React, { useState, useEffect } from 'react';
import AdminFooter from '../Shared/AdminFooter';
import AdminSidebar from '../Shared/AdminSidebar';
import AdminHeader from '../Shared/AdminHeader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditRole() {
  const navigate = useNavigate();
  const { id } = useParams(); // role id from URL

  const [roleData, setRoleData] = useState({
    rolename: '',
    roledescription: ''
  });
  const [originalData, setOriginalData] = useState({ 
    rolename: '', 
    roledescription: '' 
  });

  // Fetch existing role data on load
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewrole/${id}`);
        const data = {
                      rolename: res.data.roleName,
                      roledescription: res.data.roleDescription
                    };
        setRoleData(data);
        setOriginalData(data);
      } catch (err) {
        console.error('Error fetching role:', err);
      }
    };
    fetchRole();
  }, [id]);

  const handleChange = (e) => {
    setRoleData({ ...roleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/editrole/${id}`, roleData);
      alert('Role updated successfully!');
      navigate('/roles');
    } catch (err) {
      console.error('Error updating role:', err);
      alert('Failed to update role.');
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
              <h3 className="text-center fw-bold">Edit Role</h3>
              <Link to="/roles" className="btn btn-secondary position-absolute end-0 top-0">
                <i className="ti ti-arrow-left" /> Back
              </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <h4 className="fw-semibold">Update Role</h4>
                      <p className="text-muted fs-3">Edit role details below</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Role Name</label>
                        <input
                          name="rolename"
                          onChange={handleChange}
                          value={roleData.rolename}
                          type="text"
                          className="form-control"
                          placeholder="Enter role name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                          name="roledescription"
                          onChange={handleChange}
                          value={roleData.roledescription}
                          className="form-control"
                          rows={3}
                          placeholder="Enter role description"
                        />
                      </div>

                      <div className="d-flex justify-content-between">
                        <button type="reset" className="btn btn-light" onClick={() => setRoleData(originalData)}>
                          Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                          <i className="ti ti-device-floppy" /> Update Role
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

export default EditRole;
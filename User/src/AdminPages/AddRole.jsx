import React, { useState } from 'react'
import AdminFooter from '../Shared/AdminFooter'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminHeader from '../Shared/AdminHeader'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddRole() {

  const navigate = useNavigate();
  const [addRole, setAddRole] = useState({
        rolename: "",
        roledescription: ""
    });

    const handleChange = (e) => {
        setAddRole({...addRole, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/addrole", addRole);
            console.log("API Done");
            alert("Role Added!");
            navigate('/roles');
        }
        catch(e){
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
    <h3 className="text-center fw-bold">Add New Role</h3>
    <Link to="/roles" className="btn btn-secondary position-absolute end-0 top-0">
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
            <h4 className="fw-semibold">Create Role</h4>
            <p className="text-muted fs-3">Add a new role with description</p>
          </div>
          {/* Form Start */}
          <form onSubmit={handleSubmit}>
            {/* Role Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Role Name</label>
              <input name='rolename' onChange={handleChange} type="text" className="form-control" placeholder="Enter role name" />
            </div>
            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea name='roledescription' onChange={handleChange} className="form-control" rows={3} placeholder="Enter role description" defaultValue={""} />
            </div>
            {/* Permissions */}
            {/* <div className="mb-4">
              <label className="form-label fw-semibold">Permissions</label>
              <div className="row">
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="p1" />
                    <label className="form-check-label">Manage Users</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="p2" />
                    <label className="form-check-label">Manage Orders</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="p3" />
                    <label className="form-check-label">View Reports</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="p4" />
                    <label className="form-check-label">Manage Laundry</label>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button type="reset" className="btn btn-light">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="ti ti-device-floppy" /> Save Role
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

export default AddRole
import React, { useEffect, useState } from 'react'
import AdminHeader from '../Shared/AdminHeader'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminFooter from '../Shared/AdminFooter'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Roles() {

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    //Delete
    const handleDelete = async (id) => {
  // confirmation
  const confirmDelete = window.confirm("Are you sure you want to delete this role?");
  if (!confirmDelete) return; // agar user ne cancel kiya, exit

  try {
    await axios.delete(`http://localhost:3000/deleterole/${id}`);
    fetchRoles(); // roles refresh karo
  } catch (err) {
    console.error("Error deleting role:", err);
    alert("Failed to delete role.");
  }
};

  //Read Work
  const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:3000/viewrole");
            const data = response.data;

            setRoles(data);
            // console.log(data);
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    useEffect(() => {
        fetchRoles();
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
    {/* Empty Left Space */}
    <div />
    {/* Center Heading */}
    <div>
      <h3 className="fw-bold text-center">Roles Management</h3>
    </div>
    {/* Right Button */}
    <div>
      <NavLink to='/addrole' className="btn btn-primary">
        <i className="ti ti-plus" /> Add New Role
      </NavLink>
    </div>
  </div>
  {/* Roles Cards */}
  <div className="row">
     {roles.map((role) => (
        <div className="col-md-4 col-lg-3" key={role._id}>
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="fw-semibold">{role.roleName}</h5>
              <p className="text-muted fs-3">{role.roleDescription}</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button onClick={() => navigate(`/editrole/${role._id}`)} className="btn btn-sm btn-warning">
                  Edit</button>
                <button onClick={() => handleDelete(role._id)} className="btn btn-sm btn-danger">
                  Delete</button>
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

export default Roles
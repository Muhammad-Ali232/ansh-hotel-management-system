import React from 'react'
import { useAuth } from '../ContextApi';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
  
  const navigate = useNavigate();
  const { logout } =useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    logout();          
    // navigate("/");    
  }
  return (
<header className="app-header">
  <nav className="navbar navbar-expand-lg navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item d-block d-xl-none">
        <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
          <i className="ti ti-menu-2" />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link nav-icon-hover" href="javascript:void(0)">
          <i className="ti ti-bell-ringing" />
          <div className="notification bg-primary rounded-circle" />
        </a>
      </li>
    </ul>
    <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
      <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
  <li className="nav-item me-2">
    <span
    className="fw-bold text-primary"
    style={{ fontSize: "23px", letterSpacing: "0.9px" }}
  >
    {user?.username || "User"}
  </span>
  </li>
        <li className="nav-item dropdown">
           <a
      className="nav-link nav-icon-hover"
      href="#"
      id="drop2"
      data-bs-toggle="dropdown"
    >
      <img
        src={user?.image || "https://via.placeholder.com/35"}
        alt="user"
        width={35}
        height={35}
        style={{
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
    </a>
<div
  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
  aria-labelledby="drop2"
  style={{
    backgroundColor: "#ffffff", // ✅ white bg
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  }}
>
  <div className="message-body">
    
    <Link
      to="/adminprofile"
      className="d-flex align-items-center gap-2 dropdown-item"
      style={{
        color: "#5a4636",
        borderRadius: "6px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#EEB186";
    e.currentTarget.style.color = "#fff";

    // icon color change
    const icon = e.currentTarget.querySelector("i");
    if (icon) icon.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#5a4636";

    // icon color reset
    const icon = e.currentTarget.querySelector("i");
    if (icon) icon.style.color = "#EEB186";
  }}
    >
      <i className="ti ti-user fs-6" style={{ color: "#EEB186" }} />
      <p className="mb-0 fs-3">My Profile</p>
    </Link>

    <button
      onClick={handleLogout}
      className="btn mx-3 mt-2 d-block"
      style={{
        border: "1px solid #EEB186",
        color: "#EEB186",
        backgroundColor: "transparent"
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#EEB186";
        e.target.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#EEB186";
      }}
    >
      Logout
    </button>

  </div>
</div>
        </li>
      </ul>
    </div>
  </nav>
</header>


  )
}

export default AdminHeader
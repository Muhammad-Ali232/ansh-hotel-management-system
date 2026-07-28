import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function AdminSidebar() {
  return (
     <aside className="left-sidebar">
  {/* Sidebar scroll*/}
  <div>
    <div className="brand-logo d-flex align-items-center justify-content-between">
      <Link to="/" className="text-nowrap logo-img">
        <img src="../assets/images/logos/logo2.png" width={120} height={35} alt />
      </Link>
      <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
        <i className="ti ti-x fs-8" />
      </div>
    </div>
    {/* Sidebar navigation*/}
    <nav className="sidebar-nav scroll-sidebar" data-simplebar>
      <ul id="sidebarnav">
        <li className="nav-small-cap">
          <i className="ti ti-dots nav-small-cap-icon fs-4" />
          <span className="hide-menu">Home</span>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/adminhome" aria-expanded="false">
            <span>
              <i className="ti ti-layout-dashboard" />
            </span>
            <span className="hide-menu">Dashboard</span>
          </Link>
        </li>
        <li className="nav-small-cap">
          <i className="ti ti-dots nav-small-cap-icon fs-4" />
          <span className="hide-menu">MANAGEMENT</span>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/reservationoverview' aria-expanded="false">
            <span>
              <i className="ti ti-article" />
            </span>
            <span className="hide-menu">Reservations</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/roles' aria-expanded="false">
            <span>
              <i className="ti ti-article" />
            </span>
            <span className="hide-menu">Roles</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/servicesCo' aria-expanded="false">
            <span>
              <i className="ti ti-briefcase" />
            </span>
            <span className="hide-menu">The Service Co.</span>
          </NavLink>
        </li>
          <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/roomlisting' aria-expanded="false">
            <span>
              <i className="ti ti-bed" />
            </span>
            <span className="hide-menu">Room Listing</span>
          </NavLink>
        </li>
         <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/roomtype' aria-expanded="false">
            <span>
              <i className="ti ti-category" />
            </span>
            <span className="hide-menu">Room Types</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/contacts' aria-expanded="false">
            <span>
              <i className="ti ti-phone" />
            </span>
            <span className="hide-menu">Contacts</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/services' aria-expanded="false">
            <span>
              <i className="ti ti-phone" />
            </span>
            <span className="hide-menu">Our Services</span>
          </NavLink>
        </li>       
        <li className="sidebar-item">
          <NavLink className="sidebar-link" to='/feedbacks' aria-expanded="false">
            <span>
              <i className="ti ti-phone" />
            </span>
            <span className="hide-menu">FeedBacks</span>
          </NavLink>
        </li>       
      </ul>
    </nav>
    {/* End Sidebar navigation */}
  </div>
  {/* End Sidebar scroll*/}
</aside>

  )
}

export default AdminSidebar
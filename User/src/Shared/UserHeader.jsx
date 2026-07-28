import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../ContextApi';

function UserHeader({ onBookNowClick }) {

  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    logout();          
    // navigate("/");     
  };
  return (
<div>
  <meta charSet="UTF-8" />
  <meta name="description" content="Sona Template" />
  <meta name="keywords" content="Sona, unica, creative, html" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <link rel="icon" type="image/png" href="UserAssets/img/favicon1.png" />
  <title>ANSH_Hotel</title>
  {/* Google Font */}
  <link href="https://fonts.googleapis.com/css?family=Lora:400,700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,500,600,700&display=swap" rel="stylesheet" />
  {/* Css Styles */}
  <link rel="stylesheet" href="/UserAssets/css/bootstrap.min.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/elegant-icons.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/flaticon.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/owl.carousel.min.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/nice-select.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/jquery-ui.min.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/magnific-popup.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/slicknav.min.css" type="text/css" />
  <link rel="stylesheet" href="/UserAssets/css/style.css" type="text/css" />
  {/* Page Preloder */}
  {/* <div id="preloder">
    <div className="loader" />
  </div> */}
  {/* Offcanvas Menu Section Begin */}
  <div className="offcanvas-menu-overlay" />
  <div className="canvas-open">
    <i className="icon_menu" />
  </div>
  <div className="offcanvas-menu-wrapper">
    <div className="canvas-close">
      <i className="icon_close" />
    </div>
    {/* <div className="search-icon  search-switch">
      <i className="icon_search" />
    </div> */}
    <div className="header-configure-area">
      <div className="language-option">

  {user ? (
    <>
      {/* ✅ USER IMAGE */}
      <img
        src={user?.image || "https://via.placeholder.com/35"}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />

      {/* ✅ USER NAME */}
      <span>
        {user?.username}
        <i className="fa fa-angle-down" />
      </span>

      {/* ✅ DROPDOWN */}
      <div className="flag-dropdown">
        <ul>
          <li><Link to="/userprofile">Profile</Link></li>
          <li>
            <button onClick={handleLogout} style={{ border: "none", background: "none" }}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    // ❌ USER NOT LOGGED IN
   <Link
  to="/signin"
  className="btn btn-lg"
  style={{
    backgroundColor: "#dfa974",
    color: "#fff",
    fontWeight: "600"
  }}
>
  Login
</Link>
  )}

</div>
      <Link className="bk-btn" onClick={onBookNowClick}>Secure Your Stay</Link>
    </div>
    <nav className="mainmenu mobile-menu">
      <ul>
        <li className="active"><Link to="/">Home</Link></li>
        <li><Link to="/room">Rooms</Link>
                    <ul className="dropdown" style={{minWidth: 200}}>
                      <li><Link to="/room">All Rooms</Link></li>
                      <li><Link to="/room/standard">Standard Rooms</Link></li>
                      <li><Link to="/room/deluxe">Deluxe Rooms</Link></li>
                      <li><Link to="/room/superior">Superior Rooms</Link></li>
                      <li><Link to="/room/premium">Premium Rooms</Link></li>
                      <li><Link to="/room/suite">Suites</Link></li>
                    </ul>
                  </li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
    <div id="mobile-menu-wrap" />
    <div className="top-social">
      <a href="#"><i className="fa fa-facebook" /></a>
      <a href="#"><i className="fa fa-twitter" /></a>
      <a href="#"><i className="fa fa-tripadvisor" /></a>
      <a href="#"><i className="fa fa-instagram" /></a>
    </div>
    <ul className="top-widget">
      <li><i className="fa fa-phone" /> (12) 345 67890</li>
      <li><i className="fa fa-envelope" /> Ansh.builder@gmail.com</li>
    </ul>
  </div>
  {/* Offcanvas Menu Section End */}
  {/* Header Section Begin */}
  <header className="header-section">
    <div className="top-nav">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <ul className="tn-left">
              <li><i className="fa fa-phone" /> (12) 345 67890</li>
              <li><i className="fa fa-envelope" /> Ansh.builder@gmail.com</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="tn-right">
              <div className="top-social">
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-tripadvisor" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
              </div>
              <Link className="bk-btn" onClick={onBookNowClick}>Secure Your Stay</Link>
              <div className="language-option">

  {user ? (
    <>
      {/* ✅ USER IMAGE */}
      <img
        src={user?.image || "https://via.placeholder.com/35"}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />

      {/* ✅ USER NAME */}
      <span>
        {user?.username}
        <i className="fa fa-angle-down" />
      </span>

      {/* ✅ DROPDOWN */}
      <div className="flag-dropdown">
        <ul>
          <li><Link to="/userprofile">Profile</Link></li>
          <li>
            <button onClick={handleLogout} style={{ border: "none", background: "none" }}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    // ❌ USER NOT LOGGED IN
   <Link
  to="/signin"
  className="btn btn-lg"
  style={{
    backgroundColor: "#dfa974",
    color: "#fff",
    fontWeight: "600"
  }}
>
  Login
</Link>
  )}

</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="menu-item">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="logo">
              <Link to="/">
                <img src="../public/UserAssets/img/logo2.png" style={{ height: "30px", width: "110px" }}/>
              </Link>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="nav-menu">
              <nav className="mainmenu">
                <ul>
                  <li className="active"><Link to="/">Home</Link></li>
                  <li><Link to="/room">Rooms</Link>
                    <ul className="dropdown" style={{minWidth: 200}}>
                      <li><Link to="/room">All Rooms</Link></li>
                      <li><Link to="/room/standard">Standard Rooms</Link></li>
                      <li><Link to="/room/deluxe">Deluxe Rooms</Link></li>
                      <li><Link to="/room/superior">Superior Rooms</Link></li>
                      <li><Link to="/room/premium">Premium Rooms</Link></li>
                      <li><Link to="/room/suite">Suites</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>
              {/* <div className="nav-right search-switch">
                <i className="icon_search" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  {/* Header End */}
</div>


  )
}

export default UserHeader
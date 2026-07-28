import React from 'react'
import { Link } from 'react-router-dom'

function UserFooter() {
  return (
       <div>
  {/* Footer Section Begin */}
  <footer className="footer-section">
    <div className="container">
      <div className="footer-text">
        <div className="row">
          <div className="col-lg-4">
            <div className="ft-about">
              <div className="logo">
                <a href="#">
                  <img src="/public/UserAssets/img/logo3.png" style={{ height: "70px", width: "200px" }} />
                </a>
              </div>
              <p>We inspire and reach millions of travelers<br /> across 90 local websites</p>
              <div className="fa-social">
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-tripadvisor" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
                <a href="#"><i className="fa fa-youtube-play" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1">
            <div className="ft-contact">
              <h6>Contact Us</h6>
              <ul>
                <li>(12) 345 67890</li>
                <li>info.colorlib@gmail.com</li>
                <li>856 Cordia Extension Apt. 356, Lake, United State</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1">
            <div className="ft-newslatter">
              <h6>New latest</h6>
              <p>Get the latest updates and offers.</p>
              <form action="#" className="fn-form">
                <input type="text" placeholder="Email" />
                <button type="submit"><i className="fa fa-send" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <ul>
              <li><Link to='/contact'>Contact</Link></li>
              <li><a href="#">Terms of use</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Environmental Policy</a></li>
            </ul>
          </div>
          <div className="col-lg-5">
            <div className="co-text">
                Copyright © All rights reserved | Made with <i className="fa fa-heart" aria-hidden="true" /> by <Link to='/' target="_blank">ANSH Builders</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Footer Section End */}
  {/* Search model Begin */}
  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch"><i className="icon_close" /></div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
  {/* Search model end */}
  {/* Js Plugins */}
</div>

  )
}

export default UserFooter
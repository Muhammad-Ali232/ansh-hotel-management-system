import React from 'react'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'

function About() {
  return (
     <div>
        <UserHeader/>
  {/* Breadcrumb Section Begin */}
  <div className="breadcrumb-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-text">
            <h2>About Us</h2>
            <div className="bt-option">
              <a href="./index.html">Home</a>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Breadcrumb Section End */}
  {/* About Us Page Section Begin */}
  <section className="aboutus-page-section spad">
    <div className="container">
      <div className="about-page-text">
        <div className="row">
          <div className="col-lg-6">
            <div className="ap-title">
              <h2>Welcome To Sona.</h2>
              <p>Built in 1910 during the Belle Epoque period, this hotel is located in the center of
                Paris, with easy access to the city’s tourist attractions. It offers tastefully
                decorated rooms.</p>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <ul className="ap-services">
              <li><i className="icon_check" /> 20% Off On Accommodation.</li>
              <li><i className="icon_check" /> Complimentary Daily Breakfast</li>
              <li><i className="icon_check" /> 3 Pcs Laundry Per Day</li>
              <li><i className="icon_check" /> Free Wifi.</li>
              <li><i className="icon_check" /> Discount 20% On F&amp;B</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="about-page-services">
        <div className="row">
          <div className="col-md-4">
            <div
  className="ap-service-item"
  style={{ backgroundImage: `url('/UserAssets/img/about/about-p1.jpg')` }}
>
              <div className="api-text">
                <h3>Restaurants Services</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
           <div
  className="ap-service-item"
  style={{ backgroundImage: `url('/UserAssets/img/about/about-p2.jpg')` }}
>

              <div className="api-text">
                <h3>Travel &amp; Camping</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
  className="ap-service-item"
  style={{ backgroundImage: `url('/UserAssets/img/about/about-p3.jpg')` }}
>

              <div className="api-text">
                <h3>Event &amp; Party</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Us Page Section End */}
  {/* Video Section Begin */}
  <section
  className="video-section"
  style={{
    backgroundImage: `url('/UserAssets/img/video-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2>Our Video</h2>
        <p>Check out our latest video!</p>
      </div>
    </div>
  </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="video-text">
            <h2>Discover Our Hotel &amp; Services.</h2>
            <p>It S Hurricane Season But We Are Visiting Hilton Head Island</p>
            <a href="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup"><img src="UserAssets/img/play.png" alt /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Video Section End */}
  {/* Gallery Section Begin */}
 <section className="gallery-section spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title">
          <span>Our Gallery</span>
          <h2>Discover Our Work</h2>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-6">
        {/* Gallery Item 1 */}
        <div
          className="gallery-item"
          style={{
            backgroundImage: `url('/UserAssets/img/gallery/gallery-1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="gi-text">
            <h3>Room Luxury</h3>
          </div>
        </div>

        <div className="row mt-3">
          {/* Gallery Item 3 */}
          <div className="col-sm-6">
            <div
              className="gallery-item"
              style={{
                backgroundImage: `url('/UserAssets/img/gallery/gallery-3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="gi-text">
                <h3>Room Luxury</h3>
              </div>
            </div>
          </div>
          {/* Gallery Item 4 */}
          <div className="col-sm-6">
            <div
              className="gallery-item"
              style={{
                backgroundImage: `url('/UserAssets/img/gallery/gallery-4.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="gi-text">
                <h3>Room Luxury</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        {/* Large Gallery Item 2 */}
        <div
          className="gallery-item large-item"
          style={{
            backgroundImage: `url('/UserAssets/img/gallery/gallery-2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="gi-text">
            <h3>Room Luxury</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  {/* Gallery Section End */}
  <UserFooter/>
</div>


  )
}

export default About
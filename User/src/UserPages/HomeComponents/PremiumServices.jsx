import React from "react";
import "./PremiumServices.css";



const PremiumServices = ({ services }) => {
  return (
    <section className="premium-services-section">

      <div className="container">

        <div className="premium-services-heading">

          <span>OUR SERVICES</span>

          <h2>Luxury Amenities For Every Stay</h2>

          <p>
            From premium dining to relaxing spa treatments,
            we provide everything you need for a memorable
            hotel experience.
          </p>

        </div>

        <div className="row">

          {services.map((service, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="premium-service-card">

<h3 className="service-title">
  {service.serviceName}
</h3>

<p className="service-description">
  {service.serviceDescription}
</p>

<div className="premium-service-footer">

  <span className="service-price">
    {service.servicePrice}
  </span>

</div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default PremiumServices;
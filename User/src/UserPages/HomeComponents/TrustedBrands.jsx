import React from "react";
import "./TrustedBrands.css";

import {
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaConciergeBell,
  FaHeart,
  FaStar,
} from "react-icons/fa";

const trustItems = [
  { icon: <FaUsers />, title: "15K+ Happy Guests" },
  { icon: <FaAward />, title: "Award Winning" },
  { icon: <FaShieldAlt />, title: "Secure Booking" },
  { icon: <FaConciergeBell />, title: "24/7 Concierge" },
  { icon: <FaHeart />, title: "98% Satisfaction" },
  { icon: <FaStar />, title: "Luxury Experience" },
];

const TrustedBrands = () => {
  return (
    <section className="tb-section">

      <div className="container">

        <div className="tb-heading">

          <span>TRUSTED WORLDWIDE</span>

          <h2>Trusted by 15,000+ Happy Guests</h2>

          <p>
            Exceptional hospitality, unforgettable stays,
            and premium guest experiences.
          </p>

        </div>

        <div className="tb-slider">

          <div className="tb-track">

            {[...trustItems, ...trustItems].map((item, index) => (

              <div className="tb-card" key={index}>

                <div className="tb-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default TrustedBrands;
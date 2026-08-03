import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaAward,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

import "./HeroSection.css";

const HeroSection = () => {

  return (

    <section className="hero-v3">

      {/* Background Blur */}

      <div className="blur blur-1"></div>
      <div className="blur blur-2"></div>

      <div className="container">

        <div className="hero-wrapper">

          {/* ===========================
                  LEFT SIDE
          ============================ */}

          <div className="hero-content">

            <span className="hero-badge">

              Luxury Hotel Experience

            </span>

            <h1>

              Experience

              <span> Luxury </span>

              Beyond

              Imagination

            </h1>

            <p>

              Discover elegant rooms, premium
              hospitality, unforgettable dining
              experiences and world-class comfort
              designed for modern travelers.

            </p>

            {/* Buttons */}

            <div className="hero-buttons">

              <Link
                to="/room"
                className="gold-btn"
              >

                Explore Rooms

                <FaArrowRight/>

              </Link>

              <Link
                to="/contact"
                className="outline-btn"
              >

                Contact Us

              </Link>

            </div>

            {/* Trust Points */}

            <div className="trust-points">

              <div>

                <FaCheckCircle/>

                Best Price

              </div>

              <div>

                <FaCheckCircle/>

                Free WiFi

              </div>

              <div>

                <FaCheckCircle/>

                Breakfast Included

              </div>

            </div>

            {/* Stats */}

            <div className="hero-stats">

              <div>

                <h2>

                  15K+

                </h2>

                <p>

                  Happy Guests

                </p>

              </div>

              <div>

                <h2>

                  10+

                </h2>

                <p>

                  Years Experience

                </p>

              </div>

              <div>

                <h2>

                  4.9

                </h2>

                <p>

                  Guest Rating

                </p>

              </div>

            </div>

          </div>

          {/* ===========================
                RIGHT SIDE
          ============================ */}

          <div className="hero-image-area">

            <div className="main-image">

              <img

                src="/UserAssets/img/hero/hero-3.jpg"

                alt="Luxury Hotel"

              />

            </div>

            {/* Floating Rating */}

            <div className="rating-card">

              <FaStar/>

              <div>

                <h4>

                  4.9 Rating

                </h4>

                <p>

                  2000+ Reviews

                </p>

              </div>

            </div>

            {/* Award */}

            <div className="award-card">

              <FaAward/>

              <div>

                <h4>

                  Award Winning

                </h4>

                <p>

                  Luxury Hotel

                </p>

              </div>

            </div>

            {/* Safe Booking */}

            <div className="secure-card">

              <FaShieldAlt/>

              <div>

                <h4>

                  Secure Booking

                </h4>

                <p>

                  SSL Protected

                </p>

              </div>

            </div>

            {/* Booking Card */}

            <div className="booking-preview">

              <h3>

                Book Your Stay

              </h3>

              <p>

                Starting From

              </p>

              <h2>

                $99

                <span>

                  /Night

                </span>

              </h2>

              <Link
                to="/room"
                className="book-btn"
              >

                Reserve Now

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default HeroSection;
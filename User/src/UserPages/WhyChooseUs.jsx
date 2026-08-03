import React from "react";
import "./WhyChooseUs.css";
import { Link } from "react-router-dom";

import {
  FaStar,
  FaAward,
  FaConciergeBell,
  FaShieldAlt,
  FaUserTie,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  {
    icon: <FaConciergeBell />,
    title: "Luxury Hospitality",
    desc: "World-class hospitality with personalized services designed for your comfort.",
  },
  {
    icon: <FaAward />,
    title: "Premium Rooms",
    desc: "Elegant interiors, luxury amenities and breathtaking room experience.",
  },
  {
    icon: <FaUserTie />,
    title: "Professional Staff",
    desc: "Highly trained staff delivering exceptional guest experiences 24/7.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    desc: "Advanced security and privacy for complete peace of mind.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      {/* Decorative Background */}
      <div className="why-bg-circle circle-one"></div>
      <div className="why-bg-circle circle-two"></div>

      <div className="container">

        <div className="why-grid">

          {/* ================= LEFT ================= */}

          <div
            className="why-left"
            data-aos="fade-right"
          >

            <div className="image-stack">

              {/* Main Image */}

              <div className="main-image">

                <img
                  src="/UserAssets/img/about/about-1.jfif"
                  alt="Luxury Hotel"
                />

              </div>

              {/* Top Image */}

              <div className="floating-image top-image">

                <img
                  src="/UserAssets/img/about/about-2.jfif"
                  alt="Hotel Lobby"
                />

              </div>

              {/* Bottom Image */}

              <div className="floating-image bottom-image">

                <img
                  src="/UserAssets/img/about/about-3.jfif"
                  alt="Luxury Room"
                />

              </div>

              {/* Experience Card */}

              <div className="experience-card">

                <FaStar className="exp-star" />

                <h2>10+</h2>

                <p>Years Of Excellence</p>

              </div>

              {/* Rating Card */}

              <div className="rating-card">

                <div className="rating-top">

                  ⭐ 4.9

                </div>

                <span>
                  Based on 8,000+ Reviews
                </span>

              </div>

              {/* Award Card */}

              <div className="award-card">

                <FaAward />

                <div>

                  <h5>Award Winning</h5>

                  <p>Luxury Hotel</p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="why-right"
            data-aos="fade-left"
          >

            <span className="section-tag">

              WHY CHOOSE US

            </span>

            <h2>

              Experience Luxury
              <br />
              Beyond Expectations

            </h2>

            <p className="section-desc">

              At ANSH Hotel, we blend timeless elegance,
              world-class hospitality and modern comfort to
              create unforgettable stays for every guest.

            </p>

            {/* Feature Cards */}

            <div className="feature-grid">

              {features.map((item, index) => (

                <div
                  className="feature-card"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >

                  <div className="feature-icon">

                    {item.icon}

                  </div>

                  <div>

                    <h4>

                      {item.title}

                    </h4>

                    <p>

                      {item.desc}

                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Bottom Info */}

            <div className="bottom-box">

              <div className="bottom-icon">

                <FaCheckCircle />

              </div>

              <div>

                <h4>

                  24/7 Guest Assistance

                </h4>

                <p>

                  Dedicated support team always ready to make your stay perfect.

                </p>

              </div>

            </div>

            {/* CTA */}

            <Link
              to="/room"
              className="luxury-btn"
            >

              Explore Rooms

              <FaArrowRight />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;
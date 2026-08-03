import React from "react";
import "./BookingCTA.css";

import {
  FaStar,
  FaCheckCircle,
  FaUsers,
  FaArrowRight
} from "react-icons/fa";

const BookingCTA = ({ form, setForm, handleSearch }) => {
  return (
    <section className="booking-cta">
      <div className="booking-overlay"></div>

      <div className="container">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-lg-6">
            <div className="booking-left">

              <span className="booking-subtitle">
                BOOK YOUR STAY
              </span>

              <h2>
                Ready For Your
                <br />
                <span>Luxury Experience?</span>
              </h2>

              <p>
                Escape the ordinary and experience world-class hospitality at
                ANSH Hotel. Book your stay today and enjoy luxury, comfort and
                unforgettable memories.
              </p>

              <div className="booking-features">

                <div>
                  <FaCheckCircle />
                  <span>Best Price Guarantee</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Instant Confirmation</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Free Cancellation</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>24/7 Concierge</span>
                </div>

              </div>

              <div className="booking-stats">

                <div className="booking-stat">
                  <h3>
                    4.9 <FaStar />
                  </h3>
                  <p>Guest Rating</p>
                </div>

                <div className="booking-stat">
                  <h3>15K+</h3>
                  <p>Happy Guests</p>
                </div>

                <div className="booking-stat">
                  <h3>24/7</h3>
                  <p>Support</p>
                </div>

              </div>

              <div className="booking-image-wrapper">

                <img
                  src="/UserAssets/img/about/about-2.jpg"
                  alt="Luxury Hotel"
                  className="booking-image"
                />

                <div className="booking-badge">

                  <div className="badge-icon">
                    <FaUsers />
                  </div>

                  <div>
                    <h4>15,000+</h4>
                    <span>Happy Guests</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">

            <div className="booking-form-card">

              <div className="booking-form-header">

                <span>ONLINE RESERVATION</span>

                <h3>Book Your Stay</h3>

                <p>
                  Choose your preferred dates and enjoy a luxury experience.
                </p>

              </div>

              <form
                className="booking-form"
                onSubmit={handleSearch}
              >

                <div className="booking-input">

                  <label>Check In</label>

                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        checkIn: e.target.value
                      })
                    }
                  />

                </div>

                <div className="booking-input">

                  <label>Check Out</label>

                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        checkOut: e.target.value
                      })
                    }
                  />

                </div>

                <div className="booking-row">

                  <div className="booking-input">

                    <label>Guests</label>

                    <select
                      value={form.guests}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          guests: Number(e.target.value)
                        })
                      }
                    >

                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>

                    </select>

                  </div>

                  <div className="booking-input">

                    <label>Rooms</label>

                    <select
                      value={form.roomCount}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          roomCount: Number(e.target.value)
                        })
                      }
                    >

                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>

                    </select>

                  </div>

                </div>

                <button
                  type="submit"
                  className="booking-submit-btn"
                >
                  Check Availability
                  <FaArrowRight />
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>

      <div className="booking-glow booking-glow-1"></div>
      <div className="booking-glow booking-glow-2"></div>

    </section>
  );
};

export default BookingCTA;
import React from "react";
import { Link } from "react-router-dom";

import {
  FaUsers,
  FaBed,
  FaWifi,
  FaArrowRight,
  FaStar,
  FaFire
} from "react-icons/fa";

import "./FeaturedRooms.css";

const FeaturedRooms = ({ rooms }) => {

  return (

    <section className="featured-section">

      <div className="container">

        {/* Heading */}

        <div className="featured-heading">

          <span>
            LUXURY ACCOMMODATION
          </span>

          <h2>
            Discover Our Finest Rooms
          </h2>

          <p>

            Experience handcrafted luxury rooms
            designed for comfort, elegance and
            unforgettable stays.

          </p>

        </div>

        <div className="row">

          {

            rooms.slice(0,4).map((room)=>(

              <div
                className="col-lg-3 col-md-6"
                key={room._id}
              >

                <div className="featured-card">

                  {/* IMAGE */}

                  <div
                    className="featured-image"
                    style={{
                      backgroundImage:`url(${room.roomPic})`
                    }}
                  >

                    <div className="image-overlay"></div>

                    <div className="featured-badge">

                      <FaFire />

                      Featured

                    </div>

                    <div className="rating-badge">

                      <FaStar />

                      4.9

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="featured-content">

                    <h3>

                      {room.name}

                    </h3>

                    <h4>

                      ${room.price}

                      <span>

                        / Night

                      </span>

                    </h4>

                    <div className="room-meta">

                      <div>

                        <FaUsers />

                        <span>

                          {room.capacity}

                        </span>

                      </div>

                      <div>

                        <FaBed />

                        <span>

                          {room.bed}

                        </span>

                      </div>

                      <div>

                        <FaWifi />

                        <span>

                          Free WiFi

                        </span>

                      </div>

                    </div>

                    <Link
                      to={`/roomdetail/${room._id}`}
                      className="featured-btn"
                    >

                      More Details

                      <FaArrowRight />

                    </Link>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

        {

          rooms.length>4 && (

            <div className="featured-bottom">

              <Link
                to="/room"
                className="primary-btn"
              >

                Explore All Rooms

              </Link>

            </div>

          )

        }

      </div>

    </section>

  )

}

export default FeaturedRooms;
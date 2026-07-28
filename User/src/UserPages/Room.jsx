import React, { useEffect, useState } from 'react'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'
import { Link, useParams } from 'react-router-dom';

function Room() {

  const { type } = useParams();
  const [rooms, setRooms] = useState([]);

useEffect(() => {
  let url = "http://localhost:3000/viewroomlisting";

  if (type) {
    url += `?type=${type}`; 
  }

  fetch(url)
    .then(res => res.json())
    .then(data => setRooms(data))
    .catch(err => console.log(err));

}, [type]);

  return (
<div>
    <UserHeader/>
  {/* Breadcrumb Section Begin */}
  <div className="breadcrumb-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-text">
            <h2>Our Rooms</h2>
            <div className="bt-option">
              <a href="/">Home</a>
              <span>Rooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Breadcrumb Section End */}
  {/* Rooms Section Begin */}
  <section className="rooms-section spad">
    <div className="container">
      <div className="row">
         {rooms.map((room) => (
    <div className="col-lg-4 col-md-6 mb-4" key={room._id}>
      <div className="room-item h-100 d-flex flex-column">
        
        <img
          src={room.roomPic}
          className="img-fluid"
          style={{ height: "200px", objectFit: "cover" }}
          alt=""
        />

        <div className="ri-text d-flex flex-column flex-grow-1 p-3">
          <h4>{room.name}</h4>

          <h3>
            {room.price}$<span>/Per night</span>
          </h3>

          <table>
            <tbody>
              <tr>
                <td className="r-o">Room Type:</td>
                <td>{room.roomtype.typeName}</td>
              </tr>
              <tr>
                <td className="r-o">Size:</td>
                <td>{room.size}</td>
              </tr>
              <tr>
                <td className="r-o">Capacity:</td>
                <td>{room.capacity}</td>
              </tr>
              <tr>
                <td className="r-o">Bed:</td>
                <td>{room.bed}</td>
              </tr>
              <tr>
                <td className="r-o">Services:</td>
                <td>{room.services}</td>
              </tr>
            </tbody>
          </table>
          <Link to={`/roomdetail/${room._id}`} className="primary-btn mt-auto">More Details</Link>
        </div>

      </div>
    </div>
  ))}
        {/* <div className="col-lg-4 col-md-6">
          <div className="room-item">
            <img src="UserAssets/img/room/room-2.jpg" alt />
            <div className="ri-text">
              <h4>Deluxe Room</h4>
              <h3>159$<span>/Pernight</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Size:</td>
                    <td>30 ft</td>
                  </tr>
                  <tr>
                    <td className="r-o">Capacity:</td>
                    <td>Max persion 5</td>
                  </tr>
                  <tr>
                    <td className="r-o">Bed:</td>
                    <td>King Beds</td>
                  </tr>
                  <tr>
                    <td className="r-o">Services:</td>
                    <td>Wifi, Television, Bathroom,...</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" className="primary-btn">More Details</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="room-item">
            <img src="UserAssets/img/room/room-3.jpg" alt />
            <div className="ri-text">
              <h4>Double Room</h4>
              <h3>159$<span>/Pernight</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Size:</td>
                    <td>30 ft</td>
                  </tr>
                  <tr>
                    <td className="r-o">Capacity:</td>
                    <td>Max persion 2</td>
                  </tr>
                  <tr>
                    <td className="r-o">Bed:</td>
                    <td>King Beds</td>
                  </tr>
                  <tr>
                    <td className="r-o">Services:</td>
                    <td>Wifi, Television, Bathroom,...</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" className="primary-btn">More Details</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="room-item">
            <img src="UserAssets/img/room/room-4.jpg" alt />
            <div className="ri-text">
              <h4>Luxury Room</h4>
              <h3>159$<span>/Pernight</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Size:</td>
                    <td>30 ft</td>
                  </tr>
                  <tr>
                    <td className="r-o">Capacity:</td>
                    <td>Max persion 1</td>
                  </tr>
                  <tr>
                    <td className="r-o">Bed:</td>
                    <td>King Beds</td>
                  </tr>
                  <tr>
                    <td className="r-o">Services:</td>
                    <td>Wifi, Television, Bathroom,...</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" className="primary-btn">More Details</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="room-item">
            <img src="UserAssets/img/room/room-5.jpg" alt />
            <div className="ri-text">
              <h4>Room With View</h4>
              <h3>159$<span>/Pernight</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Size:</td>
                    <td>30 ft</td>
                  </tr>
                  <tr>
                    <td className="r-o">Capacity:</td>
                    <td>Max persion 1</td>
                  </tr>
                  <tr>
                    <td className="r-o">Bed:</td>
                    <td>King Beds</td>
                  </tr>
                  <tr>
                    <td className="r-o">Services:</td>
                    <td>Wifi, Television, Bathroom,...</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" className="primary-btn">More Details</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="room-item">
            <img src="UserAssets/img/room/room-6.jpg" alt />
            <div className="ri-text">
              <h4>Small View</h4>
              <h3>159$<span>/Pernight</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Size:</td>
                    <td>30 ft</td>
                  </tr>
                  <tr>
                    <td className="r-o">Capacity:</td>
                    <td>Max persion 2</td>
                  </tr>
                  <tr>
                    <td className="r-o">Bed:</td>
                    <td>King Beds</td>
                  </tr>
                  <tr>
                    <td className="r-o">Services:</td>
                    <td>Wifi, Television, Bathroom,...</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" className="primary-btn">More Details</a>
            </div>
          </div>
        </div> */}
        <div className="col-lg-12">
          <div className="room-pagination">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">Next <i className="fa fa-long-arrow-right" /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Rooms Section End */}
  <UserFooter/>
</div>

  )
}

export default Room
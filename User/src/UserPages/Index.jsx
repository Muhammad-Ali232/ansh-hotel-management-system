import React, { useEffect, useState } from 'react'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'
import axios from 'axios';
import { Link } from 'react-router-dom';
import WhyChooseUs from './WhyChooseUs';
import HeroSection from "./HomeComponents/HeroSection";
import TrustedBrands from './HomeComponents/TrustedBrands';
import FeaturedRooms from './HomeComponents/FeaturedRooms';
import PremiumServices from './HomeComponents/PremiumServices';
import BookingCTA from './HomeComponents/BookingCTA';


function Index() {

  const [searched, setSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [hover, setHover] = useState(false);
  const [form, setForm] = useState({
  checkIn: "",
  checkOut: "",
  guests: 1,
  roomCount: 1
});

const handleSearch = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/availability", {
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests
    });

    setAvailableRooms(res.data.rooms);
    setSearched(true);
    setShowModal(true);
  } catch (error) {
    console.log(error);
  }
};

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewservice");
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchRooms();
}, []);

const fetchRooms = async () => {
  try {
    const response = await axios.get("http://localhost:3000/viewroomlisting");

    console.log(response.data);

    setRooms(response.data);

  } catch (err) {
    console.log("Fetch Rooms Error:", err);
  }
};



const handleHeaderBookNow = async () => {
  try {
    setAvailableRooms([]);
    setShowModal(true);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const res = await axios.post("http://localhost:3000/availability", {
      checkIn: today.toISOString().split("T")[0],
      checkOut: tomorrow.toISOString().split("T")[0],
      guests: 1
    });

    setAvailableRooms(res.data.rooms);

  } catch (err) {
    console.log(err);
  }
};


  return (
 <div>
    <UserHeader onBookNowClick={handleHeaderBookNow} />
  {/* Hero Section Begin */}
  {/* <section className="hero-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="hero-text">
            <h1>Ansh A Luxury Hotel</h1>
            <p>Here are the best hotel booking sites, including recommendations for international
              travel and for finding low-priced hotel rooms.</p>
            <a href="#" className="primary-btn">Book Your Stay</a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
          <div style={styles.formCard}>
  <h4 style={styles.title}>Book Your Experience</h4>

  <form onSubmit={handleSearch} style={styles.form}>
              <div style={styles.field}>
  <label style={styles.label}>Check In</label>
  <input
    type="date"
    value={form.checkIn}
    onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
    style={styles.input}
  />
</div>

<div style={styles.field}>
  <label style={styles.label}>Check Out</label>
  <input
    type="date"
    value={form.checkOut}
    onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
    style={styles.input}
  />
</div>
             <div style={styles.row}>

  <div style={styles.selectBox}>
    <label style={styles.label}>Guests</label>
    <select
      value={form.guests}
      onChange={(e) =>
        setForm({ ...form, guests: Number(e.target.value) })
      }
      style={styles.input}
    >
      <option>1 Adult</option>
      <option>2 Adults</option>
      <option>3 Adults</option>
    </select>
  </div>

  <div style={styles.selectBox}>
    <label style={styles.label}>Rooms</label>
    <select
      value={form.roomCount}
      onChange={(e) =>
        setForm({ ...form, roomCount: Number(e.target.value) })}
      style={styles.input}
    >
      <option>1 Room</option>
      <option>2 Rooms</option>
      <option>3 Rooms</option>
    </select>
  </div>

</div>
    <button
      type="submit"
      style={{
        backgroundColor: hover ? "#dfa974" : "#d99a72",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.3s"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Check Availability
    </button>
            </form>
          </div>
        </div>
      </div>
    </div>
   <div className="hero-slider">
  <div
    className="hs-item"
    style={{ backgroundImage: "url(/UserAssets/img/hero/hero-3.jpg)" }}>
    </div>
</div>
  </section> */}
  <HeroSection />
  {/* Hero Section End */}
  
  <TrustedBrands />


  {/* Room Search Modal */}

{showModal && (
  <div style={styles.overlay} onClick={() => setShowModal(false)}>
    
    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
      
      <div style={styles.header}>
        <h2 style={styles.title}>Available Rooms</h2>
        <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
          ✕
        </button>
      </div>

      <div style={styles.grid}>
        {availableRooms.length > 0 ? (
          availableRooms.map((room) => (
            <div key={room._id} style={styles.card}>
              <img src={room.roomPic} style={styles.img} />

              <div style={styles.cardBody}>
                <h3 style={styles.roomName}>{room.name}</h3>

                <p style={styles.meta}>👤 {room.capacity}</p>
                <p style={styles.price}>${room.price} <span style={styles.night}>/ night</span></p>

                <Link to={`/reservationpage/${room._id}`} style={styles.button}>
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.empty}>No rooms available 😢</p>
        )}
      </div>

    </div>
  </div>
)}


  {/* About Us Section Begin */}
  {/* <section className="aboutus-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about-text">
            <div className="section-title">
              <span>About Us</span>
              <h2>Intercontinental LA <br />Westlake Hotel</h2>
            </div>
            <p className="f-para">Sona.com is a leading online accommodation site. We’re passionate about
              travel. Every day, we inspire and reach millions of travelers across 90 local websites in 41
              languages.</p>
            <p className="s-para">So when it comes to booking the perfect hotel, vacation rental, resort,
              apartment, guest house, or tree house, we’ve got you covered.</p>
            <a href="#" className="primary-btn about-btn">Read More</a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-pic">
            <div className="row">
              <div className="col-sm-6">
                <img src="UserAssets/img/about/about-1.jpg" alt />
              </div>
              <div className="col-sm-6">
                <img src="UserAssets/img/about/about-2.jpg" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
  {/* About Us Section Begin */}

<WhyChooseUs />

{/* About Us Section End */}
  {/* About Us Section End */}
  {/* Services Section End */}
 
 <PremiumServices services={services} />
    {/* <hr/> */}

  {/* Services Section End */}
 {/* Home Room Section Begin */}
<FeaturedRooms rooms={rooms} />
{/* Home Room Section End */}
  {/* Testimonial Section Begin */}
 {/* Testimonials Section (React-friendly) */}
{/* <div className="testimonial-section spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>What Customers Say?</h2>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <div className="testimonial-slider owl-theme">
            <div className="ts-item">
              <p>
                After a construction project took longer than expected, my husband, my daughter and I
                needed a place to stay for a few nights. As a Chicago resident, we know a lot about our
                city, neighborhood and the types of housing options available and absolutely love our
                vacation at Sona Hotel.
              </p>
              <div className="ti-author">
                <div className="rating">
                  <i className="icon_star" />
                  <i className="icon_star" />
                  <i className="icon_star" />
                  <i className="icon_star" />
                  <i className="icon_star-half_alt" />
                </div>
                <h5> - Alexander Vasquez</h5>
              </div>
              <img src="/UserAssets/img/testimonial-logo.png" alt="testimonial logo" />
            </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

<BookingCTA
    form={form}
    setForm={setForm}
    handleSearch={handleSearch}
    hover={hover}
    setHover={setHover}
/>


  {/* Testimonial Section End */}
  <UserFooter/>
</div>

  )
}

export default Index


const styles = {

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  modal: {
    width: "85%",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.25s ease-in-out"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#111"
  },

  closeBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
    fontSize: "16px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "15px"
  },

  card: {
    borderRadius: "14px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer"
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "12px"
  },

  roomName: {
    fontSize: "18px",
    marginBottom: "6px",
    fontWeight: "600"
  },

  meta: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "6px"
  },

  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  night: {
    fontSize: "12px",
    color: "#777"
  },

  button: {
    display: "block",
    textAlign: "center",
    padding: "10px",
    background: "linear-gradient(135deg,#111,#333)",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "500"
  },

  empty: {
    textAlign: "center",
    width: "100%",
    fontSize: "16px",
    color: "#777"
  },

   formCard: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
    border: "1px solid rgba(255,255,255,0.3)"
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#111"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  field: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "5px",
    color: "#555"
  },

  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
    background: "#fff"
  },

  row: {
    display: "flex",
    gap: "12px"
  },

  selectBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg,#111,#333)",
    transition: "0.3s"
  }
};
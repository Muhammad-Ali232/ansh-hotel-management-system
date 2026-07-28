import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import UserHeader from '../Shared/UserHeader';
import UserFooter from '../Shared/UserFooter';
import axios from 'axios';

function RoomDetail() {

  const user = JSON.parse(localStorage.getItem("user"));  
  
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);  

  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: ""
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || user.username || "",
        email: user.email || ""
      }));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/viewroomlisting/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data.room))
      .catch(err => console.log(err));
  }, [id]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/reviews/${id}`
        );
  
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchReviews();
  }, [id]);

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/room-bookings/${id}`
        );  

        setBookings(res.data.bookings || []);
      } catch (err) {
        console.log(err);
      }
    };  

    fetchBookings();
  }, [id]);  
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };  

  const handleReviewSubmit = async (e) => {
    e.preventDefault();  

    try {
      await axios.post("http://localhost:3000/reviews", {
        roomId: id,
        name: form.name,
        email: form.email,
        comment: form.comment,
        rating
      });  

      alert("Review Submitted!");  

      setForm({
        name: user ? form.name : "",
        email: user ? form.email : "",
        comment: ""
      });  

      setRating(0);  

      // refresh reviews
      const res = await axios.get(
        `http://localhost:3000/reviews/${id}`
      );  

      setReviews(res.data.reviews || []);  

    } catch (err) {
      console.log(err);
    }
  };  

  const renderStars = (rating) => {
    const stars = [];  

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="icon_star" />);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="icon_star-half_alt" />);
      } else {
        stars.push(<i key={i} className="icon_star_alt" />);
      }
    }  

    return stars;
  };  

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;


    
  if (!room)
  return (
    <div style={styles.loaderWrapper}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading room details...</p>
    </div>
  );


  return (
<div>
    <UserHeader />
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
  {/* Room Details Section Begin */}
  <section className="room-details-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
         <div className="room-details-item">
      <img src={room.roomPic} width={800} />
      <div className="rd-text">
        <div className="rd-title">
          <h3>{room.name}</h3>

          <div className="rdt-right">
            <div className="rating">
  {renderStars(avgRating)}
</div>

            <Link to={`/reservationpage/${room._id}`}>Secure Your Stay</Link>
          </div>
        </div>

        <h2>
          {room.price}$<span>/Per night</span>
        </h2>

        <table>
          <tbody>
            <tr>
              <td className="r-o">Room Type:</td>
              <td>{room.roomtype?.typeName}</td>
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
      </div>
    </div>
  <div>
</div> 

         <div style={styles.reviewBox}>
  <h4 style={{ marginBottom: "15px" }}>Customer Reviews</h4>

  {reviews.length === 0 ? (
    <p style={{ color: "#888" }}>No reviews yet 😢</p>
  ) : (
    reviews.map((r, i) => (
      <div key={i} style={styles.reviewItem}>

        <div style={styles.reviewDate}>
          {new Date(r.createdAt).toLocaleDateString()}
        </div>

        <div style={styles.reviewName}>{r.name}</div>

        <div style={{ color: "#dfa974", fontSize: "14px" }}>
          {"⭐".repeat(r.rating)}
        </div>

        <div style={styles.reviewText}>
          {r.comment}
        </div>

      </div>
    ))
  )}
</div>




        <form style={styles.reviewForm} onSubmit={handleReviewSubmit}>

          <h4 style={{ marginBottom: "15px" }}>Your Opinion Matters</h4>

  <input
    style={styles.input}
    name="name"
    placeholder="Your Name"
    value={form.name}
    onChange={handleChange}
    readOnly={!!user}
  />

  <input
    style={styles.input}
    name="email"
    placeholder="Your Email"
    value={form.email}
    onChange={handleChange}
    readOnly={!!user}
  />

  {/* ⭐ STARS */}
  <div style={styles.starRow}>
    {[1,2,3,4,5].map(star => (
      <span
        key={star}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(star)}
        style={{
          cursor: "pointer",
          color: (hoverRating || rating) >= star ? "#dfa974" : "#ddd",
          transition: "0.2s"
        }}
      >
        ★
      </span>
    ))}
  </div>

  <textarea
    style={styles.textarea}
    name="comment"
    placeholder="Write your review..."
    value={form.comment}
    onChange={handleChange}
  />

  <button style={styles.submitBtn} type="submit">
    Submit Review
  </button>

</form>
        </div>
        <div className="col-lg-4">
         <div style={styles.bookingCard}>

  <h3>Room Availability</h3>

  <h4 style={{marginTop: '25px'}}>Booked Dates</h4>

  {bookings.length === 0 ? (
    <p style={{ color: "green", marginTop: '20px' }}>All dates available 🎉</p>
  ) : (
    bookings.map((b, index) => (
      <div key={index} style={{
        padding: "8px",
        marginBottom: "8px",
        marginTop: '20px',
        borderRadius: "8px",
        background: "#ffe5e5",
        color: "#d00000",
        fontSize: "13px"
      }}>
        {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}
      </div>
    ))
  )}

</div>
        </div>
      </div>
    </div>
  </section>
  {/* Room Details Section End */}
  <UserFooter />
</div>

  )
}

export default RoomDetail

const styles = {
  bookingCard: {
    position: "sticky",
    top: "20px",
    padding: "26px",
    borderRadius: "22px",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.12)"
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#111"
  },

  priceBox: {
    marginBottom: "12px"
  },

  price: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#111"
  },

  perNight: {
    fontSize: "13px",
    color: "#777"
  },

  badge: {
    display: "inline-block",
    padding: "4px 10px",
    fontSize: "12px",
    borderRadius: "999px",
    background: "#e6ffed",
    color: "#1a7f37",
    marginBottom: "10px",
    fontWeight: "500"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #111, #333)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease"
  },

  secondaryText: {
    fontSize: "12px",
    color: "#888",
    marginTop: "8px"
  },

  loaderWrapper: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #eee",
    borderTop: "4px solid #dfa974",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    boxShadow: "0 0 15px rgba(223, 169, 116, 0.6)"
  },

  loadingText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#777"
  },


   reviewBox: {
    marginTop: "40px",
    padding: "25px",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
  },

  reviewItem: {
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "12px",
    background: "rgba(223,169,116,0.08)",
    border: "1px solid rgba(223,169,116,0.2)"
  },

  reviewName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222"
  },

  reviewText: {
    fontSize: "13px",
    color: "#555",
    marginTop: "5px",
    lineHeight: "1.6"
  },

  reviewDate: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "5px"
  },

  // ================= FORM =================
  reviewForm: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, #ffffff, #f7f7f7)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s"
  },

  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
    outline: "none",
    fontSize: "14px",
    minHeight: "100px",
    resize: "none"
  },

  submitBtn: {
    marginTop: "12px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg, #111, #333)",
    transition: "0.3s"
  },

  starRow: {
    display: "flex",
    gap: "6px",
    fontSize: "24px",
    marginBottom: "10px"
  }
};
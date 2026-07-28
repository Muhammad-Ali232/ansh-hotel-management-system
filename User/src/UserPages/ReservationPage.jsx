import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFooter from "../Shared/UserFooter";
import UserHeader from "../Shared/UserHeader";
import { useParams } from "react-router-dom";

function Reservation() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [availabilityMsg, setAvailabilityMsg] = useState("");

  const [showServices, setShowServices] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [form, setForm] = useState({
    userId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    email: "",
    phone: "",
    services: [],
    paymentMethod: ""
  });

  // ================= USER LOAD =================
  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem("user"));

    if (usr) {
      setForm(prev => ({
        ...prev,
        userId: usr._id,
        email: usr.email || usr.Email || "",
        phone: usr.phone || usr.Contact || ""
      }));
    }
  }, []);

  // ================= ROOM LOAD =================
  useEffect(() => {
    fetch(`http://localhost:3000/viewroomlisting/${id}`)
      .then(res => res.json())
      .then(data => {
        const roomData = data.room;
        setRoom(roomData);

        setForm(prev => ({
          ...prev,
          roomId: roomData._id,
          totalAmount: roomData.price
        }));
      })
      .catch(err => console.log(err));
  }, [id]);

  // ================= SERVICES LOAD =================
  useEffect(() => {
    fetch("http://localhost:3000/viewservice")
      .then(res => res.json())
      .then(data => {
        setServices(data || []);
      })
      .catch(err => console.log(err));
  }, []);

  const getServicePrice = (service) => {
  if (!service?.servicePrice) return 0;

  const match = service.servicePrice.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

  // ================= PRICE CALCULATION =================
useEffect(() => {
  if (!room) return;

  let roomTotal = Number(room.price);

  // ================= ROOM DAYS CALC =================
  if (form.checkInDate && form.checkOutDate) {
    const inDate = new Date(form.checkInDate);
    const outDate = new Date(form.checkOutDate);

    const diffTime = outDate - inDate;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
      roomTotal = days * Number(room.price);
    }
  }

  // ================= SERVICES TOTAL =================
  const servicesTotal = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s._id === id);
    if (!service) return sum;
    return sum + getServicePrice(service);
  }, 0);

  // ================= FINAL =================
  setForm(prev => ({
    ...prev,
    totalAmount: roomTotal + servicesTotal
  }));

}, [
  form.checkInDate,
  form.checkOutDate,
  room,
  selectedServices,
  services
]);

  // ================= SYNC SERVICES + PAYMENT =================
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      services: selectedServices,
      paymentMethod: paymentMethod
    }));
  }, [selectedServices, paymentMethod]);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;

    setSelectedServices(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };


  useEffect(() => {

  const checkAvailability = async () => {

    if (!form.checkInDate || !form.checkOutDate || !form.roomId) return;

    try {
      const res = await axios.post("http://localhost:3000/check-reservation", {
        roomId: form.roomId,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate
      });

      if (res.data.conflict) {
        setAvailabilityMsg("❌ Room is NOT available for selected dates");
      } else {
        setAvailabilityMsg("✅ Room is available");
      }

    } catch (err) {
      console.log(err);
    }
  };

  checkAvailability();

}, [form.checkInDate, form.checkOutDate]);



  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {

      if (availabilityMsg.includes("❌")) {
      alert("Please select available dates");
      return;
    }
    
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        services: selectedServices,
        paymentMethod
      };

      await axios.post("http://localhost:3000/reservation", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("🎉 Reservation Successful!");
      setShowPayment(false);

    } catch (err) {
      console.log(err);
      alert("Error booking room");
    }
  };


  const handleCardChange = (e) => {
  setCardData({
    ...cardData,
    [e.target.name]: e.target.value
  });
};


  // ================= PAYMENT =================
const handlePayment = (method) => {
  setPaymentMethod(method);

  setForm(prev => ({
    ...prev,
    paymentMethod: method
  }));
};

  return (
    <div>
      <UserHeader />

      <div style={styles.page}>
        <div style={styles.container}>

          {/* LEFT */}
          <div style={styles.left}>
            {room && (
              <>
                <img src={room.roomPic} style={styles.image} />
                <h2>{room.name}</h2>
                <p><b>Type:</b> {room.roomtype?.typeName}</p>
                <p><b>Price:</b> {room.price} $ / night</p>
                <p><b>Capacity:</b> {room.capacity}</p>
                <p><b>Bed:</b> {room.bed}</p>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div style={styles.right}>
            <h2 style={styles.heading}>Book Your Stay</h2>

            <form style={styles.form}>

              <input type="hidden" value={form.roomId} />

              <input
                type="email"
                value={form.email}
                readOnly
                style={styles.input}
              />

              <input
                type="text"
                value={form.phone}
                readOnly
                style={styles.input}
              />

              <input
                type="date"
                name="checkInDate"
                value={form.checkInDate}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="date"
                name="checkOutDate"
                value={form.checkOutDate}
                onChange={handleChange}
                style={styles.input}
              />

              {availabilityMsg && (
                <p style={{
                fontSize: "12px",
                padding: "6px 10px",
                borderRadius: "6px",
                background: availabilityMsg.includes("❌") ? "#ffe5e5" : "#e6ffed",
                color: availabilityMsg.includes("❌") ? "red" : "green",
                marginTop: "8px"
              }}>
                  {availabilityMsg}
                </p>
              )}


              <input
                type="number"
                value={form.totalAmount}
                readOnly
                style={styles.input}
              />

              {/* SERVICES BUTTON */}
              <button
                type="button"
                onClick={() => setShowServices(true)}
                style={styles.button}
              >
                Choose Services
              </button>

              <p style={{ fontSize: "13px" }}>
                {selectedServices.length} service(s) selected
              </p>

              {/* PAYMENT BUTTON */}
              <button
                type="button"
                onClick={() => setShowPayment(true)}
                style={styles.button}
              >
                Confirm Booking
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* ================= SERVICES MODAL ================= */}
{showServices && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Select Services</h3>

      <div className="service-list">
        {Array.isArray(services) &&
          services.map((s) => (
            <label key={s._id} className="service-option">
              <input
                type="checkbox"
                value={s._id}
                checked={selectedServices.includes(s._id)}
                onChange={handleServiceChange}
              />
              <span>{s.serviceName}</span>
            </label>
          ))}
      </div>

      <button
        className="modal-btn"
        onClick={() => setShowServices(false)}
      >
        Done
      </button>
    </div>
  </div>
)}

      {/* ================= PAYMENT MODAL ================= */}
      {showPayment && (
  <div style={styles.modalOverlay}>
    <div style={styles.paymentBox}>

      <h2 style={{ marginBottom: "15px" }}>💳 Select Payment Method</h2>

      {/* OPTIONS */}
      <div style={styles.paymentButtons}>
        <button
          onClick={() => handlePayment("cash")}
          style={{
            ...styles.payBtn,
            background: paymentMethod === "cash" ? "#c77d3a" : "#dfa974"
          }}
        >
          Cash on Arrival
        </button>

        <button
          onClick={() => handlePayment("online")}
          style={{
            ...styles.payBtn,
            background: paymentMethod === "online" ? "#c77d3a" : "#dfa974"
          }}
        >
          Online Payment
        </button>
      </div>

      {/* ONLINE CARD FORM */}
      {paymentMethod === "online" && (
        <div style={styles.cardBox}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardData.cardNumber}
            onChange={handleCardChange}
            style={styles.input}
          />

          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={handleCardChange}
            style={styles.input}
          />

          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={cardData.cvv}
            onChange={handleCardChange}
            style={styles.input}
          />
        </div>
      )}

      {/* BUTTONS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

        <button
          onClick={() => {
            setShowPayment(false);
            setPaymentMethod("");
          }}
          style={styles.cancelBtn}
        >
          Cancel
        </button>

        {/* ONLY SHOW IF ONLINE */}
        {paymentMethod === "online" && (
          <button
            onClick={handleSubmit}
            style={styles.confirmBtn}
          >
            Pay & Confirm
          </button>
        )}

        {/* CASH AUTO BOOK BUTTON */}
        {paymentMethod === "cash" && (
          <button
            onClick={handleSubmit}
            style={styles.confirmBtn}
          >
            Confirm Booking
          </button>
        )}

      </div>

    </div>
  </div>
)}

      <UserFooter />
    </div>
  );
}

export default Reservation;

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f1ec",
    padding: "40px"
  },

  container: {
    display: "flex",
    width: "900px",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  left: { flex: 1, padding: "20px", background: "#fafafa" },
  right: { flex: 1, padding: "30px" },

  image: { width: "100%", borderRadius: "15px", marginBottom: "15px" },

  heading: { marginBottom: "20px", color: "#2b2b45" },

  form: { display: "flex", flexDirection: "column", gap: "15px" },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    background: "#dfa974",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modalBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  },
  paymentBox: {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
},

paymentButtons: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "15px"
},

payBtn: {
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#dfa974",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold"
},

cardBox: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px"
},

cancelBtn: {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  background: "#ccc",
  cursor: "pointer"
},

confirmBtn: {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  background: "#28a745",
  color: "#fff",
  cursor: "pointer"
}
};
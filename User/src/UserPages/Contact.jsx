import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'

function Contact() {

 const [formData, setFormData] = useState({
  username: "",
  email: "",
  message: ""
});

// AUTO FILL
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      message: ""
    });
  }
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/contact", formData)
      alert("Message Sent Successfully ✅")

      setFormData({
        username: "",
        email: "",
        message: ""
      })

    } catch (error) {
      alert("Error sending message ❌")
    }
  }

  return (
<div>
    <UserHeader/>

    {/* ✅ INPUT STYLE (internal CSS) */}
    <style>{`
      .contact-form input,
      .contact-form textarea {
        width: 100%;
        padding: 12px 15px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        transition: all 0.3s ease;
        outline: none;
        font-size: 14px;
      }

      .contact-form input:focus,
      .contact-form textarea:focus {
        border-color: #EEB186;
        box-shadow: 0 0 8px rgba(238, 177, 134, 0.4);
        transform: scale(1.02);
      }

      .contact-form button {
        background-color: #EEB186;
        border: none;
        padding: 12px 25px;
        border-radius: 8px;
        color: #fff;
        font-weight: 600;
        transition: 0.3s;
      }

      .contact-form button:hover {
        background-color: #e09a66;
        transform: translateY(-2px);
      }
    `}</style>

  {/* Contact Section Begin */}
  <section className="contact-section spad">
    <div className="container">
      <div className="row">

        <div className="col-lg-4">
          <div className="contact-text">
            <h2>Contact Info</h2>
            <p>Experience luxury, comfort, and personalized service at ANSH Hotel.
               Our team is always ready to assist you with any inquiries,
                bookings, or special requests to make your stay truly memorable.</p>

            <table>
              <tbody>
                <tr>
                  <td className="c-o">Address:</td>
                  <td>856 Cordia Extension Apt. 356, Lake, US</td>
                </tr>
                <tr>
                  <td className="c-o">Phone:</td>
                  <td>(12) 345 67890</td>
                </tr>
                <tr>
                  <td className="c-o">Email:</td>
                  <td>info.colorlib@gmail.com</td>
                </tr>
                <tr>
                  <td className="c-o">Fax:</td>
                  <td>+(12) 345 67890</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FORM */}
        <div className="col-lg-7 offset-lg-1">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="row">

              <div className="col-lg-6">
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="col-lg-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="col-lg-12">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                />

                <button type="submit">Submit Now</button>
              </div>

            </div>
          </form>
        </div>

      </div>

      {/* MAP */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0606825994123!2d-72.8735845851828!3d40.760690042573295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e85b24c9274c91%3A0xf310d41b791bcb71!2sWilliam%20Floyd%20Pkwy%2C%20Mastic%20Beach%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1578582744646!5m2!1sen!2sbd"
          height={470}
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>

    </div>
  </section>

  <UserFooter/>
</div>
  )
}

export default Contact
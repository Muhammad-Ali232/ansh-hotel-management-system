import React from 'react'

function StaffHeader() {
  return (
    <div>
<div>
  {/* BASIC SETUP */}
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hotel Staff Dashboard</title>
  {/* GOOGLE FONT */}
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  {/* INTERNAL CSS */}
  <style dangerouslySetInnerHTML={{__html: "\n    * {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n        font-family: 'Poppins', sans-serif;\n    }\n\n    body {\n        background: #f4f6f9;\n    }\n\n    /* NAVBAR */\n    .navbar {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 15px 40px;\n        background: rgba(0,0,0,0.85);\n        color: #fff;\n        position: sticky;\n        top: 0;\n    }\n\n    .logo {\n        font-size: 20px;\n        font-weight: 600;\n    }\n\n    .nav-links a {\n        margin-left: 25px;\n        text-decoration: none;\n        color: #ddd;\n        transition: 0.3s;\n    }\n\n    .nav-links a:hover {\n        color: #dfa974;\n    }\n\n    /* HERO */\n    .hero {\n        height: 220px;\n        background: linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),\n        url('https://images.unsplash.com/photo-1566073771259-6a8506099945');\n        background-size: cover;\n        background-position: center;\n        color: white;\n        display: flex;\n        align-items: center;\n        padding: 40px;\n    }\n\n    .hero h1 {\n        font-size: 30px;\n    }\n\n    .hero p {\n        margin-top: 10px;\n        opacity: 0.9;\n    }\n\n    /* CONTAINER */\n    .container {\n        padding: 30px;\n    }\n\n    /* CARDS */\n    .cards {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n        gap: 20px;\n        margin-top: -60px;\n    }\n\n    .card {\n        background: #fff;\n        padding: 20px;\n        border-radius: 15px;\n        box-shadow: 0 10px 25px rgba(0,0,0,0.08);\n        transition: 0.3s;\n    }\n\n    .card:hover {\n        transform: translateY(-5px);\n    }\n\n    .card h4 {\n        color: #777;\n    }\n\n    .card p {\n        font-size: 24px;\n        font-weight: bold;\n        margin-top: 10px;\n    }\n\n    /* GRID */\n    .grid {\n        display: grid;\n        grid-template-columns: 2fr 1fr;\n        gap: 20px;\n        margin-top: 30px;\n    }\n\n    /* TABLE */\n    .table-box {\n        background: #fff;\n        padding: 20px;\n        border-radius: 15px;\n        box-shadow: 0 10px 25px rgba(0,0,0,0.08);\n    }\n\n    table {\n        width: 100%;\n        border-collapse: collapse;\n    }\n\n    th, td {\n        padding: 12px;\n        text-align: left;\n    }\n\n    th {\n        background: #f1f1f1;\n    }\n\n    tr:hover {\n        background: #fafafa;\n    }\n\n    /* STATUS */\n    .status {\n        padding: 5px 10px;\n        border-radius: 20px;\n        font-size: 12px;\n    }\n\n    .confirmed {\n        background: #d4edda;\n        color: #155724;\n    }\n\n    .pending {\n        background: #fff3cd;\n        color: #856404;\n    }\n\n    /* QUICK ACTION */\n    .quick {\n        background: #fff;\n        padding: 20px;\n        border-radius: 15px;\n        box-shadow: 0 10px 25px rgba(0,0,0,0.08);\n    }\n\n    .quick button {\n        width: 100%;\n        padding: 12px;\n        margin-top: 10px;\n        border: none;\n        border-radius: 10px;\n        background: linear-gradient(135deg,#111,#333);\n        color: white;\n        cursor: pointer;\n    }\n\n    .quick button:hover {\n        background: #dfa974;\n    }\n\n    /* ANALYTICS */\n    .analytics {\n        margin-top: 30px;\n        background: #fff;\n        padding: 20px;\n        border-radius: 15px;\n        box-shadow: 0 10px 25px rgba(0,0,0,0.08);\n    }\n\n    .bar {\n        height: 10px;\n        background: #eee;\n        border-radius: 20px;\n        margin-top: 10px;\n    }\n\n    .fill {\n        height: 100%;\n        background: #dfa974;\n    }\n\n    /* FOOTER */\n    .footer {\n        text-align: center;\n        padding: 20px;\n        margin-top: 40px;\n        color: #888;\n    }\n" }} />

  {/* NAVBAR */}
  <div className="navbar">
    <div className="logo">🏨 Hotel Staff Panel</div>
    <div className="nav-links">
      <a href="#">Dashboard</a>
      <a href="#">Rooms</a>
      <a href="#">Bookings</a>
      <a href="#">Customers</a>
      <a href="#">Logout</a>
    </div>
  </div>
</div>

    </div>
  )
}

export default StaffHeader
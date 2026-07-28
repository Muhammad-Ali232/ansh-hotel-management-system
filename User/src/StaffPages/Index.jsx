import React from 'react'
import StaffHeader from '../Shared/StaffHeader'
import StaffFooter from '../Shared/StaffFooter'

function Index() {
  return (
<div>
    <StaffHeader />
  {/* HERO */}
  <div className="hero">
    <div>
      <h1>Welcome Back 👋</h1>
      <p>Manage your hotel easily and efficiently</p>
    </div>
  </div>
  {/* MAIN */}
  <div className="container">

    {/* CARDS */}
    <div className="cards">
      <div className="card">
        <h4>Total Rooms</h4>
        <p>120</p>
      </div>
      <div className="card">
        <h4>Bookings Today</h4>
        <p>30</p>
      </div>
      <div className="card">
        <h4>Available Rooms</h4>
        <p>45</p>
      </div>
      <div className="card">
        <h4>Revenue</h4>
        <p>$10,500</p>
      </div>
    </div>
    {/* GRID */}
    <div className="grid">
      {/* TABLE */}
      <div className="table-box">
        <h3>Recent Bookings</h3><br />
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ali Khan</td>
              <td>Deluxe</td>
              <td>20 Apr</td>
              <td><span className="status confirmed">Confirmed</span></td>
            </tr>
            <tr>
              <td>Ahmed Raza</td>
              <td>Suite</td>
              <td>21 Apr</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>Usman Tariq</td>
              <td>Standard</td>
              <td>22 Apr</td>
              <td><span className="status confirmed">Confirmed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* QUICK ACTION */}
      <div className="quick">
        <h3>Quick Actions</h3>
        <button>Add Room</button>
        <button>Manage Bookings</button>
        <button>View Customers</button>
        <button>Check Availability</button>
      </div>
    </div>
    {/* ANALYTICS */}
    <div className="analytics">
      <h3>Room Occupancy</h3>
      <p>Deluxe Rooms</p>
      <div className="bar"><div className="fill" style={{width: '70%'}} /></div>
      <p>Suite Rooms</p>
      <div className="bar"><div className="fill" style={{width: '50%'}} /></div>
      <p>Standard Rooms</p>
      <div className="bar"><div className="fill" style={{width: '85%'}} /></div>
    </div>
    
  </div>
  <StaffFooter />
</div>

  )
}

export default Index
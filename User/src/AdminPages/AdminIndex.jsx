import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import AdminFooter from "../Shared/AdminFooter";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

function AdminIndex() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admindashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

if (loading)
  return (
    <div className="premium-loader">
      <div className="glass-card">
        <div className="spinner-ring"></div>
        <div className="center-dot"></div>

        <p>Preparing your hotel analytics...</p>
      </div>

      <style>
        {`
          .premium-loader {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #fff7f0, #fffaf5);
          }

          .glass-card {
            position: relative;
            padding: 40px 50px;
            border-radius: 20px;
            background: rgba(255,255,255,0.65);
            backdrop-filter: blur(15px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.08);
            text-align: center;
          }

          .glass-card h5 {
            margin-top: 20px;
            font-size: 18px;
            color: #333;
            font-weight: 600;
          }

          .glass-card p {
            font-size: 13px;
            color: #7a7a7a;
            margin-top: 5px;
          }

          .spinner-ring {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid #f0e6dc;
            border-top: 3px solid #EEB186;
            animation: spin 1s linear infinite;
            margin: auto;
          }

          .center-dot {
            width: 10px;
            height: 10px;
            background: #EEB186;
            border-radius: 50%;
            position: absolute;
            top: 38px;
            left: 50%;
            transform: translateX(-50%);
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  return (
    <div>
      <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ansh_Hotel</title>
  <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
  <link rel="stylesheet" href="../assets/css/styles.min.css" />
  {/*  Body Wrapper */}
  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    {/* Sidebar Start */}
    <AdminSidebar />
        <div class="body-wrapper">
          <AdminHeader />

      <div className="container-fluid">

          {/* 🔥 STATS CARDS */}
          <div className="row g-3 mb-4">

            <StatCard title="Total Rooms" value={stats.totalRooms} />
            <StatCard title="Occupied Rooms" value={stats.occupiedRooms} />
            <StatCard title="Available Rooms" value={stats.availableRooms} />
            <StatCard title="Total Users" value={stats.totalUsers} />

            <StatCard title="Pending Reservations" value={stats.pendingReservations} />
            <StatCard title="Confirmed Reservations" value={stats.confirmedReservations} />

            <StatCard title="Today Check-ins" value={stats.todayCheckins} />
            <StatCard title="Today Check-outs" value={stats.todayCheckouts} />

            <StatCard
              title="Total Revenue"
              value={`$ ${stats.totalRevenue.toLocaleString()}`}
              highlight
            />

          </div>

          {/* 📊 CHART SECTION (placeholder ready) */}
          <div className="card p-4 mb-4">
  <h5 className="mb-4">Hotel Overview Analytics</h5>

  {/* TOP ROW - PIE + LINE */}
  <div className="row g-3">

    {/* PIE CHART */}
    <div className="col-md-4">
      <div className="card p-3 h-100">
        <h6 className="mb-3">Room Occupancy</h6>

        <div className="d-flex justify-content-center">
          <PieChart width={250} height={250}>
            <Pie
              data={[
                { name: "Occupied", value: stats.occupiedRooms },
                { name: "Available", value: stats.availableRooms },
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              <Cell fill="#EEB186" />
              <Cell fill="#e5e7eb" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>

    {/* LINE CHART */}
    <div className="col-md-8">
      <div className="card p-3 h-100">
        <h6 className="mb-3">Revenue Trend</h6>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={stats.revenueChart || []}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#EEB186"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>

  {/* BOTTOM ROW - BAR CHART */}
  <div className="row mt-3">
    <div className="col-12">
      <div className="card p-3">
        <h6 className="mb-3">Booking Trends</h6>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.bookingChart || []}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#EEB186" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  </div>

</div>

          {/* 📋 QUICK INSIGHTS */}
          {/* <div className="row">

            <div className="col-md-6">
              <div className="card p-3">
                <h6>Room Status</h6>
                <p>Occupied: {stats.occupiedRooms}</p>
                <p>Available: {stats.availableRooms}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h6>Reservation Status</h6>
                <p>Pending: {stats.pendingReservations}</p>
                <p>Confirmed: {stats.confirmedReservations}</p>
              </div>
            </div>

          </div> */}

          {/* 💰 BILLING INTELLIGENCE */}
<div className="card p-3 mb-4">
  <h5>💰 Revenue Intelligence</h5>

  <div className="row mt-3">

    {/* Revenue vs Expenses */}
    <div className="col-md-6">
      <h6>Revenue vs Expenses</h6>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={stats?.revenueVsExpenses || []}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#EEB186" />
          <Bar dataKey="expenses" fill="#ff6b6b" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Profit Trend */}
    <div className="col-md-6">
      <h6>Profit Trend</h6>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={stats?.profitTrend || []}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#28a745" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* Top Customers */}
  <div className="mt-3">
    <h6>🏆 Top Customers</h6>
    {(stats?.topCustomers || []).map((c, i) => (
      <div key={i} className="d-flex justify-content-between border-bottom py-1">
        <span>{c.name}</span>
        <b>${c.spent}</b>
      </div>
    ))}
  </div>

  {/* Pending Payments */}
  <div className="mt-3">
    <h6>⚠ Pending Payments</h6>
    {(stats?.pendingPayments || []).map((p, i) => (
      <div key={i} className="d-flex justify-content-between text-danger py-1">
        <span>{p.guest}</span>
        <b>${p.amount}</b>
      </div>
    ))}
  </div>
</div>


{/* 🧹 HOUSEKEEPING */}
<div className="card p-3 mb-4">
  <h5>🧹 Housekeeping</h5>

  {(stats?.roomsNeedingCleaning || []).map((room, i) => (
    <div key={i} className="border p-2 mb-2 d-flex justify-content-between align-items-center">
      
      <div>
        <b>Room {room.number}</b>
        <div className="text-muted small">
          Staff: {room.staff || "Unassigned"}
        </div>
      </div>

      <button className="btn btn-success btn-sm">
        Mark Cleaned
      </button>

    </div>
  ))}
</div>


{/* 🔧 MAINTENANCE */}
<div className="card p-3 mb-4">
  <h5>🔧 Maintenance Tracker</h5>

  {(stats?.maintenanceIssues || []).map((m, i) => (
    <div key={i} className="border p-2 mb-2">

      <div className="d-flex justify-content-between">
        <b>{m.type}</b>

        <span className={`badge bg-${m.priority === "High" ? "danger" : "secondary"}`}>
          {m.priority}
        </span>
      </div>

      <div>Status: {m.status}</div>
      <div>Technician: {m.technician || "Not assigned"}</div>

      <div className="mt-2">
        <button className="btn btn-primary btn-sm me-2">
          Assign
        </button>
        <button className="btn btn-success btn-sm">
          Fix
        </button>
      </div>

    </div>
  ))}
</div>





        </div>

        <AdminFooter />
      </div>
    </div>
    </div>
  );
}

/* 🔥 Reusable Card Component */
const StatCard = ({ title, value, highlight }) => {
  return (
    <div className="col-md-3">
      <div className={`card p-3 shadow border-0 ${highlight ? "bg-primary text-white" : ""}`}>
        <h6>{title}</h6>
        <h4>{value}</h4>
      </div>
    </div>
  );
};

export default AdminIndex;
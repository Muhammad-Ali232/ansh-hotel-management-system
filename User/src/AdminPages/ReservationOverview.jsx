import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import AdminFooter from "../Shared/AdminFooter";

function AdminReservationsOverview() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewreservation"); // FIXED
      setReservations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ✅ CORRECT STATUS (case-sensitive)
  const total = reservations.length;
  const pending = reservations.filter(r => r.status === "Pending").length;
  const confirmed = reservations.filter(r => r.status === "Confirmed").length;

  // ✅ TOTAL REVENUE (IMPORTANT)
  const totalRevenue = reservations.reduce(
  (sum, r) => sum + Number(r.totalAmount || 0),
  0
);

  return (
    <div>
    <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Modernize Free</title>
  <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
  <link rel="stylesheet" href="../assets/css/styles.min.css" />
  {/*  Body Wrapper */}
  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    {/* Sidebar Start */}
    <AdminSidebar />
        <div className="body-wrapper">
          <AdminHeader />

      <div className="container-fluid">
            <h3 className="fw-bold text-center my-4">
              Reservations Overview
            </h3>

            {/* 🔥 STATS CARDS */}
            <div className="row text-center mb-4">

              <div className="col-md-3">
                <div className="card p-3 shadow border-0">
                  <h6>Total</h6>
                  <h3>{total}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card p-3 shadow border-0">
                  <h6>Pending</h6>
                  <h3 className="text-warning">{pending}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card p-3 shadow border-0">
                  <h6>Confirmed</h6>
                  <h3 className="text-success">{confirmed}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card p-3 shadow border-0">
                  <h6>Revenue</h6>
                  <h3 className="text-primary">
                    ${totalRevenue.toLocaleString()}
                  </h3>
                </div>
              </div>

            </div>

            {/* 📋 RECENT RESERVATIONS */}
            <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="mb-3">Recent Reservations</h5>

                <table className="table table-sm text-center align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                   {reservations
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
  .slice(0, 10) // top 10
  .map((r) => (
    <tr key={r._id}>
      <td>{r.user.Username}</td>
      <td>{r.email}</td>
      <td>{r.phone}</td>

      <td>
        {new Date(r.checkInDate).toLocaleDateString()}
      </td>

      <td>
        {new Date(r.checkOutDate).toLocaleDateString()}
      </td>

      <td className="fw-bold text-success">
        $ {r.totalAmount}
      </td>

      <td>
        <span
          className={
            r.status === "Confirmed"
              ? "badge bg-success"
              : r.status === "Cancelled"
              ? "badge bg-danger"
              : "badge bg-warning"
          }
        >
          {r.status}
        </span>
      </td>
    </tr>
))}
                  </tbody>

                </table>
              </div>
            </div>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReservationsOverview;
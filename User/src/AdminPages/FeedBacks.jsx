import React, { useEffect, useState } from "react";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import AdminFooter from "../Shared/AdminFooter";
import axios from "axios";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewreviews");
      setFeedbacks(res.data);
    } catch (err) {
      console.log("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Delete Feedback
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deletereview/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete review");
    }
  };

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
            <hr />

            {/* Header */}
            <h3 className="fw-bold text-center mb-4">Customer Feedbacks</h3>

            {/* Cards */}
            <div className="row">
              {feedbacks.map((fb) => (
                <div className="col-md-4 col-lg-3 mb-4" key={fb._id}>
                  <div className="card shadow border-0 h-100 position-relative">

                    {/* DELETE ICON (TOP RIGHT) */}
                    <button
                      onClick={() => handleDelete(fb._id)}
                      className="btn btn-sm btn-danger position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ✕
                    </button>

                    <div className="card-body text-center">

                      {/* USER NAME */}
                      <h5 className="fw-bold mb-2">
                        {fb.name}
                      </h5>

                      {/* EMAIL (optional) */}
                      <p className="text-muted small mb-2">
                        {fb.email}
                      </p>

                      {/* RATING */}
                      <div className="mb-2 text-warning">
                        {"⭐".repeat(fb.rating || 0)}
                      </div>

                      {/* MESSAGE */}
                      <p className="text-muted small">
                        {fb.comment}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedbacks;
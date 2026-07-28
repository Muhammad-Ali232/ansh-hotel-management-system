import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import AdminFooter from "../Shared/AdminFooter";

function EditAdminProfile() {
const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    Username: "",
    Email: "",
    Phone: "",
    DOB: "",
    Status: "",
    profilePic: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/userprofile/${id}`);
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    setProfile({
      ...profile,
      profilePic: URL.createObjectURL(file)
    });
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("Username", profile.Username);
    formData.append("Email", profile.Email);
    formData.append("Phone", profile.Phone);
    formData.append("DOB", profile.DOB);
    formData.append("Status", profile.Status);

    if (image) {
      formData.append("profilePic", image);
    }

    await axios.put(
      `http://localhost:3000/edituserprofile/${id}`,
      formData
    );

    alert("Profile Updated Successfully!");
    navigate("/adminprofile");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Modernize Free</title>
      <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
      <link rel="stylesheet" href="../assets/css/styles.min.css" />

      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <AdminSidebar />
        <div className="body-wrapper">
          <AdminHeader />

         <div className="container-fluid">
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          {/* Top Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #EEB186, #f7c59f)",
              height: "120px"
            }}
          />

          <div className="card-body px-4 pb-4">

            {/* Profile Image */}
            <div className="text-center" style={{ marginTop: "-70px" }}>
              <img
                src={profile.profilePic}
                alt=""
                className="rounded-circle border border-4 border-white shadow"
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
              />

              <input
                type="file"
                className="form-control mt-3"
                onChange={handleImageChange}
              />
            </div>

            {/* Title */}
            <h4 className="text-center mt-3 fw-bold">
              Edit Profile
            </h4>

            <p className="text-center text-muted mb-4">
              Update your account details
            </p>

            <form onSubmit={handleUpdate}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  name="Username"
                  value={profile.Username}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  name="Email"
                  value={profile.Email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                name="Phone"
                value={profile.Phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>DOB</label>
              <input
                name="DOB"
                type="date"
                value={profile.DOB}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Status</label>
              <input
                name="Status"
                value={profile.Status}
                onChange={handleChange}
                className="form-control"
              />
            </div>

              {/* Buttons */}
              <div className="d-flex gap-2 mt-4">

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#EEB186",
                    color: "#fff",
                    borderRadius: "10px"
                  }}
                >
                  Update Profile
                </button>

                <button
                type="button"
              
                  className="btn btn-outline-secondary w-100"
                  onClick={() => navigate("/adminprofile")}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  </div>
  <AdminFooter/>
</div>
</div>
</div>
</div>
  );
}

export default EditAdminProfile;
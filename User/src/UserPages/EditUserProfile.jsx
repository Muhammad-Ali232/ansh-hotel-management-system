import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'

function EditUserProfile() {

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

  const handleUpdate = async () => {
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
      navigate("/userprofile");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserHeader />

      <div style={{
        height: "250px",
        background: "linear-gradient(135deg, #e99355, #eeb186)"
      }} />

      <div className="container">

        <div className="mx-auto p-4 shadow-lg"
          style={{
            maxWidth: "700px",
            marginTop: "-120px",
            marginBottom: "100px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)"
          }}>

          <div className="text-center">

            <img
              src={profile.profilePic || "https://via.placeholder.com/150"}
              alt="user"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid white",
                marginTop: "-90px"
              }}
            />

            <h3 className="mt-3 fw-bold">Edit Profile</h3>
            <p className="text-muted">Update your information</p>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Username</label>
              <input
                name="Username"
                value={profile.Username}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                name="Email"
                value={profile.Email}
                onChange={handleChange}
                className="form-control"
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
              <label>Profile Image</label>
              <input
                type="file"
                onChange={handleImageChange}
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


          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">

            <button
              className="btn px-4"
              style={{
                borderRadius: "30px",
                backgroundColor: '#eeb186',
                color: "white"
              }}
              onClick={handleUpdate}
            >
              Update Profile
            </button>

            <button
              className="btn btn-outline-secondary px-4"
              style={{ borderRadius: "30px" }}
              onClick={() => navigate("/userprofile")}
            >
              Cancel
            </button>

          </div>

        </div>
      </div>

      <UserFooter />
    </div>
  )
}

export default EditUserProfile;
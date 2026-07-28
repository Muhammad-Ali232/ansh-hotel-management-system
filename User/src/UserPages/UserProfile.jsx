import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserHeader from '../Shared/UserHeader'
import UserFooter from '../Shared/UserFooter'

function UserProfile() {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/userprofile/${user._id}`
      );
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserHeader />

      {/* 🔥 COVER SECTION */}
      <div style={{
        height: "250px",
        background: "linear-gradient(135deg, #e99355, #eeb186)",
        position: "relative"
      }}>
      </div>

      <div className="container">

        {/* 🔥 PROFILE CARD */}
        <div 
          className="mx-auto p-4 shadow-lg"
          style={{
            maxWidth: "700px",
            marginTop: "-120px",
            marginBottom: "100px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)"
          }}
        >

          {/* IMAGE */}
          <div className="text-center">
            <img
              src={profile?.profilePic || "https://via.placeholder.com/150"}
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

            <h3 className="mt-3 fw-bold">{profile?.Username}</h3>
            <p className="text-muted">{profile?.Email}</p>

            <span className="badge px-3 py-2" style={{backgroundColor: "#eeb186"}}>
              {profile?.roleName || "User"}
            </span>
          </div>

          <hr />

          {/* 🔥 INFO GRID */}
          <div className="row text-center mt-4">

            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded-3 shadow-sm">
                <h6 className="text-muted">Username</h6>
                <strong>{profile?.Username}</strong>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded-3 shadow-sm">
                <h6 className="text-muted">Email</h6>
                <strong>{profile?.Email}</strong>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded-3 shadow-sm">
                <h6 className="text-muted">Status</h6>
                <span className="badge bg-success">
                  {profile?.Status || "Active"}
                </span>
              </div>
            </div>

          </div>

          {/* 🔥 BUTTONS */}
          <div className="text-center mt-4">

            <button
              className="btn px-4 "
              style={{ borderRadius: "30px", backgroundColor: '#eeb186' , color: "white"}}
              onClick={() => navigate(`/edituserprofile/${profile._id}`)}
            >
              Edit Profile
            </button>

            <button
              className="btn btn-outline-danger px-4"
              style={{ borderRadius: "30px" }}
            >
              Delete
            </button>

          </div>

        </div>
      </div>

      <UserFooter />
    </div>
  )
}

export default UserProfile
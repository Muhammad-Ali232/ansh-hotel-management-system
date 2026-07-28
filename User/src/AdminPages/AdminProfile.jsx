import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminFooter from '../Shared/AdminFooter'
import AdminSidebar from '../Shared/AdminSidebar'
import AdminHeader from '../Shared/AdminHeader'
import { useNavigate } from 'react-router-dom'

function AdminProfile() {
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
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-6">

                  <div className="card shadow-lg border-0 rounded-4">

                    <div className="bg-primary rounded-top" style={{ height: 120 }} />

                    <div className="card-body text-center">

                      <div
                        className="position-relative"
                        style={{ marginTop: '-60px' }}
                      >
                        <img
                          src={profile.profilePic}
                          className="rounded-circle border border-4 border-white shadow"
                          width={120}
                          height={120}
                          alt=""
                        />
                      </div>

                      <h4 className="mt-3 fw-bold">
                        {profile.Username}
                      </h4>

                      <span className="badge bg-info mb-2">
                        {profile.roleName}
                      </span>

                      <p className="text-muted">
                        {profile.Email}
                      </p>

                      <hr />

                      <div className="text-start px-3">

                        <div className="mb-2">
                          <strong>Username:</strong> {profile.Username}
                        </div>

                        <div className="mb-2">
                          <strong>Email:</strong> {profile.Email}
                        </div>

                        <div className="mb-2">
                          <strong>Role:</strong> {profile.roleName}
                        </div>

                        <div className="mb-2">
                          <strong>Status:</strong>
                          <span className="badge bg-success ms-2">
                            {profile.Status}
                          </span>
                        </div>

                      </div>

                      <div className="d-flex justify-content-center gap-2 mt-4">
                        <button className="btn btn-warning" 
                        onClick={() => navigate(`/editadminprofile/${profile._id}`)}>
                          Edit Profile
                        </button>

                        <button className="btn btn-danger">
                          Delete
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
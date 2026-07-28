import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextApi';
import Swal from "sweetalert2";

function Signin() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});

  try {
    const response = await axios.post('http://localhost:3000/signin', form);

    if (response.data.success) {

      localStorage.setItem("user", JSON.stringify(response.data.user));
      // login(response.data.user.token); 
      login(response.data);

const roleName = response.data.user.roleName;

const from = location.state?.from?.pathname;

let redirectTo = '/';

// 🔥 priority: if user came from protected page
if (from) {
  redirectTo = from;
}

// 🔥 role override logic
if (roleName === "Admin") {
  redirectTo = '/adminhome';
} else if (roleName === "Staff") {
  redirectTo = '/staffindex';
} else if (roleName === "Manager") {
  redirectTo = '/staffindex';
}

// FINAL NAVIGATION (ONLY ONCE)
navigate(redirectTo, { replace: true });

      Swal.fire({
        title: "Welcome!",
        text: "✨ Welcome to ANSH Hotel! You're successfully signed in!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#EEB186",
        background: "#fff",
        color: "#5a4636"
      });

    } else {

      const newErrors = {};
      if (response.data.message === "Email not found") newErrors.email = response.data.message;
      else if (response.data.message === "Wrong password") newErrors.password = response.data.message;
      else newErrors.email = response.data.message;
      setErrors(newErrors);
    }
  } catch (err) {
    setErrors({ email: 'Server error, please try again' });
  }
}
  return (
    <div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ansh Hotel - Guest SignIn</title>
  <link rel="stylesheet" href="../assets/css/styles.min.css" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
  <style dangerouslySetInnerHTML={{__html: "\n    body {\n      margin: 0;\n      padding: 0;\n      background: linear-gradient(135deg, #1e1e2f, #2b2b45);\n      height: 100vh;\n      font-family: 'Segoe UI', sans-serif;\n    }\n\n    .main-container {\n      height: 100vh;\n    }\n\n    /* LEFT SIDE */\n    .left-panel {\n      background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),\n                  url('https://images.unsplash.com/photo-1590490360182-c33d57733427');\n      background-size: cover;\n      background-position: center;\n      color: #fff;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      flex-direction: column;\n    }\n\n    .left-panel i {\n      font-size: 60px;\n      color: #dfa974;\n    }\n\n    .left-panel h1 {\n      font-size: 42px;\n      font-weight: 700;\n      margin-top: 20px;\n    }\n\n    .brand {\n      color: #dfa974;\n      letter-spacing: 2px;\n    }\n\n    .left-panel p {\n      font-size: 16px;\n      opacity: 0.9;\n    }\n\n    /* RIGHT SIDE */\n    .form-panel {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: #f8f9fa;\n    }\n\n    .form-card {\n      width: 100%;\n      max-width: 400px;\n      padding: 35px;\n      border-radius: 15px;\n      background: #fff;\n      box-shadow: 0 15px 40px rgba(0,0,0,0.2);\n      transition: 0.3s;\n    }\n\n    .form-card:hover {\n      transform: translateY(-5px);\n    }\n\n    .form-control {\n      border-radius: 10px;\n      padding: 12px;\n      border: 1px solid #ddd;\n    }\n\n    .form-control:focus {\n      border-color: #dfa974;\n      box-shadow: 0 0 5px rgba(223,169,116,0.5);\n    }\n\n    .btn-primary {\n      background-color: #dfa974;\n      border: none;\n      border-radius: 10px;\n      padding: 12px;\n      font-weight: 600;\n    }\n\n    .btn-primary:hover {\n      background-color: #c8955f;\n    }\n\n    a {\n      text-decoration: none;\n    }\n\n    /* Responsive */\n    @media(max-width: 768px) {\n      .left-panel {\n        display: none;\n      }\n    }\n  " }} />
  
      <div className="container-fluid main-container">
        <div className="row h-100">

          {/* LEFT SIDE */}
          <div className="col-md-6 left-panel">
            <i className="fas fa-hotel" />
            <h1><span className="brand">ANSH Hotel</span></h1>
            <p>Luxury • Comfort • Experience</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6 form-panel">
            <div className="form-card">

              <h3 className="text-center mb-4">Guest Sign In</h3>

             <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input
                    type="checkbox"
                    id="showPass"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPass" className="ms-2 small">
                    Show Password
                  </label>
                </div>
                <a href="#" className="small text-primary fw-bold">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Signing In...' : 'Login'}
              </button>

              <div className="text-center mt-3">
                <p className="mb-1">✨ New here? Start your luxury journey today!</p>
                <a href="/signup" className="fw-bold text-primary">
                  Create Your Account
                </a>
              </div>
            </form>

            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Signin
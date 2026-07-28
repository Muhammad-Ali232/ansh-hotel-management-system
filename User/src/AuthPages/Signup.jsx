import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => setShowPass(prev => !prev);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const validate = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Full Name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";

    if (!form.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{11}$/.test(form.phone)) newErrors.phone = "Phone is invalid";

    if (!form.dob) newErrors.dob = "Date of Birth is required";
    else {
      const today = new Date();
      const dob = new Date(form.dob);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 18) newErrors.dob = "You must be at least 18 years old";
    }

    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPass) newErrors.confirmPass = "Confirm Password is required";
    if (form.password && form.confirmPass && form.password !== form.confirmPass)
      newErrors.confirmPass = "Passwords do not match";

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
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('dob', form.dob);
    formData.append('password', form.password);

    if (form.profilePic) {
      formData.append('profilePic', form.profilePic); // file
    }

    await axios.post('http://localhost:3000/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

      alert(
        `🎉 Awesome, ${form.username}! Your ANSH Hotel account has been created successfully. Ready to explore?`
      );

      navigate("/signin");
    } catch (err) {
      console.log("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ANSH Hotel - Signup</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{__html: `
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Segoe UI', sans-serif;
}

body{ 
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#f4f1ec;
  padding:10px 0; /* 20px se kam */
}

/* ✅ container fix */
.container{
  width:900px;
  max-width:95%;
  max-height:620px; /* optional safety */
  display:flex;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 20px 50px rgba(0,0,0,0.2);
}

/* left side */
.left{
  width:45%;
  background:url('https://images.unsplash.com/photo-1505691938895-1758d7feb511') center/cover;
  position:relative;
  color:#fff;
}

.left::before{
  content:"";
  position:absolute;
  inset:0;
  background:rgba(0,0,0,0.4);
}

.left-content{
  position:absolute;
  bottom:40px;
  left:30px;
  z-index:2;
}

.left h2{font-size:32px;}
.left span{color:#dfa974;}
.left p{font-size:16px;margin-top:10px;}

/* ✅ right side FIXED */
.right{
  width:55%;
  background:#fff;
  padding:40px 40px; /* top-bottom spacing */
  display:flex;
  flex-direction:column;
  justify-content:center;
}

/* heading spacing */
.right h2{
  margin-bottom:15px;
  color:#2b2b45;
  text-align:center;
}

/* form spacing */
form{
  margin:10px 0;
}

/* inputs spacing */
.input{
  margin-bottom:10px; /* increased gap */
}

.input input{
  width:100%;
  padding:12px;
  border-radius:10px;
  border:1px solid #ddd;
  outline:none;
  transition:0.3s;
}

.input input:focus{
  border-color:#dfa974;
  box-shadow:0 0 6px rgba(223,169,116,0.4);
}

/* row gap */
.row{
  display:flex;
  gap:20px;
}

.row .input{
  flex:1;
}

/* button spacing */
.btn{
  width:100%;
  padding:14px;
  border:none;
  border-radius:30px;
  background:#dfa974;
  color:#fff;
  font-weight:bold;
  cursor:pointer;
  transition:0.3s;
  margin-top:8px;
}

.btn:hover{
  background:#c8955f;
}

/* bottom text */
.bottom{
  margin-top:15px;
  text-align:center;
  font-size:14px;
  color:#7a5a3d;
}

.bottom a{
  color:#dfa974;
  font-weight:bold;
  text-decoration:none;
}

/* mobile */
@media(max-width:900px){
  .container{
    flex-direction:column;
  }

  .left{
    width:100%;
    height:200px;
  }

  .right{
    width:100%;
    padding:30px 20px;
  }

  .row{
    flex-direction:column;
  }
}

/* toggle switch */
.toggle-switch{
  position:relative;
  display:inline-block;
  width:50px;
  height:24px;
  margin-right:10px;
}

.toggle-switch input{
  opacity:0;
  width:0;
  height:0;
}

.slider{
  position:absolute;
  cursor:pointer;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:#ccc;
  border-radius:34px;
  transition:0.4s;
}

.slider::before{
  position:absolute;
  content:"";
  height:18px;
  width:18px;
  left:3px;
  bottom:3px;
  background-color:white;
  border-radius:50%;
  transition:0.4s;
}

input:checked + .slider{
  background-color:#dfa974;
}

input:checked + .slider::before{
  transform:translateX(26px);
}

.toggle-label{
  display:flex;
  align-items:center;
  font-size:14px;
  color:#7a5a3d;
  margin-bottom:20px;
}
`}}/>

      <div className="container">
        <div className="left">
          <div className="left-content">
            <h2><span>ANSH</span> Hotel</h2>
            <p>Luxury stays. Premium comfort.</p>
          </div>
        </div>

        <div className="right">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} noValidate>
      <div className="input">
        <input
          name="username"
          type="text"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{color:'red', fontSize: '12px'}}>{errors.username}</p>}
      </div>

      <div className="input">
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{color:'red', fontSize: '12px'}}>{errors.email}</p>}
      </div>

      <div className="row">
        <div className="input">
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{color:'red', fontSize: '12px'}}>{errors.phone}</p>}
        </div>
        <div className="input">
          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <p style={{color:'red', fontSize: '12px'}}>{errors.dob}</p>}
      </div>
      </div>
      <div className="row">
          <div className="input" style={{ position: 'relative', height: '100px' }}>
  <input
    type="file"
    name="profilePic"
    accept="image/*"
    id="profilePic"
    style={{ display: 'none' }}
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setForm(prev => ({
          ...prev,
          profilePic: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0]) // image preview
        }));
      }
    }}
  />
  
  <label
    htmlFor="profilePic"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ddd',
      borderRadius: '10px',
      height: '100%',
      cursor: 'pointer',
      overflow: 'hidden',
      backgroundColor: '#fff',
      padding: '0',
    }}
  >
    {form.preview ? (
      <img
        src={form.preview}
        alt="Preview"
        style={{ width: '70%', height: '70%', borderRadius: '30px',}}
      />
    ) : (
      <span style={{ color: '#aaa', padding: '0 12px' }}>Profile Picture (Optional)</span>
    )}
  </label>
</div>
      </div>
      <div className="row">
        <div className="input">
          <input
            name="password"
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{color:'red', fontSize: '12px'}}>{errors.password}</p>}
        </div>
        <div className="input">
          <input
            name="confirmPass"
            type={showPass ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPass}
            onChange={handleChange}
          />
          {errors.confirmPass && <p style={{color:'red', fontSize: '12px'}}>{errors.confirmPass}</p>}
        </div>
      </div>

      <label className="toggle-label">
        <span className="toggle-switch">
          <input type="checkbox" onChange={togglePass} checked={showPass} />
          <span className="slider"></span>
        </span>
        Show Password
      </label>

      <button className="btn" type="submit">Sign Up</button>

      <div className="bottom">
        Looks like you’ve stayed with us before? <Link to='/signin'>Login here</Link>
      </div>
    </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
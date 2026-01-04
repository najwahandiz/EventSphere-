import React, { useState } from "react";
import "./AdminLogin.css";
import {Link, useNavigate} from 'react-router-dom'


export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.username==="admin" && formData.password==="admin123"){
      navigate('/Dashboard')
    }else{
        setError("password ou email invalide");
    }
    console.log("UI only:", formData);
  };

  return (
    <div className="adminLoginPage">
      <div className="loginCard">
        <div className="iconCircle">
          🔒
        </div>

        <h1>Admin Login</h1>
        <p className="hint">Use: admin / admin123</p>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Username</label>
            <div className="inputWrapper">
              <span className="inputIcon">👤</span>
              <input
                type="text"
                name="username"
                placeholder="admin"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <div className="inputWrapper">
              <span className="inputIcon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="loginBtn" >Sign In
            {/* <Link className="loginLink" to='/Dashboard'>Sign In</Link> */}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

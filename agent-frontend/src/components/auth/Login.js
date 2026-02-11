import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./auth.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!data.email || !data.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", data);
    localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/availability");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <h2>ONLINE INSURANCE</h2>
      </div>

      {/* Main Content */}
      <div className="auth-container">
        {/* Login Form */}
        <div className="form-section">
          <h3>Customer Login</h3>
          <p>Enter your credentials to access your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-links">
            <p className="auth-link">
              Don't have an account? <Link to="/">Register here</Link>
            </p>
            <p className="auth-link">
              <Link to="/forgot">Forgot your password?</Link>
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="info-section">
          <h3>Contact Information</h3>
          <p>📍 Hebbal</p>
          <p>📞 1800-300-2000</p>
          <p>✉ info@onlineinsurance.com</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-bar"></div>
    </>
  );
};

export default Login;

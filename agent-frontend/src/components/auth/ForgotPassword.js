import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const validateEmail = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const response = await API.post("/auth/forgot-password", { email });
      setSuccess("Reset link has been sent to your email. Please check your inbox.");
      setEmail("");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send reset link. Please try again.";
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
        {/* Forgot Password Form */}
        <div className="form-section">
          <h3>Forgot Password</h3>
          <p>Enter your email address to receive a password reset link</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="auth-links">
            <p className="auth-link">
              <Link to="/login">Back to Login</Link>
            </p>
            <p className="auth-link">
              Don't have an account? <Link to="/">Register here</Link>
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

export default ForgotPassword;

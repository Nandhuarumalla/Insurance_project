import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./auth.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post("/auth/reset-password", {
        token,
        password: form.password,
      });
      setSuccess("Password reset successfully! Redirecting to login...");
      setForm({ password: "", confirmPassword: "" });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to reset password. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <>
        <div className="top-bar">
          <h2>ONLINE INSURANCE</h2>
        </div>
        <div className="auth-container">
          <div className="form-section">
            <div className="error-message">{error}</div>
            <p className="auth-link">
              <Link to="/forgot">Request a new reset link</Link>
            </p>
          </div>
        </div>
        <div className="footer-bar"></div>
      </>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <h2>ONLINE INSURANCE</h2>
      </div>

      {/* Main Content */}
      <div className="auth-container">
        {/* Reset Password Form */}
        <div className="form-section">
          <h3>Reset Password</h3>
          <p>Enter your new password below</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="New Password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="auth-links">
            <p className="auth-link">
              <Link to="/login">Back to Login</Link>
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

export default ResetPassword;

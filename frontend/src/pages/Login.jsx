import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "https://support-crm-472e.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/my-tickets");
      }
    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-circle">
          🎫
        </div>

        <h1>Support CRM</h1>

        <p>
          Manage customer tickets, monitor support
          requests and improve customer satisfaction.
        </p>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="login-options">
          <label className="remember">
            <input type="checkbox" />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="link-btn"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="login-btn"
          onClick={loginUser}
        >
          Login
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <Link
          to="/register"
          className="register-btn"
        >
          Create New Account
        </Link>

        <div className="register-text">
          New to Support CRM?{" "}
          <Link to="/register">
            Register Here
          </Link>
        </div>

        <div className="login-footer">
          React • Node.js • SQLite
        </div>

      </div>
    </div>
  );
}

export default Login;
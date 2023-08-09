import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../services/api";
import "./login.css";
import titleImage from "../../../assets/auth/images/login-titleImage.jpg";

const API_URL = "https://strapi-production-6e8e.up.railway.app/api"; // Replace with your Strapi API URL

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [user, setUser] = useState({
    username: "",
    email: "",
    loggedIn: false,
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/local`, {
        identifier: loginData.loginEmail,
        password: loginData.loginPassword,
      });
      console.log(response.data);
      // TODO: Handle successful login, e.g. store user data/token in state

      if (user.id) {
        console.log(user.id);
        await getUserById(user.id);
        setUser.lastname(response.data.user.lastname);
      }

      setUser(response.data.user);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("id", response.data.user.id);

      navigate("/");
    } catch (error) {
      // TODO: Handle login error
      console.error("Login error:", error.response.data.error.message);
      if (error.response.data.error.message === "Invalid identifier or password")
      setError("Email or password is incorrect.");
    }
  };

  return (
    <div className="loginpage-wrapper">
      <div className="title-image-section">
        <div className="title-image-wrapper">
          <img
            className="login-title-image" src={titleImage}
            ></img>
            </div>
      </div>
      <div className="loginform-section">
      <div className="login-wrapper">
        <div className="loginform-content">
          <h2 className="login-title">Account login</h2>
          {error ? (
            <div className="error-notification-container">
            <div className="error-notification-content">
              <p>{error}</p>
            </div>
          </div>
           ) : (
            null
           )}
          <form onSubmit={handleLoginSubmit} className="login-container">
          <div className="authenticationform-input">
            <label htmlFor="loginEmail" className="authentication-label">
              Email
            </label>
            <input
              className="email-input authentication-input"
              type="email"
              id="loginEmail"
              name="loginEmail"
              placeholder="Enter your email"
              value={loginData.loginEmail}
              onChange={handleLoginChange}
              required
            />
            </div>
            <div className="authenticationform-input">
            <label htmlFor="loginPassword" className="authentication-label">
              Password
            </label>
            <input
              className="password-input authentication-input"
              type="password"
              id="loginPassword"
              name="loginPassword"
              placeholder="Enter your password"
              value={loginData.loginPassword}
              onChange={handleLoginChange}
              required
            />
            </div>
            <button
              type="submit"
              className="authentication-button button-primary authentication-input"
            >
              Log In
            </button>
          </form>
          <p className="authQuestion-text">
            Don't have an account yet? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;

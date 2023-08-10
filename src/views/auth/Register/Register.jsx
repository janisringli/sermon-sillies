import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import titleImage from "../../../assets/auth/images/registertitleImage.jpg";

const API_URL = "https://strapi-production-6e8e.up.railway.app/api"; // Replace with your Strapi API URL

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    regUsername: "",
    regEmail: "",
    regPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    checkPassword(registrationData.regPassword);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/local/register`, {
        username: registrationData.regUsername,
        email: registrationData.regEmail,
        password: registrationData.regPassword,
        firstname: registrationData.regFirstName,
        lastname: registrationData.regLastName,
      });

      // TODO: Handle successful registration, e.g. store user data/token in state
      console.log("Registered:", response.data);
      navigate("/registerConfirmation");
    } catch (error) {
      // TODO: Handle registration error
      console.error("Registration error:", error.response.data.error.message);
      setError(error.response.data.error.message);
    }
  };

  return (
    <div className="loginpage-wrapper">
      <div className="title-image-section">
        <div className="title-image-wrapper">
          <img className="login-title-image" src={titleImage}></img>
        </div>
      </div>
      <div className="loginform-section">
        <div className="login-wrapper">
          <div className="loginform-content">
            <h2 className="login-title">Create an account</h2>
            {error ? (
              <div className="error-notification-container">
                <div className="error-notification-content">
                  <p>{error}</p>
                </div>
              </div>
            ) : null}
            <form
              onSubmit={handleRegistrationSubmit}
              className="login-container"
            >
              <div className="authenticationform-input">
                <label htmlFor="regUsername" className="authentication-label">Username<strong className="required-field">*</strong></label>
                <input
                  type="text"
                  className="authentication-input"
                  id="regUsername"
                  name="regUsername"
                  value={registrationData.regUsername}
                  onChange={handleRegistrationChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="authenticationform-input">
                <label htmlFor="regFirstName" className="authentication-label">Firstname<strong className="required-field">*</strong></label>
                <input
                  className="authentication-input"
                  type="text"
                  id="regFirstName"
                  name="regFirstName"
                  placeholder="Enter your firstname"
                  value={registrationData.regFirstName}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className="authenticationform-input">
                <label htmlFor="regLastName" className="authentication-label">Lastname<strong className="required-field">*</strong></label>
                <input
                  type="text"
                  id="regLastName"
                  className="authentication-input"
                  name="regLastName"
                  placeholder="Enter your lastname"
                  value={registrationData.regLastName}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className="authenticationform-input">
                <label htmlFor="regEmail" className="authentication-label">Email<strong className="required-field">*</strong></label>
                <input
                  type="email"
                  id="regEmail"
                  className="authentication-input"
                  name="regEmail"
                  placeholder="Enter your email"
                  value={registrationData.regEmail}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className="authenticationform-input">
                <label htmlFor="regPassword" className="authentication-label">Password<strong className="required-field">*</strong></label>
                <input
                  type="password"
                  className="authentication-input"
                  id="regPassword"
                  name="regPassword"
                  value={registrationData.regPassword}
                  onChange={handleRegistrationChange}
                  required
                  placeholder="Enter a password"
                />
              </div>
              <button
                type="submit"
                className="authentication-button button-primary authentication-input"
              >
                Register
              </button>
            </form>
            <p className="authQuestion-text">
              Already have and Account? <a href="/login">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

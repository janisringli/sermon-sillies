import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://strapi-production-6e8e.up.railway.app/api'; // Replace with your Strapi API URL

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    regUsername: '',
    regEmail: '',
    regPassword: '',
  });

  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      console.log('Registered:', response.data);
        navigate('/registerConfirmation');
    } catch (error) {
      // TODO: Handle registration error
      console.error('Registration error:', error.response.data.error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistrationSubmit}>
        <label htmlFor="regUsername">Username:</label>
        <input
          type="text"
          id="regUsername"
          name="regUsername"
          value={registrationData.regUsername}
          onChange={handleRegistrationChange}
          required
        />
        <label htmlFor="regFirstName">Firstname:</label>
        <input
          type="text"
          id="regFirstName"
          name="regFirstName"
          value={registrationData.regFirstName}
          onChange={handleRegistrationChange}
          required
        />
        <label htmlFor="regLastName">LastName:</label>
        <input
          type="text"
          id="regLastName"
          name="regLastName"
          value={registrationData.regLastName}
          onChange={handleRegistrationChange}
          required
        />
        <label htmlFor="regEmail">Email:</label>
        <input
          type="email"
          id="regEmail"
          name="regEmail"
          value={registrationData.regEmail}
          onChange={handleRegistrationChange}
          required
        />
        <label htmlFor="regPassword">Password:</label>
        <input
          type="password"
          id="regPassword"
          name="regPassword"
          value={registrationData.regPassword}
          onChange={handleRegistrationChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have and Account? <a href="/login">Login</a> here</p>
    </div>
  );
};

export default RegistrationForm;

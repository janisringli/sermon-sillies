import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getUserById}  from '../../services/api';

const API_URL = 'https://strapi-production-6e8e.up.railway.app/api'; // Replace with your Strapi API URL

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

const [user, setUser] = useState({
  username: '',
  email: '',
  loggedIn: false,
  firstname: '',
  lastname: '',
});

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
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('loggedIn', true);
      localStorage.setItem("id", response.data.user.id);


    
      navigate('/');
    } catch (error) {
      // TODO: Handle login error
      console.error('Login error:', error.response.data.error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="loginEmail">Email:</label>
        <input
          type="email"
          id="loginEmail"
          name="loginEmail"
          value={loginData.loginEmail}
          onChange={handleLoginChange}
          required
        />
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          name="loginPassword"
          value={loginData.loginPassword}
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Dont have an Account yet? <a href="/register">Register</a> here</p>
    </div>
  );
};

export default LoginForm;

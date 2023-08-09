import React, { useEffect, useState } from 'react';
import Login from './views/auth/login.jsx';
import { useNavigate} from 'react-router-dom';
import { getUserById } from './services/api';


function Home() {
    const userId = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [user, setUser] = useState({username: '', email: '', loggedIn: false, firstname: '', lastname: ''});

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }

    
  }, [navigate, username]);

 
  useEffect(() => {
    async function retrieveData() {
      try {
        const userData = await getUserById(userId);
       setUser(userData);
       console.log(userData);
       
        localStorage.setItem('lastname', userData.lastname);
        localStorage.setItem('firstname', userData.firstname);
        localStorage.setItem('profilePicture', userData.profile_picture);
  
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    retrieveData();
  }, [userId]);

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/login');
    }


  return (
    <div>
      {username ? (
        <div>
          <h1>Home</h1>
          <div>Hello {username}</div>

          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;

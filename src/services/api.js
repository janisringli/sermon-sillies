import axios from 'axios';

// api call to get all the users from strapi
export const getAllUsers = async () => {
    const response = await axios.get(`https://strapi-production-6e8e.up.railway.app/api/users`);
    console.log(response.data);
    return response.data;
};

// getUserById
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`https://strapi-production-6e8e.up.railway.app/api/users/${userId}?populate=*`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

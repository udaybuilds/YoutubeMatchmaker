import { ContactSupport } from '@mui/icons-material';
import axios from 'axios';
export const BASE_URL="http://127.0.0.1:5000"
// import { SessionContext, useSession } from '@toolpad/core';

// const token=null;

export const reload = async () => {
  try {
    const getToken = () => localStorage.getItem('token');
    const user_data = () => localStorage.getItem('Acc_Value');
    const token = getToken();
    const user = user_data();

    // First, check if token exists
    if (!token) {
      console.log('No token found.');
      return null;
    }

    // Now, safely decode token
    const isTokenExpired = (token) => {
      try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return true; // Invalid token format
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error('Invalid token format:', error);
        return true; // Treat as expired if decoding fails
      }
    };

    if (isTokenExpired(token)) {
      console.log('Token is expired or invalid.');
      localStorage.removeItem('token');
      localStorage.removeItem('Acc_Value');
      return null;
    }

    // Parse user info safely
    if (user) {
      return JSON.parse(user);
    }

    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};


export const authenticate = async (cred) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, cred); // Fix payload format
    const token = response.data.token; // Get JWT token
    const user_data = response.data;
    if (token) {
      localStorage.setItem('token', token); // Store token
      localStorage.setItem('Acc_Value', JSON.stringify(user_data)); // Store user data as string
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const signout = async () => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("Acc_Value");
      console.log("User signed out.");
      return null;
  } else {
      console.warn("No user is logged in.");
      return null;
  }
};
export const signup= async(cred)=>{
  try {
      console.log("Cred sent ",cred);
      const response = await axios.post(`${BASE_URL}/signup`, cred, {
        headers: {
            "Content-Type": "application/json",
        },
    });
      console.log(response.data);
      return response
  }
  catch(error){
    console.error('Signup Failed!!')
  }
}
export const sendOtp= async(cred)=>{
  try {
    console.log(cred);
    const response = await axios.post(`${BASE_URL}/send-otp`,cred);
    console.log(response.data);
    return response
  }
  catch(error){
    console.error('Otp wasn\'t sent')
    throw error;
  }
}

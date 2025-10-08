import axios from 'axios';

// SUPER SIMPLE - Hardcoded localhost for development
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }, 
});

export default axiosInstance;

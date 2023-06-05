import axios, { AxiosInstance } from 'axios';
// import dotenv from 'dotenv'

// dotenv.config();

// const API_URL = process.env.API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: /*"https://mintic-api.onrender.com",*/ "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  }
});

export default axiosInstance;
import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL, // http://localhost:8000
  headers: {
    "Content-Type": "application/json",
  }
});

export default axiosInstance;
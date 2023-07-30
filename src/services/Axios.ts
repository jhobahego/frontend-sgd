import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from "@/store/authStore";

const setTokenInHeaders = (request: InternalAxiosRequestConfig) => {
  const authStore = useAuth()
  const token = authStore.token

  if (token.length > 0) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: /*"https://mintic-api.onrender.com",*/ "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  return setTokenInHeaders(request)
})

export default axiosInstance;
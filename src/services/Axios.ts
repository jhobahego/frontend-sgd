import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from "@/store/authStore";
import { getValidationError } from './Utils';
import { notificationUtilities } from './notificationService';

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

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    const status = error.response?.status
    if (status) {
      notificationUtilities.error(getValidationError(status))
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;
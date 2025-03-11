import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from "@/store/authStore";
import { getValidationError } from './Utils';
import { toastUtilities } from './toastNotificationService';

const setTokenInHeaders = (request: InternalAxiosRequestConfig) => {
  const authStore = useAuth()
  const token = authStore.token

  if (token.length > 0) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}

// Determinar la URL base según el entorno
const baseURL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PRODUCTION_API_URL 
  : import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
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
      toastUtilities.error(getValidationError(status))
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;
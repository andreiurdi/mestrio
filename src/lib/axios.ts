import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Create a configured axios instance for API calls
 * Handles:
 * - Base URL configuration
 * - Request/response interceptors
 * - Error handling
 * - Cookie management
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Adds auth tokens or other headers if needed
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: Add auth token to headers if available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles errors globally
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      // TODO: Implement logout and redirect
      console.error("Unauthorized - redirecting to login");
    }

    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Forbidden - user does not have permission");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

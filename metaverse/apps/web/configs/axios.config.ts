// configs/axios.config.ts
import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
};

const API = axios.create(options);

// Response interceptor for formatting errors
API.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    return Promise.reject({ ...error });
  }
);

export default API;

import axios from "axios";
import queryClient from "./query-client";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
};

const TokenRefreshToken = axios.create(options);
TokenRefreshToken.interceptors.response.use((response) => response?.data);

const API = axios.create(options);

// Response interceptor for formatting errors
API.interceptors.response.use(
  (response) => response?.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // Handle 401 Unauthorized error
    console.log("response", response)
    if (status === 401 && data?.message === "InvalidAccessToken") {
      try {
        console.log("Refreshing token...");
        await API.get("/auth/refresh");
        return TokenRefreshToken(config);
      } catch (error) {
        queryClient.clear();
        // router.push(`/signin?redirect=${pathname}`);
      }
    }

    return Promise.reject({ ...error });
  }
);

// Request interceptor for adding authorization token
// API.interceptors.request

export default API;

import axios from "axios";
// import { getCookie, setCookie } from "react-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Example: http://localhost:3000/v1
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Initialize a retry counter if not already present
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // Handle 401 errors
    if (error.response?.status === 401 && originalRequest._retryCount < 3) {
      // Increment the retry count
      originalRequest._retryCount += 1;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // If no refresh token is found, terminate retries
        if (!refreshToken) {
          throw new Error("No refresh token found. User might be logged out.");
        }

        if (
          error.response?.status === 401 &&
          originalRequest.url === "/v1/auth/refresh-token"
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
          window.location.href = "/auth/login";
          throw new Error("Refresh Tokens Expired, please login again.");
        }

        // Call the refresh token endpoint
        const { data } = await api.post("/v1/auth/refresh-token", {
          refreshToken,
        });

        // Save the new tokens
        localStorage.setItem("accessToken", data.tokens.access.token);
        localStorage.setItem("refreshToken", data.tokens.refresh.token);

        // Update Authorization header with new access token
        api.defaults.headers.Authorization = `Bearer ${data.tokens.access.token}`;
        originalRequest.headers.Authorization = `Bearer ${data.tokens.access.token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (err) {
        console.log("err", err);
        if (originalRequest._retryCount >= 3) {
          console.error("Maximum retry limit reached. Terminating requests.");
        }
        return Promise.reject(err); // Terminate if retries fail
      }
    }

    // Reject the request after reaching the retry limit
    if (originalRequest._retryCount >= 3) {
      console.error("Request terminated after maximum retries.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      // Redirect to login page
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default api;

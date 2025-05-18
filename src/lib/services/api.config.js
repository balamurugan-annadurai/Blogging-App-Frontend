import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogging-app-backend-lcc7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicAuthRoute =
      config.url.includes("/auth/login") || config.url.includes("/auth/signup");

    if (!isPublicAuthRoute && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {


    return Promise.reject(error);
  }
);

export default axiosInstance;

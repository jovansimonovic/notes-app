import axios from "axios";

// creates axios instance with custom configuration
const Axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// this is the request interceptor
// it allows modification of requests
// before sending them to backend
Axios.interceptors.request.use(
  // called before the request is sent
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  // called if an error occurs during
  // request configuration process
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

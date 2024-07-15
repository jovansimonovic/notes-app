import axios from "axios";

// creates axios instance with custom configuration
const Axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
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

// response interceptor
// it allows modification of response
// data after it arrives on frontend
Axios.interceptors.response.use(
  // called after the response arrives
  (response) => {
    return response;
  },
  // called if an error occurs during
  // response configuration process
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default Axios;

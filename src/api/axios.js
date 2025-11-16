import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("currentUser");
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://healu-api-gateway.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

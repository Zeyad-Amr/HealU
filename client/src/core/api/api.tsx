import axios from "axios";

const api = axios.create({
  baseURL: "https://healu-api-gateway.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "auth-token":
      localStorage.getItem("auth-token") ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
  },
});

export default api;

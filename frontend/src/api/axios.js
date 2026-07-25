

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// endpoints that don't require auth
const PUBLIC_ENDPOINTS = ["accounts/register/", "accounts/login/"];

API.interceptors.request.use((req) => {
  const isPublic = PUBLIC_ENDPOINTS.some((url) => req.url?.includes(url));

  if (!isPublic) {
    const token = localStorage.getItem("access");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;
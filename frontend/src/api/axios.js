import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
});
const PUBLIC_ENDPOINTS = ["accounts/register/", "accounts/login/"];

API.interceptors.request.use((req) => {
  const isPublic = PUBLIC_ENDPOINTS.some((url) => req.url?.includes(url));
  if (!isPublic) {
    const token = localStorage.getItem("access");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
          const res = await axios.post(`${baseUrl}accounts/token/refresh/`, {
            refresh,
          });
          localStorage.setItem("access", res.data.access);
          original.headers.Authorization = `Bearer ${res.data.access}`;
          return API(original);
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;
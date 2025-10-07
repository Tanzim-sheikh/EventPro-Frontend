 import axios from "axios";

 // Resolve API base URL from environment
 // Prefer Vite variable, fall back to CRA-style, then localhost default
 const envBase = (import.meta?.env?.VITE_API_BASE_URL)
   || (import.meta?.env?.REACT_APP_API_BASE_URL)
   || (import.meta?.env?.VITE_BACKEND_URL) // backward-compatible
   || "http://localhost:5000";

 // Normalize: remove trailing slash
 export const axios_url = String(envBase).replace(/\/$/, "");

 // Preconfigured axios instance
 export const axiosInstance = axios.create({
   baseURL: axios_url,
   withCredentials: true,
   headers: {
     "Content-Type": "application/json",
   },
 });

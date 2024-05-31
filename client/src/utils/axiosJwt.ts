import axios from "axios";
export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use((config) => {
  return config;
});

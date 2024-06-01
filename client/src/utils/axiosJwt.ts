import axios from "axios";
import { jwtDecode } from "jwt-decode";
import showToast from "./showToast";
import { clearUser } from "@/redux/userSlice";
import store from "@/redux/store";
export const axiosJWT = axios.create();

const logout = () => {
  showToast("Session expired please login");
  store.dispatch(clearUser());
  localStorage.removeItem("access_token");
};

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  let decodedToken;
  let accessToken = localStorage.getItem("access_token") as string;
  try {
    decodedToken = await jwtDecode(accessToken);
  } catch (error) {
    console.log("error in decodeToken" + error);
  }

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    logout();
  }
  config.headers["Authorization"] = "Bearer " + accessToken;

  return config;
});

export default axiosJWT;

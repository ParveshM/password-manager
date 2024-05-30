import { Router } from "express";
const route = Router();
import {
  USER_LOGIN,
  USER_SIGNUP,
  createNewPassword,
  deletePassword,
  fetchPasswords,
  updatePassword,
} from "../controllers/userController";
import {
  passwordValidator,
  userSignupValidator,
} from "../validator/userValidators";
import authenticateUser from "../middleware/authUser";

route.post("/signup", userSignupValidator, USER_SIGNUP);
route.post("/login", USER_LOGIN);
route.get("/passwords", authenticateUser, fetchPasswords);
route.post(
  "/passwords",
  authenticateUser,
  passwordValidator,
  createNewPassword
);
route.put("/passwords/:id", authenticateUser, updatePassword);
route.delete("/passwords/:id", authenticateUser, deletePassword);

export default route;

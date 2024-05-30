import { Router } from "express";
import {
  USER_LOGIN,
  USER_SIGNUP,
  fetchPasswords,
} from "../controllers/userController";
import { userSignupValidator } from "../validator/userValidators";
import authenticateUser from "../middleware/authUser";
const route = Router();

route.post("/signup", userSignupValidator, USER_SIGNUP);
route.post("/login", USER_LOGIN);
route.get("/passwords", authenticateUser, fetchPasswords);
route.post("/passwords");
route.put("/passwords/:id");
route.delete("/passwords/:id");

export default route;

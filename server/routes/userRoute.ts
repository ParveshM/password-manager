import { Router } from "express";
import { USER_LOGIN, USER_SIGNUP } from "../controllers/userController";
import { userSignupValidator } from "../validator/userValidators";
const route = Router();

route.post("/signup", userSignupValidator, USER_SIGNUP);
route.post("/login", USER_LOGIN);
route.get("/passwords");
route.post("/password");
route.put("/password/:id");
route.delete("/password/:id");

export default route;

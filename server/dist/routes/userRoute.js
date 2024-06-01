"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
const userController_1 = require("../controllers/userController");
const userValidators_1 = require("../validator/userValidators");
const authUser_1 = __importDefault(require("../middleware/authUser"));
route.post("/signup", userValidators_1.userSignupValidator, userController_1.USER_SIGNUP);
route.post("/login", userController_1.USER_LOGIN);
route.get("/passwords", authUser_1.default, userController_1.fetchPasswords);
route.post("/passwords", authUser_1.default, userValidators_1.passwordValidator, userController_1.createNewPassword);
route.put("/passwords/:id", authUser_1.default, userController_1.updatePassword);
route.delete("/passwords/:id", authUser_1.default, userController_1.deletePassword);
exports.default = route;

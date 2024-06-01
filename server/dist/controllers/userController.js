"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePassword = exports.updatePassword = exports.createNewPassword = exports.fetchPasswords = exports.USER_LOGIN = exports.USER_SIGNUP = void 0;
const express_validator_1 = require("express-validator");
const customError_1 = __importDefault(require("../utils/customError"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_token_1 = __importDefault(require("../utils/generate-token"));
const HttpStatus_1 = require("../Types/HttpStatus");
const Password_1 = __importDefault(require("../models/Password"));
/**
 ** METHOD:POST
 ** User Signup
 */
const USER_SIGNUP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { email } = req.body;
        const isEmailExist = yield User_1.default.findOne({ email });
        if (isEmailExist) {
            throw new customError_1.default("Email already exists", 401);
        }
        yield User_1.default.create(req.body);
        return res
            .status(200)
            .json({ success: true, message: "User registration success" });
    }
    catch (error) {
        next(error);
    }
});
exports.USER_SIGNUP = USER_SIGNUP;
/**
 ** METHOD:POST
 ** User Login
 */
const USER_LOGIN = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isEmailExist = yield User_1.default.findOne({ email });
        if (!isEmailExist) {
            throw new customError_1.default("Invalid credentials", 401);
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, isEmailExist.password);
        if (!isPasswordMatch)
            throw new customError_1.default("Invalid credentials", 401);
        const payload = {
            id: isEmailExist._id,
            name: isEmailExist.name,
            email: isEmailExist.email,
        };
        const { access_token } = (0, generate_token_1.default)(payload);
        return res.status(200).json({
            success: true,
            message: "User LoggedIn successfully",
            access_token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.USER_LOGIN = USER_LOGIN;
/**
 ** Method :GET
 ** Fetch saved password by user
 */
const fetchPasswords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const itemsPerPage = 3;
        const currentPage = parseInt(page, 10) || 1;
        const skip = (currentPage - 1) * itemsPerPage;
        let filter = {
            user: req.user,
        };
        if (q)
            filter.name = { $regex: q, $options: "i" };
        const passwords = yield Password_1.default.find(filter)
            .skip(skip)
            .limit(itemsPerPage);
        res.status(200).json({
            success: true,
            passwords,
            message: "Passwords fetched successfully",
        });
    }
    catch (error) {
        next(new customError_1.default("Fetching password failed", HttpStatus_1.HttpStatus.FOUND));
    }
});
exports.fetchPasswords = fetchPasswords;
/**
 ** Method :POST
 ** Create new password for user
 */
const createNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { name, password } = req.body;
        const isnameUsed = yield Password_1.default.findOne({
            user: req.user,
            name: new RegExp(`^${name}$`, "i"),
        });
        if (isnameUsed)
            throw new customError_1.default("Name already in use", HttpStatus_1.HttpStatus.CONFLICT);
        const newPassword = yield Password_1.default.create({
            user: req.user,
            name,
            password,
        });
        res.status(200).json({
            success: true,
            newPassword,
            message: "Password saved successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewPassword = createNewPassword;
/**
 ** Method :PUT
 ** Update created password
 */
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const password = yield Password_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            updatePassword: password,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        next(new customError_1.default("Updating password failed", HttpStatus_1.HttpStatus.FOUND));
    }
});
exports.updatePassword = updatePassword;
/**
 ** Method :DELETE
 ** DELETE created password
 */
const deletePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Password_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Password deleted successfully",
        });
    }
    catch (error) {
        next(new customError_1.default("Deleting password failed", HttpStatus_1.HttpStatus.FOUND));
    }
});
exports.deletePassword = deletePassword;

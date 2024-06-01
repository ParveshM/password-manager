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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatus_1 = require("../Types/HttpStatus");
const ENV_1 = __importDefault(require("../config/ENV"));
const customError_1 = __importDefault(require("../utils/customError"));
// verify the token and validate user
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(HttpStatus_1.HttpStatus.FORBIDDEN).json("Your are not authenticated");
        }
        const access_token = authHeader.split(" ")[1];
        try {
            const user = jsonwebtoken_1.default.verify(access_token, ENV_1.default.ACCESS_SECRET);
            req.user = user.id;
            next();
        }
        catch (error) {
            next(new customError_1.default("Token is not valid", HttpStatus_1.HttpStatus.FORBIDDEN));
        }
    });
}
exports.default = authenticateUser;

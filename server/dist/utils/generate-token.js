"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ENV_1 = __importDefault(require("../config/ENV"));
const generateTokens = (payload) => {
    const access_token = jsonwebtoken_1.default.sign(payload, ENV_1.default.ACCESS_SECRET, {
        expiresIn: "2d",
    });
    return { access_token };
};
exports.default = generateTokens;

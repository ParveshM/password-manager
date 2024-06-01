"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.userSignupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.userSignupValidator = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long.")
        .matches(/\d/)
        .withMessage("Password must contain a number.")
        .trim(),
];
exports.passwordValidator = [
    (0, express_validator_1.body)("name").isString(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 1 })
        .withMessage("Password must be at least 1 characters long.")
        .trim(),
];

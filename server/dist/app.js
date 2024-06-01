"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = __importDefault(require("./config/connection"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const customError_1 = __importDefault(require("./utils/customError"));
const ENV_1 = __importDefault(require("./config/ENV"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use("/api", userRoute_1.default);
app.use(errorHandler_middleware_1.default);
app.all("*", (req, res, next) => {
    next(new customError_1.default(`Not found ${req.url}`, 404));
});
// server
const port = ENV_1.default.PORT || 3000;
app.listen(port, () => {
    (0, connection_1.default)();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const student_Router_1 = require("./Routes/student-Router");
const Teacher_Router_1 = __importDefault(require("./Routes/Teacher-Router"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use("/api", student_Router_1.studentRouter);
app.use("/api", Teacher_Router_1.default);
exports.default = app;

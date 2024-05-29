"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
const app_1 = __importDefault(require("./src/app"));
const port = 6000;
app_1.default.use((0, cors_1.default)());
// app.use(bodyParser.json());
app_1.default.use(express_1.default.json());
app_1.default.listen(port, () => {
    console.log(`Server is Running on Port: http://locolhost:${port}/`);
});

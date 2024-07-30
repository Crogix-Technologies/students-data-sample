"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
//connecting to mongo db
mongoose_1.default.connect('mongodb://localhost:27017/school', {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB connected successfully!");
});
app_1.default.listen(port, () => {
    console.log(`Server is Running on Port: http://locolhost:${port}/`);
});

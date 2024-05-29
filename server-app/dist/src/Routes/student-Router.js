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
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../../Database/student"));
const studentRouter = express_1.default.Router();
const studentObj = new student_1.default();
// Route to get all students
studentRouter.get("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = yield studentObj.getAll();
        console.log(studentData);
        res.send({
            status: 200,
            message: "Success",
            data: studentData,
        });
    }
    catch (err) {
        console.error("Error fetching student data:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server.",
            error: err.message,
            data: null,
        });
    }
}));
exports.default = studentRouter;

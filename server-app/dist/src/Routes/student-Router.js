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
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_model_1 = require("../../Database/Models/student-model");
const studentRouter = express_1.default.Router();
exports.studentRouter = studentRouter;
// Route to get all students
studentRouter.get("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_model_1.StudentModel.find({});
        res.status(200).send(students);
    }
    catch (err) {
        console.error("Error getting students:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server."
        });
    }
}));
//Saving a student Data POST Method
studentRouter.post("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rollNumber, name, fatherName, email, phoneNumber } = req.body;
        const studentModel = student_model_1.StudentModel.build({ rollNumber, name, fatherName, email, phoneNumber });
        yield studentModel.save();
        res.status(201).send(studentModel);
    }
    catch (err) {
        console.error("Error creating student:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server."
        });
    }
}));
// updating student data Put Method
studentRouter.put("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rollNumber, name, fatherName, email, phoneNumber } = req.body;
        const filter = { rollNumber: parseInt(rollNumber) };
        const studentUpate = {
            rollNumber: rollNumber,
            name: name,
            fatherName: fatherName,
            email: email,
            phoneNumber: phoneNumber
        };
        const studentModel = student_model_1.StudentModel.findOneAndUpdate(filter, studentUpate);
        res.status(201).send(studentModel);
    }
    catch (err) {
        console.error("Error in updating student:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server."
        });
    }
}));
//Deleting student data
studentRouter.delete("/student/:rollNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rollNumber = parseInt(req.params.rollNumber);
        const deletedCount = yield student_model_1.StudentModel.deleteOne({ rollNumber: rollNumber });
        res.status(201).send({
            deletedCount: deletedCount
        });
    }
    catch (err) {
        console.error(`Error in deleting student:`, err);
        res.send({
            status: 500,
            message: "Something went wrong on the server."
        });
    }
}));

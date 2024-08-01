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
const teacher_model_1 = require("../../Database/Models/teacher-model");
const teacherRouter = express_1.default.Router();
// Route to get all students
teacherRouter.get("/teachers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacher_model_1.TeacherModel.find({});
        res.status(200).send(teacher);
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
teacherRouter.post("/teacher", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, fatherName, email, phoneNumber, subject } = req.body;
        const teacherModel = teacher_model_1.TeacherModel.build({ id, name, fatherName, email, phoneNumber, subject });
        yield teacherModel.save();
        res.status(201).send(teacherModel);
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
teacherRouter.put("/teacher", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, fatherName, email, phoneNumber, subject } = req.body;
        const filter = { id: parseInt(id) };
        const studentUpate = {
            id: id,
            name: name,
            fatherName: fatherName,
            email: email,
            phoneNumber: phoneNumber,
            subject: subject
        };
        const teacherModel = teacher_model_1.TeacherModel.findOneAndUpdate(filter, studentUpate);
        res.status(201).send(teacherModel);
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
teacherRouter.delete("/teacher/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedCount = yield teacher_model_1.TeacherModel.deleteOne({ id: id });
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
exports.default = teacherRouter;

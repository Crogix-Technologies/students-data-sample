"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    rollNumber: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    fatherName: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: false
    },
});
studentSchema.statics.build = (attr) => {
    return new StudentModel(attr);
};
const StudentModel = mongoose_1.default.model('Student', studentSchema);
exports.StudentModel = StudentModel;

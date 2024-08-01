"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    fatherrName: {
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
    subject: {
        type: String,
        require: true
    }
});
teacherSchema.statics.build = (attr) => {
    return new TeacherModel(attr);
};
const TeacherModel = mongoose_1.default.model('Student', teacherSchema);
exports.TeacherModel = TeacherModel;

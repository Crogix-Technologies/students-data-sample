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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const filePath = path_1.default.join(__dirname, "studentData.json");
class Student {
    // gets list of all saved students from json file
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.promises.readFile(filePath, 'utf-8');
                const studentData = JSON.parse(data);
                return studentData;
            }
            catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        });
    }
}
exports.default = Student;

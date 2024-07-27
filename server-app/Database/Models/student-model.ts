import { number, string } from "joi";
import mongoose from "mongoose";
import { IStudent } from "../Interfaces/IStudent";

interface StudentDoc extends mongoose.Document{
    rollNumber: number,
    name: string,
    fatherName: string,
    email: string,
    phoneNumber: string
}

interface IStudentModel extends mongoose.Model<StudentDoc>{
    build(attr: IStudent): StudentDoc;
}

const studentSchema = new mongoose.Schema({
    rollNumber:{
        type: Number,
        require: true
    },
    name:{
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

studentSchema.statics.build = (attr: IStudent) => {
    return new StudentModel(attr);  
}

const StudentModel = mongoose.model<any, IStudentModel>('Student', studentSchema);

export { StudentModel };
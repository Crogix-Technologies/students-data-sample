import { number, string } from "joi";
import mongoose from "mongoose";
import { IStudent } from "../Interfaces/IStudent";

interface StudentDoc extends mongoose.Document<IStudent>{}

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

//injecting build method into model
studentSchema.statics.build = (attr: IStudent) => {
    return new StudentModel(attr);  
}

const StudentModel = mongoose.model<IStudent, IStudentModel>('Student', studentSchema);


export { StudentModel};
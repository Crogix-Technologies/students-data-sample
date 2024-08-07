import { StudentModel } from "../Database/Models/student-model";
import { IStudent } from '../Database/Interfaces/IStudent';

class StudentService {
    async getStudents() : Promise<IStudent[]> {
        try {
            let students = await StudentModel.find<IStudent>({});
            return students
        } catch (error) {
            throw error;
        }
    };

    async saveStudent(student: IStudent){
        try {
            const studentModel = StudentModel.build(student);
            await studentModel.save();
            return studentModel;
        } catch (error) {
            throw error;
        }
    }

    async updateStudent(student: IStudent){
        try {
            if (!student.rollNumber || isNaN(student.rollNumber)) {
                throw new Error("Invalid roll number.");
              }
              //updating student
              const studentModel = await StudentModel.findOneAndUpdate({rollNumber: student.rollNumber }, student, { new: true });
              if (!studentModel) {
                throw new Error("student not found.");
              }
              return studentModel;
        } catch (error) {
            throw error;           
        }
    };

    async deleteStudent(rollNumber: number){
        try {
            const deletedCount = await StudentModel.deleteOne({rollNumber: rollNumber});
            return { deletedCount: deletedCount };
        } catch (error) {
            throw error;           
        }
    };
}

export const studentService = new StudentService();


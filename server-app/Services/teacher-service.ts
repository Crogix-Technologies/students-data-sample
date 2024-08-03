import { TeacherModel } from "../Database/Models/teacher-model";
import { ITeacher } from '../Database/Interfaces/ITeacher';


class TeacherServices
{
    async getTeachers()
    {
        try {
            
            let Teachers = await TeacherModel.find({});
            return Teachers;

        } catch (error) {
            throw error;
        }
    };

    async createTeacher(teacher: ITeacher)
    {
        try {
            
            const teacherModel = TeacherModel.build(teacher);
            await teacherModel.save();
            return teacherModel;

        } catch (error) {
            throw error;
        }

    };

    async updateTeacher(teacher: ITeacher)
    {
        if (!teacher.id || isNaN(teacher.id)) {
            throw new Error("Invalid roll number.");
          }
        try {
            const teacherModel = await TeacherModel.findOneAndUpdate({id: teacher.id}, teacher, { new: true });
            if(!teacherModel)
            {
                throw new Error("Teacher not found.");
            }
            return teacherModel;
        } catch (error) {
            throw error;
        }
    };

    async deleteTeacher(Id: number)
    {
        try {
    const deleteCount = await  TeacherModel.deleteOne({id:Id});
    return {
        deleteCount: deleteCount
    }
        } 
        catch (error) {
    throw error;
}
    };
}

export const teacherServices = new TeacherServices();
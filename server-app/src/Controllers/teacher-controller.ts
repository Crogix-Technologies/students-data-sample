import { Request, Response, NextFunction} from 'express';
import { teacherServices } from '../../Services/teacher-service';
import { ITeacher } from '../../Database/Interfaces/ITeacher';

class TeacherControlller 
{

 async getTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teachers = await teacherServices.getTeachers();
        res.status(200).send(teachers);

    } catch (error) {
        return next(error)
    }

 };
 async createTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teacher = req.body as ITeacher;
        const teachers = await teacherServices.createTeacher(teacher);
        res.status(200).send(teachers);

    } catch (error) {
        return next(error)
    }

 };
 async updateTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teacherReq = req.body as ITeacher;
        const teacher = await teacherServices.updateTeacher(teacherReq);
        res.status(200).send(teacher);

    } catch (error) {
        return next(error)
    }

 };
 async deleteTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        var id = parseInt(req.params.id);
        const teacherDel = await teacherServices.deleteTeacher(id);
        res.status(200).send(teacherDel);

    } catch (error) {
        return next(error)
    }

 };


}

export const teacherController = new TeacherControlller();
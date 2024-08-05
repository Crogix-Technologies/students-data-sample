import { Request, Response, NextFunction} from 'express';
import { teacherServices } from '../../Services/teacher-service';
import { ITeacher } from '../../Database/Interfaces/ITeacher';
import { StatusCodes } from '../../@Types/status-codes';

class TeacherControlller 
{

 async getTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teachers = await teacherServices.getTeachers();
        res.status(StatusCodes.OK).send(teachers);

    } catch (error) {
        return next(error)
    }

 };
 async createTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teacher = req.body as ITeacher;
        const teachers = await teacherServices.createTeacher(teacher);
        res.status(StatusCodes.OK).send(teachers);

    } catch (error) {
        return next(error)
    }

 };
 async updateTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        const teacherReq = req.body as ITeacher;
        const teacher = await teacherServices.updateTeacher(teacherReq);
        res.status(StatusCodes.OK).send(teacher);

    } catch (error) {
        return next(error)
    }

 };
 async deleteTeacher(req: Request, res: Response, next: NextFunction)
 {
    try {
        var id = parseInt(req.params.id);
        const teacherDel = await teacherServices.deleteTeacher(id);
        res.status(StatusCodes.OK).send(teacherDel);

    } catch (error) {
        return next(error)
    }

 };


}

export const teacherController = new TeacherControlller();
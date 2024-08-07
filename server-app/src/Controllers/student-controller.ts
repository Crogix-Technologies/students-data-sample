import { Request, Response, NextFunction} from 'express';
import { studentService } from '../../Services/student-service';
import { IStudent } from '../../Database/Interfaces/IStudent';
import { CustomError } from '../Utils/error';
import { StatusCodes } from '../../@Types/status-codes';

class StudentController {
    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await studentService.getStudents();
            res.status(StatusCodes.OK).send(students);
        } catch (error) {
            return next(error)
        }
    }
    async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const student = req.body as IStudent;
            const students = await studentService.saveStudent(student);
            res.status(StatusCodes.OK).send(students);
        } catch (error) {
            return next(error)
        }
    }

    async updateStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const studentReq = req.body as IStudent;
            const student = await studentService.updateStudent(studentReq);

            res.status(StatusCodes.OK).send(student);
        } catch (error) {
            return next(error)
        }
    }

    async deleteStudent(req: Request, res: Response, next: NextFunction) {
        try {
            var rollNumber = parseInt(req.params.rollNumber);
            const delResp = await studentService.deleteStudent(rollNumber);
            res.status(StatusCodes.OK).send(delResp);
        } catch (error) {
            return next(error)
        }
    }
}

export const studentController = new StudentController();
import express from 'express';
import { teacherController } from '../Controllers/teacher-controller';
import { CatchAsyncError } from '../Utils/catch-async-error';
import validateRequest from '../Middlewares/validation-error-handler';

const teacherRouter = express.Router();

// teacher routes
teacherRouter.get("/teachers", CatchAsyncError(teacherController.getTeacher));
teacherRouter.post("/teacher", validateRequest("/teacher-validator"), CatchAsyncError(teacherController.createTeacher));
teacherRouter.put("/teacher", validateRequest("/teacher-validator"),CatchAsyncError(teacherController.updateTeacher));
teacherRouter.delete("/teacher/:id", validateRequest("/teacher-validator"), CatchAsyncError(teacherController.deleteTeacher));

export {teacherRouter};

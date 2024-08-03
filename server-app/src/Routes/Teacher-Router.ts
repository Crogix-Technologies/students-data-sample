import express from 'express';
import { teacherController } from '../Controllers/teacher-controller';

const teacherRouter = express.Router();

// teacher routes
teacherRouter.get("/teachers",teacherController.getTeacher);
teacherRouter.post("/teacher",teacherController.createTeacher);
teacherRouter.put("/teacher",teacherController.updateTeacher);
teacherRouter.delete("/teacher/:id",teacherController.deleteTeacher);

export {teacherRouter};

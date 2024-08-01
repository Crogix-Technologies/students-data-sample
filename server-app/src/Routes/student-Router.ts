import express from 'express';
import { studentController } from '../Controllers/student-controller';

const studentRouter = express.Router();

// Student routes
studentRouter.get("/students", studentController.getStudents);
studentRouter.post("/student", studentController.createStudent);
studentRouter.put("/student", studentController.updateStudent);
studentRouter.delete("/student/:rollNumber", studentController.deleteStudent);

export { studentRouter };

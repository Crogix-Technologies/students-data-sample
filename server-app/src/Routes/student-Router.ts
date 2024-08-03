import express from 'express';
import { studentController } from '../Controllers/student-controller';
import { CatchAsyncError } from "../Utils/catch-async-error";
import validateRequest from '../Middlewares/validation-error-handler';

const studentRouter = express.Router();

// Student routes
studentRouter.get("/students", CatchAsyncError(studentController.getStudents) );
studentRouter.post("/student", validateRequest("/student-validator"), CatchAsyncError(studentController.createStudent));
studentRouter.put("/student", validateRequest("/student-validator"), CatchAsyncError(studentController.updateStudent));
studentRouter.delete("/student/:rollNumber", validateRequest("/student-validator"), CatchAsyncError(studentController.deleteStudent));

export { studentRouter };

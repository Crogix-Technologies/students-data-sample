import { studentRequestValidator } from "../RequestValidators/student-request-validator";
import { teacherRequestValidator } from "../RequestValidators/teacher-request-validator";

export const requestValidators = {
    "/student-validator": studentRequestValidator,
    "/teacher-validator": teacherRequestValidator
}
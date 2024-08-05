import express from 'express';
import bodyParser, { BodyParser } from "body-parser";
import cors from 'cors';
import {studentRouter } from './Routes/student-Router';
import {teacherRouter} from './Routes/Teacher-Router';
import { CustomError } from './Utils/error';
import { StatusCodes } from '../@Types/status-codes';
import { errorHandler } from './Middlewares/error-handler';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", 
    studentRouter, 
    teacherRouter);

app.use("*", (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    next(new CustomError("Requested route is invalid", StatusCodes.NotFound));
});

app.use(errorHandler)

export default app;

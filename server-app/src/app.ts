import express from 'express';
import bodyParser, { BodyParser } from "body-parser";
import cors from 'cors';
import { studentRouter } from './Routes/student-Router';
import {teacherRouter} from './Routes/Teacher-Router';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", studentRouter);
app.use("/api", teacherRouter);

export default app;

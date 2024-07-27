import express from 'express';
import { json } from "body-parser";
import cors from 'cors';
import { studentRouter } from './Routes/student-Router';
import teacherRouter from './Routes/Teacher-Router';


const app = express();
app.use(json());
app.use(cors());

app.use("/api", studentRouter);
app.use("/api", teacherRouter);

export default app;

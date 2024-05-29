import express from 'express';
import cors from 'cors';
import studentRouter from './Routes/student-Router';
import teacherRouter from './Routes/Teacher-Router';


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", studentRouter);
app.use("/api/v2", teacherRouter);

export default app;

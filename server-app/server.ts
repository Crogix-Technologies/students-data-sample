import cors from 'cors';
import express from 'express';

// import bodyParser from 'body-parser';
import app from "./src/app";


const port  = 80;

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.listen(port, ()=>
{
    console.log(`Server is Running on Port: http://locolhost:${port}/`)
});

//this is a sample comment added for testing git push

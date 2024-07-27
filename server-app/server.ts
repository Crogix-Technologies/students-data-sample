
import app from "./src/app";
import mongoose from "mongoose";

const port  = 3000;

//connecting to mongo db
mongoose.connect('mongodb://localhost:27017/school', {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB connected successfully!");
});

app.listen(port, ()=>
{
    console.log(`Server is Running on Port: http://locolhost:${port}/`)
});

//Second Testing -------------------------------
import express from 'express';
import student from '../../Database/student';
import { studentEntity } from '../../Database/Entities/studentEntity';

const studentRouter = express.Router();
const studentObj = new student();

// Route to get all students
studentRouter.get("/students", async (req, res) => {
    try {
        const studentData = await studentObj.getAll()
        res.send({
            status: 200,
            message: "Success",
            data: studentData,
        });
    } catch (err: any) {
        console.error("Error fetching student data:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server.",
            error: err.message,
            data: null,
        });
    }
});
//Saving a student Data POST Method
studentRouter.post("/student", async ( req, res) => {
  try {

    const {id, name, fname, email, phoneNumber } = req.body;
    let std: studentEntity = {
      id: id,
      name: name,
      fname: fname,
      email: email,
      phoneNumber: phoneNumber
    }

    const result = await studentObj.postData(std);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error posting student data:", err);
    res.status(500).send("Error processing request");
  }
});

//Deleting student data
studentRouter.delete("/student/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  studentObj.deleteData(id);
});

// updating student data Put Method
studentRouter.put("/student/:id",async (req ,res)=>
{
  const id = parseInt(req.params.id, 10);
  const allStudentData = req.body;
  studentObj.putData(id, allStudentData);
});

export default studentRouter;

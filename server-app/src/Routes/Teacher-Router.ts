import express from 'express';
import student from '../../Database/teacher';
import { teacherEntity } from '../../Database/Interfaces/teacherEntity';

const teacherRouter = express.Router();
const teacherObj = new student();

// Route to get all students
teacherRouter.get("/teachers", async (req, res) => {
    try {
        const teacherData = await teacherObj.getAll()
        res.send({
            status: 200,
            message: "Success",
            data: teacherData,
        });
    } catch (err: any) {
        console.error("Error fetching teacher data:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server.",
            error: err.message,
            data: null,
        });
    }
});
//Saving a student Data POST Method
teacherRouter.post("/teacher", async ( req, res) => {
  try {

    const {id, name, fname, email, phoneNumber, subject } = req.body;
    let std: teacherEntity = {
      id: id,
      name: name,
      fname: fname,
      email: email,
      phoneNumber: phoneNumber,
      subject: subject
    }


    const result = await teacherObj.postData(std);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error posting teacher data:", err);
    res.status(500).send("Error processing request");
  }
});

//Deleting student data
teacherRouter.delete("/teacher/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  teacherObj.deleteData(id);
});

teacherRouter.put("/teacher/:id",async (req ,res)=>
{
  const id = parseInt(req.params.id, 10);
  const allTeacherData = req.body;
  teacherObj.putData(id, allTeacherData);
});

export default teacherRouter;

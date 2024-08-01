import express from 'express';
import { StudentModel } from "../../Database/Models/student-model";
import { IStudent } from '../../Database/Interfaces/IStudent';
import { json } from 'body-parser';

const studentRouter = express.Router();

// Route to get all students
studentRouter.get("/students", async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).send(students);
    } 
    catch (err) {
        console.error("Error getting students:", err);
        res.send({
            status: 500,
            message: "Something went wrong on the server."
        });
    }
});

//Saving a student Data POST Method
studentRouter.post("/student", async ( req, res) => {
    try {
        const {rollNumber, name, fatherName, email, phoneNumber } = req.body;
        const studentModel = StudentModel.build({rollNumber, name, fatherName, email, phoneNumber});
        await studentModel.save();
        res.status(201).send(studentModel);
    } 
    catch (err) {
        console.error("Error creating student:", err);
        res.send({
          status: 500,
          message: "Something went wrong on the server."
        });
    }
});

// updating student data Put Method
studentRouter.put("/student", async (req, res) => {
  try {
    const { rollNumber, name, fatherName, email, phoneNumber } = req.body;

    if (!rollNumber || isNaN(rollNumber)) {
      return res.status(400).send({ message: "Invalid roll number" });
    }

    const filter = { rollNumber: parseInt(rollNumber, 10) }; // Ensure rollNumber is parsed correctly
    const studentUpdate = {
      name,
      fatherName,
      email,
      phoneNumber
    };

    const studentModel = await StudentModel.findOneAndUpdate(filter, studentUpdate, { new: true });

    if (!studentModel) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(studentModel);
  } catch (err) {
    console.error("Error in updating student:", err);
    res.status(500).send({ message: "Something went wrong on the server." });
  }
});

//Deleting student data
studentRouter.delete("/student/:rollNumber", async (req, res) => {
  try{
    const rollNumber = req.params.rollNumber;
    const deletedCount = await StudentModel.deleteOne({rollNumber: rollNumber});
    res.status(201).send(
      {
        deletedCount: deletedCount
      });
  }
  catch (err) {
        console.error(`Error in deleting student:`, err);
        res.send({
          status: 500,
          message: "Something went wrong on the server."
        });
    }


});

export { studentRouter };

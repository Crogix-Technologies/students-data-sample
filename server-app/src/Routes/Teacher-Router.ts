import express from 'express';
import { TeacherModel } from "../../Database/Models/teacher-model";
import { ITeacher } from '../../Database/Interfaces/ITeacher';

const teacherRouter = express.Router();

// Route to get all students
teacherRouter.get("/teachers", async (req, res) => {
    try {
      const teacher = await TeacherModel.find({});
      res.status(200).send(teacher);
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
teacherRouter.post("/teacher", async ( req, res) => {
  try {
    const {id, name, fatherName, email, phoneNumber, subject } = req.body;
    const teacherModel = TeacherModel.build({id, name, fatherName, email, phoneNumber, subject});
    await teacherModel.save();
    res.status(201).send(teacherModel);
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
teacherRouter.put("/teacher",async (req ,res) =>
  {
    try {
      const {id, name, fatherName, email, phoneNumber, subject } = req.body;
      const filter = {id: parseInt(id)};
      const teacherUpate: ITeacher = {
        id: id,
        name: name,
        fatherName: fatherName,
        email: email,
        phoneNumber: phoneNumber,
        subject: subject
      };
      const teacherModel = await TeacherModel.findOneAndUpdate(filter, teacherUpate, { new: true });

      if (!teacherModel) {
        return res.status(404).send({ message: "Student not found" });
      }

      
      res.status(200).send(teacherModel);
  } 
  catch (err) {
      console.error("Error in updating student:", err);
      res.send({
        status: 500,
        message: "Something went wrong on the server."
      });
  }
  });

//Deleting student data
teacherRouter.delete("/teacher/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const deletedCount = await TeacherModel.deleteOne({id: id});
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


export default teacherRouter;

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getSpecStudent = async (req, res) => {
  const roll = req.params.roll;
  try {
    const student = await Student.findOne({ roll: roll });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateStudent = async (req, res) => {
  const roll = req.params.roll;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { roll: roll },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const roll = req.params.roll;
  try {
    await Student.findOneAndDelete({ roll: roll });
    res.status(204).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const Student = require("../model/studentdata");
const createStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  getStudents,
  getSpecStudent,
  updateStudent,
  deleteStudent,
  createStudent,
};

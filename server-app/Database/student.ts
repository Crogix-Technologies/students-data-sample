import path from 'path';
import { promises as fs } from 'fs';
import { studentEntity } from './Entities/entity';

const filePath = path.join(__dirname, "studentData.json");

export default class Student {
    // gets list of all saved students from json file
    public async getAll(): Promise<any> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const studentData = JSON.parse(data);
            return studentData;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

      //saving data to the json file
  public async postData(std: studentEntity): Promise<any> {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const studentData = JSON.parse(data) || [];
      studentData.push(std);
      let studentDataJson = JSON.stringify(studentData, null, 2);
      await fs.writeFile(filePath, studentDataJson);
      return { message: "Data has been saved" };
    } catch (err) {
      console.error("Error reading or writing file:", err);
      throw err;
    }
  }

   // delete method
  public async deleteData(studentId:any) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const studentData = JSON.parse(data);
      const updatedData = studentData.filter((student: any) => student.id !== studentId);

      let studentDataJson = JSON.stringify(updatedData, null, 2);
      await fs.writeFile(filePath, studentDataJson);
      return { message: "Data has been Deleted" };

    } catch (err) {
      console.error("Error Deleting Data:", err);
    }
  }


 // Editing Student Data : put method (update data) 
 public async putData(StudentId: any, allStudentData:any) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const studentData = JSON.parse(data);
      const updatedData = studentData.map((student:any) =>
        student.id === StudentId ? { ...student, ...allStudentData } : student
      );

      let studentDataJson = JSON.stringify(updatedData, null, 2);
      await fs.writeFile(filePath, studentDataJson);      
      return { message: "Data has been Edited" };

    } catch (err) {
      console.error("Error Editing Data:", err);
    }
  }
  

}

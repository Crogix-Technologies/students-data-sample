import path from 'path';
import { promises as fs } from 'fs';
import { teacherEntity} from './Entities/teacherEntity';


const filePath = path.join(__dirname, "teachersData.json");

export default class Teacher {
    // gets list of all saved students from json file
    public async getAll(): Promise<any> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const teacherData = JSON.parse(data);
            return teacherData;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

      //saving data to the json file
  public async postData(std: teacherEntity): Promise<any> {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const teacherData = JSON.parse(data) || [];
      teacherData.push(std);
      let teacherDataJson = JSON.stringify(teacherData, null, 2);
      await fs.writeFile(filePath, teacherDataJson);
      return { message: "Data has been saved" };
    } catch (err) {
      console.error("Error reading or writing file:", err);
      throw err;
    }
  }

   // delete method
  public async deleteData(teacherId:any) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const teacherData = JSON.parse(data);
      const updatedData = teacherData.filter((teacher: any) => teacher.id !== teacherId);

      let teacherDataJson = JSON.stringify(updatedData, null, 2);
      await fs.writeFile(filePath, teacherDataJson);
      return { message: "Data has been Deleted" };

    } catch (err) {
      console.error("Error Deleting Data:", err);
    }
  }


 // Editing Teachers Data : put method (update data) 
 public async putData(teacherId: any, allTeacherData:any) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const teacherData = JSON.parse(data);
      const updatedData = teacherData.map((teacher:any) =>
        teacher.id === teacherId ? { ...teacher, ...allTeacherData } : teacher
      );

      let teacherDataJson = JSON.stringify(updatedData, null, 2);
      await fs.writeFile(filePath, teacherDataJson);      
      return { message: "Data has been Edited" };

    } catch (err) {
      console.error("Error Editing Data:", err);
    }
  }
  

}

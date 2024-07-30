import mongoose from "mongoose";
import { ITeacher } from "../Interfaces/ITeacher";


interface teacherDoc extends mongoose.Document{
  id: number,
  name: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  subject: string
}


interface ITeacherModel extends mongoose.Model<teacherDoc>{
  build(attr: ITeacher): teacherDoc;
}
const teacherSchema = new mongoose.Schema({
  id:{
      type: Number,
      require: true
  },
  name:{
      type: String,
      require: true
  },
  fatherName: {
      type: String,
      require: false
  },
  email: {
      type: String,
      require: true
  },
  phoneNumber: {
      type: String,
      require: false
  },
  subject:
  {
    type : String,
    require : true
  }
});

teacherSchema.statics.build = (attr: ITeacher) => {
  return new TeacherModel(attr);  
}

const TeacherModel = mongoose.model<any, ITeacherModel>('Teachers', teacherSchema);

export { TeacherModel };


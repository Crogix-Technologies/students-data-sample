
import mongoose from "mongoose";
import { IRole } from "../../Interfaces/Identity/IRole";

interface IRoleDoc extends mongoose.Document<IRole>{}

interface IRoleModel extends mongoose.Model<IRoleDoc>{
    build(attr: IRole): IRoleDoc;
}

const roleSchema = new mongoose.Schema({
    role:{
        type: String,
        require: true
    }
});

roleSchema.statics.build = (attr: IRole) => {
    return new RoleModel(attr);  
}

const RoleModel = mongoose.model<IRole, IRoleModel>('Role', roleSchema);

export { RoleModel};
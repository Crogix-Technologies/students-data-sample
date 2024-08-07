
import mongoose from "mongoose";
import { IUserRole } from "../../Interfaces/Identity/IUserRole";

interface IUserRoleDoc extends mongoose.Document<IUserRole>{ }

interface IUserRoleModel extends mongoose.Model<IUserRoleDoc>{
    build(attr: IUserRole): IUserRoleDoc;
}

const userRoleSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    roleId:{
        type: String,
        require: true
    }
});

userRoleSchema.statics.build = (attr: IUserRole) => {
    return new UserRoleModel(attr);  
}

const UserRoleModel = mongoose.model<IUserRole, IUserRoleModel>('UserRole', userRoleSchema);

export { UserRoleModel};
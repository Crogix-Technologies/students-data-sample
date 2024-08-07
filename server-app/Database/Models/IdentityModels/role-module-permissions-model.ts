
import mongoose from "mongoose";
import { IRoleModulePermission } from "../../Interfaces/Identity/IRoleModulePermission";

interface IRoleModulePermissionDoc extends mongoose.Document<IRoleModulePermission>{}

interface IRoleModulePermissionModel extends mongoose.Model<IRoleModulePermissionDoc>{
    build(attr: IRoleModulePermission): IRoleModulePermissionDoc;
}

const roleModulePermissionSchema = new mongoose.Schema({
    roleModuleId:{
        type: String,
        require: true
    },
    permissionValue:{
        type: String,
        require: true
    }
});

roleModulePermissionSchema.statics.build = (attr: IRoleModulePermission) => {
    return new RoleModulePermissionModel(attr);  
}

const RoleModulePermissionModel = mongoose.model<IRoleModulePermission, IRoleModulePermissionModel>('RoleModules', roleModulePermissionSchema);

export { RoleModulePermissionModel};
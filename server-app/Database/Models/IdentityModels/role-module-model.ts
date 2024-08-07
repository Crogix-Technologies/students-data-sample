
import mongoose from "mongoose";
import { IRoleModule } from "../../Interfaces/Identity/IRoleModule";

interface IRoleModuleDoc extends mongoose.Document<IRoleModule>{}

interface IRoleModuleModel extends mongoose.Model<IRoleModuleDoc>{
    build(attr: IRoleModule): IRoleModuleDoc;
}

const roleModuleSchema = new mongoose.Schema({
    roleId:{
        type: String,
        require: true
    },
    moduleName:{
        type: String,
        require: true
    }
});

roleModuleSchema.statics.build = (attr: IRoleModule) => {
    return new RoleModuleModel(attr);  
}

const RoleModuleModel = mongoose.model<IRoleModule, IRoleModuleModel>('RoleModules', roleModuleSchema);

export { RoleModuleModel};
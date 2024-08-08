import { RoleModuleModel} from "../../Database/Models/IdentityModels/role-module-model";
import { IRoleModule } from '../../Database/Interfaces/Identity/IRoleModule';
import { ObjectId } from "mongodb";
import { CustomError } from "../../src/Utils/error";
import { StatusCodes } from "../../@Types/status-codes";

class RoleModuleModelServies {
    async getRolesModule() : Promise<IRoleModule[]> {
        try {
            let roleModule = await RoleModuleModel.find<IRoleModule>({});
            return roleModule;
        } catch (error) {
            throw error;
        }
    };

    async createRolesModule(roleModule: IRoleModule): Promise<IRoleModule>{
        try {
            const roleModuleModel = RoleModuleModel.build(roleModule);
            await roleModuleModel.save();
            return new Promise<IRoleModule>(roleModuleModel.toObject());
        } catch (error) {
            throw error;
        }
    }

    async updateRolesModule(roleModule: IRoleModule): Promise<IRoleModule>{
        try {
              //updating student
              const roleModel = await RoleModuleModel.findOneAndUpdate({"_id": new ObjectId(roleModule._id) }, roleModule, { new: true });
              if (!roleModel) {
                throw new CustomError("role not found", StatusCodes.NotFound);
              }
              return new Promise<IRoleModule>(roleModel.toObject());
        } catch (error) {
            throw error;           
        }
    };

    async deleteRolesModule(_id: string){
        try {
            const deletedCount = await RoleModuleModel.deleteOne({"_id": new ObjectId(_id) });
            return { deletedCount: deletedCount };
        } catch (error) {
            throw error;           
        }
    };
}

export const roleModuleModelServies = new RoleModuleModelServies();


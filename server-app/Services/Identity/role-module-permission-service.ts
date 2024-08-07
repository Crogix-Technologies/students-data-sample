import { RoleModulePermissionModel } from "../../Database/Models/IdentityModels/role-module-permissions-model";
import { IRoleModulePermission } from '../../Database/Interfaces/Identity/IRoleModulePermission';
import { ObjectId } from "mongodb";
import { CustomError } from "../../src/Utils/error";
import { StatusCodes } from "../../@Types/status-codes";

class RoleModulePermissionModelServices {
    async getRolesmodulePermission() : Promise<IRoleModulePermission[]> {
        try {
            let rolesmodulePermission = await RoleModulePermissionModel.find<IRoleModulePermission>({});
            return rolesmodulePermission;
        } catch (error) {
            throw error;
        }
    };

    async createRolesmodulePermission(role: IRoleModulePermission): Promise<IRoleModulePermission>{
        try {
            const rolesmodulePermissionModel = RoleModulePermissionModel.build(role);
            await rolesmodulePermissionModel.save();
            return new Promise<IRoleModulePermission>(rolesmodulePermissionModel.toObject());
        } catch (error) {
            throw error;
        }
    }

    async updateRolesmodulePermission(rolesmodulePermission: IRoleModulePermission): Promise<IRoleModulePermission>{
        try {
              //updating student
              const rolesmodulePermissionModel = await RoleModulePermissionModel.findOneAndUpdate({"_id": new ObjectId(rolesmodulePermission._id) }, rolesmodulePermission, { new: true });
              if (!rolesmodulePermissionModel) {
                throw new CustomError("role not found", StatusCodes.NotFound);
              }
              return new Promise<IRoleModulePermission>(rolesmodulePermissionModel.toObject());
        } catch (error) {
            throw error;           
        }
    };

    async deleteRolesmodulePermission(_id: string){
        try {
            const deletedCount = await RoleModulePermissionModel.deleteOne({"_id": new ObjectId(_id) });
            return { deletedCount: deletedCount };
        } catch (error) {
            throw error;           
        }
    };
}

export const roleModulePermissionModelServices = new RoleModulePermissionModelServices();


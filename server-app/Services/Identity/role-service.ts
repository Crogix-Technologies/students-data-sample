import { RoleModel } from "../../Database/Models/IdentityModels/role-model";
import { IRole } from '../../Database/Interfaces/Identity/IRole';
import { ObjectId } from "mongodb";
import { CustomError } from "../../src/Utils/error";
import { StatusCodes } from "../../@Types/status-codes";

class RoleService {
    async getRoles() : Promise<IRole[]> {
        try {
            let roles = await RoleModel.find<IRole>({});
            return roles;
        } catch (error) {
            throw error;
        }
    };

    async createRoles(role: IRole): Promise<IRole>{
        try {
            const roleModel = RoleModel.build(role);
            await roleModel.save();
            return new Promise<IRole>(roleModel.toObject());
        } catch (error) {
            throw error;
        }
    }

    async updateRoles(role: IRole): Promise<IRole>{
        try {
              //updating student
              const roleModel = await RoleModel.findOneAndUpdate({"_id": new ObjectId(role._id) }, role, { new: true });
              if (!roleModel) {
                throw new CustomError("role not found", StatusCodes.NotFound);
              }
              return new Promise<IRole>(roleModel.toObject());
        } catch (error) {
            throw error;           
        }
    };

    async deleteRoles(_id: string){
        try {
            const deletedCount = await RoleModel.deleteOne({"_id": new ObjectId(_id) });
            return { deletedCount: deletedCount };
        } catch (error) {
            throw error;           
        }
    };
}

export const roleService = new RoleService();


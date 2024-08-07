import { UserModel } from "../../Database/Models/IdentityModels/user-model";
import { IUser } from '../../Database/Interfaces/Identity/IUser';
import { ObjectId } from "mongodb";
import { CustomError } from "../../src/Utils/error";
import { StatusCodes } from "../../@Types/status-codes";

class UserService {
    async getUsers() : Promise<IUser[]> {
        try {
            let users = await UserModel.find<IUser>({});
            return users;
        } catch (error) {
            throw error;
        }
    };

    async createUser(user: IUser): Promise<IUser>{
        try {
            const userModel = UserModel.build(user);
            await userModel.save();
            return new Promise<IUser>(userModel.toObject());
        } catch (error) {
            throw error;
        }
    }

    async updateUser(user: IUser): Promise<IUser>{
        try {
              //updating student
              const userModel = await UserModel.findOneAndUpdate({"_id": new ObjectId(user._id) }, user, { new: true });
              if (!userModel) {
                throw new CustomError("user not found", StatusCodes.NotFound);
              }
              return new Promise<IUser>(userModel.toObject());
        } catch (error) {
            throw error;           
        }
    };

    async deleteUser(_id: string){
        try {
            const deletedCount = await UserModel.deleteOne({"_id": new ObjectId(_id) });
            return { deletedCount: deletedCount };
        } catch (error) {
            throw error;           
        }
    };
}

export const userService = new UserService();


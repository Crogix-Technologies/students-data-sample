
import mongoose from "mongoose";
import { IUser } from "../../Interfaces/Identity/IUser";

interface IUserDoc extends mongoose.Document<IUser>{}

interface IUserModel extends mongoose.Model<IUserDoc>{
    build(attr: IUser): IUserDoc;
}

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: false
    },
    tokenExpireInMinuts: {
        type: Number,
        require: false
    },
    refreshToken: {
        type: String,
        require: false
    },
    refreshTokenExpireInMinuts: {
        type: Number,
        require: false
    },
});

userSchema.statics.build = (attr: IUser) => {
    return new UserModel(attr);  
}

const UserModel = mongoose.model<IUser, IUserModel>('Users', userSchema);


export { UserModel};
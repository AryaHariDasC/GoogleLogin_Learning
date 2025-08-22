import mongoose from "mongoose";
import { IUser } from "../interface/userInterface";


const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, unique: true ,default:""},
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    able: { type: Boolean, default: true },
    isGoogleUser: { type: Boolean },
   
});

export const userModel = mongoose.model<IUser>('user', userSchema)
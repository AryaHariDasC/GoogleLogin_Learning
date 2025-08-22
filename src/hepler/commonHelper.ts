import bcrypt from 'bcrypt';
import { userModel } from "../models/userModel";
import { IUser } from "../interface/userInterface";


export const fetchUserDetailsByEmail = async (email: String): Promise<IUser | null> => {
    return await userModel.findOne({ email });
}
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 11);
};
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
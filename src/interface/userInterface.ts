import { Types } from "mongoose";

export interface IUser{
_id?: string;
name:string,
email:string,
phoneNo?:string,
password:string,
googleId?: string;
role:"admin"|"user",
able:boolean,
isGoogleUser:Boolean,
}
export interface ControllerResponse {
  statusCode: number;
  message?: string;
  data?: any;
}
export interface JwtPayload {
    id:Types.ObjectId
    email: string;
    role:"admin"|"user"
}
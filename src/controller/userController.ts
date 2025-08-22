import { Request, } from 'express';
import { createUser, loginUser, loginWithGoogleService } from '../service/userService';
import { ControllerResponse, IUser } from '../interface/userInterface';
import { statusCode } from '../hepler/statusCode';


export const createUserController = async (req: Request<{}, {}, IUser>): Promise<ControllerResponse> => {
    try {

        const result = await createUser(req.body);
        return { statusCode: statusCode.OK, message: " User created successfully", data: result };
    }
    catch (error: any) {

        return { statusCode: statusCode.INTERNAL_ERROR, message: "Error found", data: error.array() };
    }
};

export const loginUserController = async (req: Request<{}, {}, IUser>): Promise<ControllerResponse> => {
    try {
        const result = await loginUser(req.body);
        return { statusCode: statusCode.OK, message: "Login Successfully", data: result }

    }
    catch (error: any) {
        return { statusCode: statusCode.INTERNAL_ERROR, message: "Error found" }
    }
}

// export const googleLoginController = async (req: Request): Promise<ControllerResponse> => {
//     try {
        
//         const result = await loginWithGoogleService(req.user);
//         return { statusCode: statusCode.OK, message: "Google Login Successfully", data: result };
//     } catch (error: any) {
//         return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
//     }
// };

export const googleLoginController = async (req: Request): Promise<ControllerResponse> => {
  try {
    
    console.log("Google Profile:", req.user);
    const result = await loginWithGoogleService(req.user as any);
    return {
      statusCode: statusCode.OK,
      message: "Google Login Successfully",
      data: result,
    };
  } catch (error: any) {
    return { statusCode: statusCode.INTERNAL_ERROR, message: error.message };
  }
};

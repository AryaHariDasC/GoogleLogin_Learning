import { Request,Response,NextFunction } from "express";
const { validationResult } =require("express-validator");
import { statusCode } from "../hepler/statusCode";
import { userSchemaChecks,userLoginSchemaChecks } from "./userValidator";

const errorFormatter = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: "Validation errors",
            data: errors.array(),
        });
        return;
    }
    next();
};

export const createUv=userSchemaChecks(errorFormatter);
export const loginUv=userLoginSchemaChecks(errorFormatter);
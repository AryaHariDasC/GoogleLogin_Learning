const { checkSchema } = require('express-validator')

export const userSchemaCheck = () =>
    checkSchema({
        name: {
            notEmpty: {
                errorMessage: "Name is required",
            },
        },
        email: {
            isEmail: {
                errorMessage: "Valid email is required",
            },
        },
        password: {
            isLength: {
                options: { min: 6 },
                errorMessage: "Password must be at least 6 characters long",
            },
        },
        phoneNo: {
            isMobilePhone: {
                errorMessage: "Valid phone number required",
            },
        },
        role: {
            notEmpty: {
                errorMessage: "Role is required",
            },
            isIn: {
                options: [["admin", "user"]],
                errorMessage: "Role must be either 'admin' or 'user'",
            },
        },

    });
     const userLoginSchema=()=>checkSchema({
    email:{
        isEmail:{
            errorMessage:"Invalid Email"
        }
    },
    password:{
        isLength:{
            options: { min: 6 },
            errorMessage: 'Password must be at least 6 characters long',
        }
        }
    })

export const userSchemaChecks=(errorFormatter:any)=>({
useRSchemaChecks:[userSchemaCheck(),errorFormatter]
 })

 export const userLoginSchemaChecks=(errorFormatter:any)=>({
    userLoginSchemas:[userLoginSchema(),errorFormatter]
 })   
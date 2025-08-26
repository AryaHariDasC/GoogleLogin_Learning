import express from 'express';
import { response } from '../hepler/callBack';
import { createUv, loginUv } from '../validator';
import { createUserController, loginUserController,googleLoginController } from '../controller/userController';
import {createBookController,getAllBooksController,buyBookController,paymentCallbackController} from "../controller/paymentControllet"
import { authMiddleware } from '../middlewaer/authMiddleware';
import passport from 'passport';


const router = express.Router();

router.post('/create',createUv.useRSchemaChecks,response(createUserController));

router.post('/login',loginUv.userLoginSchemas,response(loginUserController))

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/login" }),response(googleLoginController));

router.post("/createBook",authMiddleware, response(createBookController));

router.get("/getBooks",authMiddleware, response(getAllBooksController));

router.post("/buy-books", response(buyBookController));

router.get("/callback", response(paymentCallbackController));

export default router;              
import express from 'express';
import { response } from '../hepler/callBack';
import { createUv, loginUv } from '../validator';
import { createUserController, loginUserController,googleLoginController } from '../controller/userController';
import { authMiddleware } from '../middlewaer/authMiddleware';
import passport from 'passport';


const router = express.Router();

router.post('/create',createUv.useRSchemaChecks,response(createUserController));

router.post('/login',loginUv.userLoginSchemas,response(loginUserController))

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  response(googleLoginController)
);

export default router;              
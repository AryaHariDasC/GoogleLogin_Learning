import express from "express";
import connectDB from "./config/db";
import userRouter from "./router/userRouter";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./config/passport";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET as string ,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use("/", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

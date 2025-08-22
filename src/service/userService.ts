import { userModel } from "../models/userModel";
import { IUser } from "../interface/userInterface";
import { fetchUserDetailsByEmail, hashPassword,comparePassword } from "../hepler/commonHelper";
import jwt from 'jsonwebtoken'


export const createUser = async (userData: IUser) => {
    try{
    const { name, email, phoneNo, password, role, able } = userData
    const emailExists = await fetchUserDetailsByEmail(email)
    if (emailExists) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await hashPassword(password)
    const newUser = new userModel({
        name, email, password: hashedPassword, phoneNo, role, able
    })
    await newUser.save()
    return {newUser}}
    catch(error:any){
        throw error
    }
}



export const loginUser = async (userData: IUser) => {
  const { email, password } = userData;

  const user = await fetchUserDetailsByEmail(email);
  if (!user) throw new Error("User not found");


  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  
 if (typeof user.isGoogleUser === "undefined") {
  await userModel.findByIdAndUpdate(user._id, { isGoogleUser: false });
}

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return {
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      phoneNo: user.phoneNo,
      role: user.role,
      isGoogleUser: user.isGoogleUser,
    },
  };
};

// export const loginWithGoogleService = async (googleUser: any) => {
//   let user = await userModel.findOne({ email: googleUser.email });

//   if (!user) {
    
//     user = new userModel({
//       name: googleUser.name,
//       email: googleUser.email,
//       googleId: googleUser.id,
//       isGoogleUser: true,
//       role: "user",
//     });
//     await user.save();
//   }

  
//   if (typeof user.isGoogleUser === "undefined") {
//     user.isGoogleUser = true;
//     await user.save();
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "1h" }
//   );
//   return {
//     message: "Google login successful",
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//       name: user.name,
//       phoneNo: user.phoneNo,
//       role: user.role,
//       isGoogleUser: user.isGoogleUser,
//     },
//   };
// };

export const loginWithGoogleService = async (googleUser: any) => {
  let user = await userModel.findOne({ email: googleUser.email });

  if (!user) {
    user = new userModel({
      name: googleUser.name,
      email: googleUser.email,
      googleId: googleUser.id,
      isGoogleUser: true,
      role: "user",
    });
    await user.save();
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return {
    message: "Google login successful",
    token,
    googleProfile: googleUser,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isGoogleUser: user.isGoogleUser,
    },
  };
};

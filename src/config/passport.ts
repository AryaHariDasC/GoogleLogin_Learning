import passport from "passport";
import { Strategy as GoogleStrategy,Profile } from "passport-google-oauth20";
import { userModel } from "../models/userModel";
import { googleConfig } from "./google";


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: googleConfig.clientId,
//       clientSecret: googleConfig.clientSecret,
//       callbackURL: googleConfig.callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;
//         const name = profile.displayName || "Google User";
//         const googleId = profile.id;
      
//         if (!email) return done(null, false, { message: "No email found in Google profile" });


//         let user = await userModel.findOne({ email });


//         if (!user) {

//           user = await userModel.create({
//             name,
//             email,
//             password: "",
//             googleId,
//             role: "user",
//             able: true,
//             isGoogleUser: true
//           });
//         } else {

//           if (!user.googleId) user.googleId = googleId;
//           await user.save();
//         }


//         return done(null, user);
//       } catch (err) {
//         return done(err as Error, undefined);
//       }
//     }
//   )
// );


// passport.serializeUser((user: any, done) => done(null, user.id));
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await userModel.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err as Error, null);
//   }
// });


// export default passport; 


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
      
        const googleUser = {
          googleid: profile.id,
          name: profile.displayName || "Google User",
          email: profile.emails?.[0]?.value,
          accessToken,
          refreshToken,
        };

        return done(null, googleUser); 
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
 
export default passport;
 
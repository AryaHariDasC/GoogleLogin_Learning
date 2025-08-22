export const googleConfig = {
clientId: process.env.GOOGLE_CLIENT_ID!,
clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
callbackURL: process.env.GOOGLE_CALLBACK || "http://localhost:3000/auth/google/callback",
tokenUrl: "https://oauth2.googleapis.com/token",
userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo" 
};
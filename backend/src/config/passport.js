import User from "../models/user.model.js"
import passport from "passport"; 
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; 

passport.use( 
  new GoogleStrategy( 
    { 
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      callbackURL: "/api/auth/google/callback", 
    }, 
    async (accessToken, refreshToken, profile, done) => { 
      try { 
 
        // Check if user exists 
        let user = await User.findOne({ 
          email: profile.emails[0].value, 
        }); 
 
        if (!user) { 
          // Create new user 
          user = await User.create({ 
            fullName: profile.displayName, 
            email: profile.emails[0].value, 
            avatar: profile.photos[0]?.value || "", 
            isVerified: true, 
            password: Math.random().toString(36).slice(-8), 
          }); 
        } 
 
        done(null, user); 
 
      } catch (error) { 
        done(error, null); 
      } 
    } 
  ) 
); 

export default passport; 
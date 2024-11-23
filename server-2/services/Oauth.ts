import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { getEnvVariable } from "../utils/getEnvVariable";
import dotenv from 'dotenv'
import userModel from "../models/userModel";
import { generateToken } from "../utils/generateAndVerifyToken";

dotenv.config()

passport.use(new GoogleStrategy({
    clientID: getEnvVariable('GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: getEnvVariable('GOOGLE_OAUTH_CLIENT_SECRET'),
    callbackURL: getEnvVariable('GOOGLE_OAUTH_CALLBACK_URL'),
    passReqToCallback: true
},
 async (req ,accessToken, refreshToken, profile, done) => {

try {

    const mode = req.query.state
    const email = profile.emails?.[0]?.value
console.log(mode);
    if(!email){
        console.log('no email');
        return done(null, false, { message: 'No email associated with this account' })
    }

    const user = await userModel.findOne({ email })


    if(mode === 'login'){
        if(!user){
            console.log('no user in login ');
            return done(null, false, { message: 'Account not found. Please sign up first'})
        }

        user.password = ''

        return done(null, user)
    }
    else if( mode === 'signin' ){
        if(user){
            console.log('user exist sigin');
            return done(null, false, { message: 'User Already Exist. Please sign in' })
        }

        const token = generateToken({ email }, '5m')

        const newUser = await userModel.create({
            userName: profile.displayName,
            email,
            password: token
        })
        console.log('new user');
        return done(null, newUser, { token })
    }
console.log('mode error');
    return done(null, false, { message: 'Invalid mode specified' })
          
} catch (error) {
    console.log(error);
    return done(error)
}
 }
))

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

export default passport

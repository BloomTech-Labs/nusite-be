import passport from "passport";
// import { User } from "../models/Model";
// import { hash } from "bcryptjs";
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any
    ) => {
      // asynchronous function
      // should search db for existing user and login if exists
      // else create a user in the db and return the created user
      console.log(profile.id);
      console.log(profile.displayName);
      console.log(profile.name.givenName);
      console.log(profile.name.familyName);
      return done(null, profile);
    }
  )
);

import { User } from "../models/Model";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "API key 1",
      clientSecret: "AIzaSyDxHJy8GFT5q9shMJaRzmqfjNXbQmkCThE",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

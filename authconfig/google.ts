import passport from "passport";
const { User } = require("../models/Model");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/redirect/",
    },
    (
      _accessToken: any,
      _refreshToken: any,
      profile: { id: any; username: any },
      done: any
    ) => {
      // save the user here
      // console.log(accessToken);
      // console.log("passport callback function fired:");
      console.log("PROFILE", profile);
      User.findUserById(profile.id).then((id: any) => {
        if (id) {
          return done(null, profile);
        } else {
          User.createUser(profile.id, profile.username).then(function(id: any) {
            return done(null, profile);
          });
        }
      });
    }
  )
);

module.exports = passport;

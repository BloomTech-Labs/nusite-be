const User = require("../models/Model");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: { id: any; displayName: any },
      done: (arg0: any, arg1: any) => any
    ) => {
      User.findOrCreate({ googleId: profile.id }, function(
        err: any,
        user: { save: (arg0: (err: any) => any) => void }
      ) {
        if (err) {
          return done(err, user);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            provider: "google",
          });

          user.save(function(err) {
            if (err) console.log(err);
            return done(err, done);
          });
        } else {
          return done(err, user);
        }
      });
    }
  )
);

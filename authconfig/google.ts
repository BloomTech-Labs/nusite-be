import passport from "passport";
const User = require("../models/Model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (
      _accessToken: any,
      _refreshToken: any,
      profile: { googleid: any; displayName: any },
      done: any
    ) => {
      User.findOrCreate({ googleId: profile.googleid }, function(
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

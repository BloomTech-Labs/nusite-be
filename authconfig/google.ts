import passport from "passport";
import { hashSync } from "bcryptjs";
const { User } = require("../models/Model");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (
      _accessToken: any,
      _refreshToken: any,
      profile: { id: any; displayName: any; name: any; emails: any },
      done: any
    ) => {
      User.findUserById(profile.id).then((res: any) => {
        if (res) {
          return done(null, res);
        } else {
          const pw = hashSync(profile.displayName, 12);

          const user = {
            auth_id: profile.id,
            username: profile.displayName,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            password: pw,
          };

          User.createUser(user).then(function(id: any) {
            return done(null, user);
          });
        }
      });
    }
  )
);

module.exports = passport;

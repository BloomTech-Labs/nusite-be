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
      _accessToken: string,
      _refreshToken: string,
      profile: googleProfile,
      done: any
    ) => {
      User.findUserById(profile.id).then((res: any) => {
        if (res) {
          return done(null, res);
        } else {
          const checkUser = User.findBy({
            email: profile.emails[0].value,
          });

          if (checkUser) {
            return done(null, checkUser);
          };
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

interface googleProfile {
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: [{ value: string }];
  id: string;
};

module.exports = passport;
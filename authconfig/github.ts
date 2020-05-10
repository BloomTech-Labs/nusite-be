// TODO
// app will supply verify cb, accepts accesstoken, refreshtoken, server-specific profile, and cb- supplying a user = set to false if creds arent valid.
// options: clientID = github id,
// clientSecret = github secret,
// callbackURL = redirect users URL from Github
// scope = user, public_repo, repo, gist, none
// userAgent = API request MUST include a valid User Agent String
// domain name: see http://developer.github.com/v3/#user-agent-required for more info

import passport from "passport";
import { User } from "../models/Model";
// import hashing?
import { hash } from "bcryptjs";
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    
  }, (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
    process.nextTick(function () {
      console.log("GH PROFILE", profile)
    //   const findUser = User.findBy({
    //     email: profile.emails[0].valuve
    //   });

    //   if (!findUser) {
    //     const pw = hash(profile.displayName, 12);

    //     const newUser = {
    //       username: profile.displayName,
    //       first_name: profile.name.givenName,
    //       last_name: profile.name.familyName,
    //       email: profile.emails[0].value,
    //       password: pw,
    //     };

    //     const [{ password, ...user}]: any = User.add(newUser);

    //     return done(null, user)
    //   } else {
    //     return done(null, findUser);
    //   }
    });
  })
);

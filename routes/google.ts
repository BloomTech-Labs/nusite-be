const gRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

gRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

gRouter.get(
  "/auth/google/redirect/",
  passport.authenticate("google", {
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req: { user: { id: number; displayName: string } }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.displayName,
    };
    const token = generateToken(user);
    console.log("User: ", user);
    res.status(200).json({ token, user });
  }
);

module.exports = gRouter;

const gRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

gRouter.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

gRouter.get(
  "/api/auth/google/redirect/",
  passport.authenticate("google", {
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req: { user: { id: number; username: string } }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.username,
    };
    const token = generateToken(user);

    res
      .status(200)
      .cookie("JWT", token, {
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
      })
      .redirect(`${process.env.REDIRECT_URL}?token=${token}&query=${user.id}`);
  }
);

module.exports = gRouter;

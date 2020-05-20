const linkedinRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

linkedinRouter.get(
  "/api/auth/linkedin",
  passport.authenticate("linkedin", {
    failureRedirect: `${process.env.REDIRECT_URL}/login`,
  })
);

linkedinRouter.get(
  "/api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: `${process.env.REDIRECT_URL}/login`,
    passReqToCallback: true,
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

module.exports = linkedinRouter;

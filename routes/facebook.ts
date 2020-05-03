const googleRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

googleRouter.get("/auth/facebook", passport.authenticate("facebook"));

// Initial passport route calls this route
// controls creation of token for the frontend
// Frontend will need to redirect themselves once they save the token and user
// will need thoroghly checked with the frontend
googleRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
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
    res
      .status(200)
      .cookie("jwt", { token, user }, { httpOnly: true })
      .redirect("/dashboard");
  }
);

module.exports = googleRouter;

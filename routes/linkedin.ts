const linkedinRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

linkedinRouter.get("/api/auth/linkedin", passport.authenticate("linkedin"));

// Initial passport route calls this route
// controls creation of token for the frontend
// Frontend will need to redirect themselves once they save the token and user
// will need thoroghly checked with the frontend
linkedinRouter.get(
  "/api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req: { user: { id: number; username: string } }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.username,
    };

    res
      .status(200)
      .cookie("JWT", generateToken(user), { httpOnly: true })
      .redirect("/home");
  }
);

module.exports = linkedinRouter;

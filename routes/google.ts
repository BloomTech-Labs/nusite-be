const gRouter = require("express").Router();
const gPassport = require("passport");
const { gLog } = require("jsonwebtoken");

gRouter.get(
  "/auth/google",
  gPassport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ]
  })
);

gRouter.get(
  "/auth/google/redirect",
  gPassport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req: {user: { googleid: string }}, res: any) => {
    let user = {
      googleid: req.user.googleid,
    };
    const token = gLog(user, process.env.JWT_SECRET, { expiresIn: "1d"});
    res.status(200).json({ token, user }).redirect("/dashboard");
  }
);

module.exports = gRouter;
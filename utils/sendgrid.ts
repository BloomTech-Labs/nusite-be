import sgMail from "@sendgrid/mail";

export const sendgridEmail = async (email: string) => {
  // Get the Sendgrid api key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  let link = process.env.SENDGRID_LINK || "http://localhost:3000/reset";

  // Set up the message
  const msg = {
    to: email,
    from: "customer_support@partnerd.dev",
    subject: "Password Reset Request",
    text: "If you did not request this reset please delete this message.",
    html: `
    <div>
      <h3>If you did not request to reset your password, ignore this email,</h3>
      <h4>Otherwise, click the link below and we can reset your password.</h4>
      <a href=${link} target="__blank" rel="no-opener noreferrer">Reset Password Now!</a>
      <p>This was an auto-generated email, please do not respond, thank you.</p>
    </div>
    `,
  };

  // send the message
  sgMail.send(msg);

  return "Please check your email";
};

export const sendgridVerify = async (email: string) => {
  // Get the Sendgrid api key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  let link = process.env.SENDGRID_VERIFY_LINK || "http://localhost:3000/verify";

  // Set up the message
  const msg = {
    to: email,
    from: "customer_support@partnerd.dev",
    subject: "Email Verification",
    text: "If you did not request this reset please delete this message.",
    html: `
    <div>
      <h3>If you did utilize Partnerd.dev, ignore this email,</h3>
      <h4>Otherwise, click the link below and we can verify your email.</h4>
      <a href=${link} target="__blank" rel="no-opener noreferrer">Verify Email!</a>
      <p>This was an auto-generated email, please do not respond, thank you.</p>
    </div>
    `,
  };

  // send the message
  sgMail.send(msg);

  return "Please check your email";
};

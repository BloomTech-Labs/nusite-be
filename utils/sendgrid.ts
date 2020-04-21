import sgMail from '@sendgrid/mail';

export const sendgridEmail = async (email: string) => {
  // Get the Sendgrid api key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  // Set up the message
  const msg = {
    to: email,
    from: 'customer_support@partnerd.dev',
    subject: 'Password Reset Request',
    text: 'If you did not request this reset please delete this message.',
    html: '<a href="#">Reset Password Now!</a>',
  };

  // send the message
  await sgMail.send(msg);

  return;
}
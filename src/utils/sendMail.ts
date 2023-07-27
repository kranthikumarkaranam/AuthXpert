// Import necessary dependencies.
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

// Define the function to send an email.
export default async function sendMail(
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string
) {
  // Extract the required environment variables.
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  // Create a nodemailer transporter to send emails.
  let transporter = await nodemailer.createTransport({
    // Use the 'gmail' service for simplicity. Alternatively, you can use SMTP settings.
    /* 
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,     // Use the provided mailing email (sender's email).
      pass: MAILING_PASSWORD,  // Use the provided mailing password for authentication.
    },
    */
    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  // Generate the email content using the Handlebars template.
  const data = handlebars.compile(template);
  const replacements = {
    name: name,           // Replace {{name}} in the template with the provided 'name'.
    email_link: url,      // Replace {{email_link}} in the template with the provided 'url'.
    image: image,         // Replace {{image}} in the template with the provided 'image'.
  };
  const html = data(replacements);

  // Verify the email connection settings.
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);   // Log any verification error.
        reject(error);        // Reject the promise if there's an error.
      } else {
        console.log("Server is listening..."); // Log success message if verification succeeds.
        resolve(success);                      // Resolve the promise if verification succeeds.
      }
    });
  });

  // Configure the email options.
  const options = {
    from: SMTP_EMAIL,    // Set the sender's email address.
    to,                     // Set the recipient's email address (provided as an argument).
    subject,                // Set the email subject (provided as an argument).
    html,                   // Set the email content (generated HTML from Handlebars template).
  };

  // Send the email.
  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);   // Log any sending error.
        reject(err);          // Reject the promise if there's an error.
      } else {
        console.log(info);    // Log info about the sent email.
        resolve(info);        // Resolve the promise if the email is sent successfully.
      }
    });
  });
}

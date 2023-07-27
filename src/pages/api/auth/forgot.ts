// Import necessary modules, models, and functions.
import { resetPasswordEmail } from "@/emailTemplates/reset";
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import sendMail from "@/utils/sendMail";
import { createResetToken } from "@/utils/tokens";
import type { NextApiRequest, NextApiResponse } from "next";

// API route handler function.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb(); // Connect to the database.
    const { email } = req.body; // Get the user's email from the request body.

    // Find the user in the database using the provided email.
    const user = await User.findOne({ email });

    // If the user does not exist, return a 400 status with a message indicating the email does not exist.
    if (!user) {
      return res.status(400).json({ message: "Sorry this email doesn't exist :(" });
    }

    // Create a reset token for the user using the user's ID.
    const user_id = createResetToken({
      id: user._id.toString(),
    });

    // Create the URL for the password reset page using the reset token.
    const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`;

    // Send the reset password email to the user.
    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Reset your password - AuthXpert",
      resetPasswordEmail
    );

    // Send a JSON response indicating that an email has been sent for password reset.
    res.json({
      message: "Password reset email sent😃 If you can't find it in your Inbox 📧 please check your spam folder and move it to the Inbox. Thank you!",
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).json({ message: (error as Error).message });
  }
}

// Import necessary modules, models, and functions.
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/utils/tokens";
import sendMail from "@/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";

// API route handler function.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb(); // Connect to the database.
    const { first_name, last_name, email, phone, password } = req.body; // Get user registration data from the request body.

    // Validate that all required fields are provided.
    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    // Validate that the email address provided is valid.
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please add a valid email address" });
    }

    // Validate that the phone number provided is valid.
    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ message: "Please add a valid phone number" });
    }

    // Check if the user with the given email already exists in the database.
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "Warning! This email address already exists" });
    }

    // Check if the password provided meets the minimum length requirement.
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    // Hash the password using bcrypt with a salt factor of 12 to create a secure hash.
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Create a new user object with the provided data and save it to the database.
    const newuser = new User({
      name: `${first_name + " " + last_name}`,
      email,
      phone,
      password: cryptedPassword,
    });
    await newuser.save();

    // Generate an activation token using the new user's ID.
    const activation_token = createActivationToken({
      id: newuser._id.toString(),
    });

    // Create the activation URL using the generated activation token.
    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    // Send an activation email to the new user with the activation URL.
    await sendMail(
      newuser.email,
      newuser.name,
      "",
      url,
      "Activate your account - AuthXpert",
      activateTemplateEmail
    );

    // Return a JSON response indicating successful registration and prompting the user to activate their account.
    res.json({
      message: "Registration Success! Please check your email to activate your account and get started 😃 If you don't see it in your inbox 📧 kindly check your spam folder and move it to the Inbox. Thank you! ",
    });
  } catch (error) {
    // Handle any errors that occur during the registration process and send an error response.
    res.status(500).json({ message: (error as Error).message });
  }
}

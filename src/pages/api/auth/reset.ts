// Import necessary modules, models, and functions.
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const { RESET_TOKEN_SECRET } = process.env;
import bcrypt from "bcryptjs";
interface UserToken {
  id: string;
}

// API route handler function.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb(); // Connect to the database.
    const { token, password } = req.body; // Get the reset token and new password from the request body.

    // Verify the reset token using the RESET_TOKEN_SECRET environment variable.
    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;

    // Find the user in the database using the ID extracted from the reset token.
    const userDb = await User.findById(userToken.id);

    // If the user does not exist, return a 400 status with a message indicating the account no longer exists.
    if (!userDb) {
      return res.status(400).json({ message: "Sorry this account no longer exists." });
    }

    // Hash the new password using bcrypt with a salt factor of 12.
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Update the user's password in the database with the new hashed password.
    await User.findByIdAndUpdate(userDb.id, { password: cryptedPassword });

    // Send a JSON response indicating that the account password has been successfully updated.
    res.json({
      message: "Your account password has been successfully updated :)",
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).json({ message: (error as Error).message });
  }
}

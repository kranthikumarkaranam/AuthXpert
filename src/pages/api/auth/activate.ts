// Import necessary modules and models.
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const { ACTIVATION_TOKEN_SECRET } = process.env;

// Define the interface for the user token.
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
    const { token } = req.body; // Get the token from the request body.
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken; // Verify and decode the token.
    const userDb = await User.findById(userToken.id); // Find the user in the database using the decoded user ID.

    // Check if the user exists in the database.
    if (!userDb) {
      return res.status(400).json({ message: "This account no longer exists." });
    }

    // Check if the user's email is already verified.
    if (userDb.emailVerified == true) {
      return res
        .status(400)
        .json({ message: "Email address is already verified." });
    }

    // Update the user's emailVerified field to true.
    await User.findByIdAndUpdate(userDb.id, { emailVerified: true });

    // Send the response indicating successful verification.
    res.json({
      message: "Your account has been successfully verified.",
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).json({ message: (error as Error).message });
  }
}

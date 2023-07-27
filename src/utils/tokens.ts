// Import the 'jsonwebtoken' library for handling JWT (JSON Web Token) operations.
import jwt from "jsonwebtoken";

// Extract the required environment variables 'ACTIVATION_TOKEN_SECRET' and 'RESET_TOKEN_SECRET'.
const { ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env;

// Function to create an activation token.
export const createActivationToken = (payload: any) => {
  // Generate a JWT token by signing the provided 'payload' using the 'ACTIVATION_TOKEN_SECRET'.
  // Set the token to expire after 2 days ('expiresIn: "2d"').
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET!, {
    expiresIn: "1h",
  });
};

// Function to create a reset token.
export const createResetToken = (payload: any) => {
  // Generate a JWT token by signing the provided 'payload' using the 'RESET_TOKEN_SECRET'.
  // Set the token to expire after 6 hours ('expiresIn: "6h"').
  return jwt.sign(payload, RESET_TOKEN_SECRET!, {
    expiresIn: "1h",
  });
};

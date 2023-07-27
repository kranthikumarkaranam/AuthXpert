// Import the Mongoose library for MongoDB schema modeling.
import mongoose from "mongoose";

// Define the userSchema, which specifies the fields and their configurations for the user model.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// Define the User model using the userSchema.
// Check if the User model already exists, if not, create it using mongoose.model().
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export the User model.
export default User;

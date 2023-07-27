// Importing the Mongoose library for MongoDB interaction.
import mongoose from "mongoose";

// Check if the environment variable "process.env.MONGODB_URL" is defined.
if (!process.env.MONGODB_URL) {
  throw new Error("Please add the database URL in the .env file");
}

// This variable holds the URL to connect to the MongoDB database.
const MONGODB_URL: string = process.env.MONGODB_URL;

// The module sets up caching to avoid multiple connections to MongoDB during the application's lifetime.
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

// Check if there is already a cached connection available.
let cached = globalWithMongoose.mongoose;

// If there is no cached connection, create a new one.
if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

// Function to connect to the MongoDB database.
async function connectDb() {
  // If there is a cached connection, return it instead of creating a new one.
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no cached connection, create a new one and store it in the "cached.promise" variable.
  if (!cached.promise) {
    const options = {
      // Option to disable buffering for all commands to improve performance.
      bufferCommands: false,
      // The following options are part of the new URL parser and the new server discovery and monitoring engine, respectively.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Use Mongoose to connect to the MongoDB database using the provided URL and options.
    cached.promise = mongoose
      .connect(MONGODB_URL, options)
      .then((mongoose) => {
        console.log("Connection has been established."); // Log a success message upon successful connection.
        cached.conn = mongoose; // Store the Mongoose object in the cached.conn variable.
        return mongoose; // Return the Mongoose object after successful connection.
      })
      .catch((error) => {
        console.log(error as Error); // Log any errors that occur during the connection attempt.
      });


    // try {
    //   // Use Mongoose to connect to the MongoDB database using the provided URL and options.
    //   const mongooseConnection = await mongoose.connect(MONGODB_URL, options);
    //   console.log("Connection has been established."); // Log a success message upon successful connection.
    //   cached.conn = mongooseConnection; // Store the Mongoose object in the cached.conn variable.
    // } catch (error) {
    //   console.log(error as Error); // Log any errors that occur during the connection attempt.
    // }

  }

  // Wait for the connection promise to resolve, and store the resulting Mongoose object in "cached.conn".
  await cached.promise;

  // Return the cached Mongoose object (connected to the database).
  return cached.conn;
}

// Export the "connectDb" function to make it accessible from other parts of the application.
export default connectDb;

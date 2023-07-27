// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// Importing the required dependencies
import { MongoClient } from "mongodb";

// Check if the "MONGODB_URL" environment variable is missing or invalid.
if (!process.env.MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

// Extract the MongoDB URI from the environment variable.
const uri: string = process.env.MONGODB_URL;

// Declare variables to hold the MongoClient instance and its promise.
let client: MongoClient;
let clientPromise: Promise<MongoClient>;



// Conditional block for handling different environments (development and production).
if (process.env.NODE_ENV === "development") {
  /* In development mode, use a global variable to preserve the clientPromise
  value across module reloads caused by HMR (Hot Module Replacement). */


  /* Create a custom global variable with the name "_mongoClientPromise".
  This allows the value to persist across HMR module reloads. */
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  // Check if the global variable has not been initialized yet.
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    // Create a new MongoClient instance using the MongoDB URI.
    client = new MongoClient(uri);

     // Establish the connection to the MongoDB server and store the promise in the global variable.
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  // Set the clientPromise to the global variable to be used across the application.
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  // In production mode, directly create a new MongoClient instance using the MongoDB URI.
  client = new MongoClient(uri);

  // Establish the connection to the MongoDB server and store the promise.
  clientPromise = client.connect();
}

/* Export the module-scoped MongoClient promise.
By exporting the promise, the client can be shared across functions in the application. */
export default clientPromise;

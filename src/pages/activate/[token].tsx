// Import required modules and libraries.
import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

// Define the Activate component with a token prop.
export default function Activate({ token }: { token: string }) {
  const [error, setError] = useState(""); // State variable to hold error messages.
  const [success, setSuccess] = useState(""); // State variable to hold success messages.

  // useEffect hook to activate the account when the component mounts or the token changes.
  useEffect(() => {
    activateAccount();
  }, [token]);

  // Function to activate the user account using the provided token.
  const activateAccount = async () => {
    try {
      const { data } = await axios.put("/api/auth/activate", { token }); // Make a PUT request to the backend to activate the account.
      setSuccess(data.message); // Set the success message on successful activation.
    } catch (error: any) {
      setError((error?.response?.data as Error).message); // Set the error message if there's an error during activation.
    }
  };

  // Render the component with conditional rendering based on success or error state.
  return (
    <div className="bg-gradient h-screen flex items-center justify-center text-center">
      {error && (
        <div>
          <p className="text-red-500 text-3xl font-semibold">{error}</p>
          <button
            className="mt-10 bg-red-500 text-white hover:bg-red-600 text-xl uppercase font-semibold px-6 py-3 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in instead
          </button>
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-3xl font-semibold">{success}</p>
          <button
            className="mt-10 bg-green-500 text-white hover:bg-green-600 text-xl uppercase font-semibold px-6 py-3 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

// Server-side function to get the token from the query parameters and pass it as props to the Activate component.
export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  return {
    props: { token },
  };
}

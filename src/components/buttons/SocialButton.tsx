// Importing necessary dependencies and components.
import { signIn } from "next-auth/react";
import * as React from "react";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaSpotify,
  FaTwitter,
} from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";

// Interface for the SocialButton component props.
interface ISocialButtonProps {
  id: string; // The 'id' prop represents the ID of the social platform (e.g., "google", "facebook").
  text: string; // The 'text' prop contains the label text for the social button (e.g., "Sign in with Google").
  csrfToken: string; // The 'csrfToken' prop contains the Cross-Site Request Forgery (CSRF) token for form submission security.
}

// Color mapping for different social platforms.
const colors: any = {
  google: "#DB4437",
  facebook: "#4285F4",
  auth0: "#eb5424",
  github: "#333",
  discord: "#7289da",
  spotify: "#1DB954",
  twitter: "#1DA1F2",
};

// Creating the SocialButton functional component.
const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) => {
  // Destructuring the 'id', 'text', and 'csrfToken' props from the component props.
  const { id, text, csrfToken } = props;

  // Function to create the appropriate JSX element for the social platform icon.
  const createIconJsx = () => {
    switch (id) {
      case "google":
        return <FaGoogle />;
      case "facebook":
        return <FaFacebook />;
      case "auth0":
        return <SiAuth0 />;
      case "github":
        return <FaGithub />;
      case "discord":
        return <FaDiscord />;
      case "spotify":
        return <FaSpotify />;
      case "twitter":
        return <FaTwitter />;
      default:
        return; // Return nothing if the social platform ID is not recognized.
    }
  };

  // JSX representing the SocialButton component UI.
  return (
    <form method="post" action={`/api/auth/signin/${id}`}>
      {/* Hidden input field for CSRF token */}
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

      {/* Button element for the social login */}
      <button
        className="mb-2 py-3 px-4 flex justify-center items-center gap-3 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)} // Trigger the signIn function with the social platform ID when the button is clicked.
        style={{ background: `${colors[id]}` }} // Set the button background color based on the social platform ID.
      >
        {/* Render the social platform icon */}
        {createIconJsx()}
        
        {/* Render the label text for the social button */}
        {text}
      </button>
    </form>
  );
};

// Exporting the SocialButton component to make it accessible to other parts of the application.
export default SocialButton;

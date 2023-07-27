import * as React from "react";

// Defining the interface for the component props.
interface IBackgroundProps {
  image: string; // The 'image' prop is expected to be a string containing the URL of the background image.
}


// Creating a functional component called Background using React.FunctionComponent.
const Background: React.FunctionComponent<IBackgroundProps> = (props) => {
   // Destructuring the 'image' prop from the component's props for easier access.
  const { image } = props;

  // Returning JSX (React elements) representing the background div with the specified styles and background image.
  return (
    <div
      className="hidden min-h-screen lg:flex lg:w-1/2 xl:w-2/3 2xwl:w-3/4 bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default Background;

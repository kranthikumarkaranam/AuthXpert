// Importing the BeatLoader component from the "react-spinners" library, which will be used for showing a loading animation.
import { BeatLoader } from "react-spinners";

// Defining the interface for the component props.
interface ISlideButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  disabled: boolean;
  icon: JSX.Element;
}


// Creating a functional component called SlideButton using React.FunctionComponent.
const SlideButton: React.FunctionComponent<ISlideButtonProps> = (props) => {
  // Destructuring the props for easier access.
  const { type, text, slide_text, disabled, icon } = props;

  // Returning JSX (React elements) representing the button with dynamic content based on the 'disabled' prop.
  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex items-center justify-center px-8 py-3 mt-4 overflow-hidden font-medium bg-blue-500 transition duration-300 ease-out border-2 rounded-md group"
    >
      {disabled ? ( // If the button is disabled, show the BeatLoader component as a loading animation.
        <BeatLoader color="#fff" size={15} />
      ) : ( // If the button is not disabled, show the regular button content with sliding and transitioning text.
        <>
          {/* Absolute positioned span with sliding text, displayed when the button is hovered over (group-hover). */}
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
            {icon}&nbsp;{slide_text}
          </span>
          {/* Absolute positioned span with regular text, displayed when the button is not hovered over. */}
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {text}
          </span>
          {/* A relative positioned span with invisible text to maintain button size, since absolute elements do not affect parent size. */}
          <span className="relative invisible">{text}</span>
        </>
      )}
    </button>
  );
};

export default SlideButton;

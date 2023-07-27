// Importing necessary dependencies from the 'react' and 'react-icons' libraries.
import * as React from "react";
import { IoAlertCircle } from "react-icons/io5";
import { ImEye, ImEyeBlocked } from "react-icons/im";

// Defining the interface for the component props.
interface InputProps {
  name: string; // The 'name' prop represents the name of the input field.
  label: string; // The 'label' prop contains the label text for the input field.
  type: string; // The 'type' prop specifies the type of the input field (e.g., text, password, etc.).
  icon: JSX.Element; // The 'icon' prop contains a JSX element representing an icon for the input field.
  placeholder: string; // The 'placeholder' prop contains the placeholder text for the input field.
  register: any; // The 'register' prop is used for registering the input field with a form library (e.g., React Hook Form).
  error: any; // The 'error' prop represents an error message associated with the input field, if any.
  disabled: boolean; // The 'disabled' prop is a boolean indicating whether the input field is disabled or not.
}

// Creating a functional component called Input using React.FunctionComponent.
const Input: React.FunctionComponent<InputProps> = (props) => {
  // Destructuring the props for easier access.
  const { name, label, type, icon, placeholder, register, error, disabled } = props;

  // State variable to control the visibility of password input fields.
  const [showPassword, setShowPassword] = React.useState(false);

  // Function to calculate the vertical translation of the label based on the input field's name.
  const calculateTranslate = (): string => {
    return "translateY(-12px)";
  };

  // Rendering the input field along with its label, icon, and potential error message.
  return (
    <div className="mt-3 w-[100%]">
      {/* Label for the input field. */}
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        {/* Icon container, positioned to the left of the input field. */}
        <div
          className="pointer-event-none absolute left-0 top-0.5 inset-y-0 flex items-center pl-3"
          style={{
            transform: `${error ? calculateTranslate() : ""}`, // Translate the icon upwards if there's an error.
          }}
        >
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>

        {/* Input field itself. */}
        <input
          type={showPassword ? "text" : type} // Toggle between 'text' and 'password' type for password fields.
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-700 focus:ring-2 text-sm"
          placeholder={placeholder}
          {...register(name)} // Register the input field with the form library.
          style={{
            borderColor: `${error ? "#ED4337" : ""}`, // Set the border color to red if there's an error.
          }}
        />

        {/*---Show and hide password toggle, visible for password fields.---*/}
        {(name === "password" || name === "confirmPassword") && (
          <div
            className="absolute top-2.5 right-2 text-xl text-gray-700 cursor-pointer"
            style={{ right: `${error ? "2rem" : ""}` }} // Move the toggle rightward if there's an error.
            onClick={() => setShowPassword((prev) => !prev)} // Toggle the showPassword state on click.
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />} {/* Render the appropriate eye icon based on the state. */}
          </div>
        )}

        {/* Error icon, displayed when there's an error. */}
        {error && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}

        {/* Error message, displayed when there's an error. */}
        {error && <p className="text-sm text-[#ED4337] mt-1">{error}</p>}
      </div>
    </div>
  );
};

// Exporting the Input component to make it accessible to other parts of the application.
export default Input;

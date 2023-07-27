// Importing necessary dependencies and components.
import * as React from "react";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock } from "react-icons/fi";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import axios from "axios";
import Link from "next/link";

// Interface for the ResetForm component props.
interface IResetFormProps {
  token: string; // The 'token' prop represents the reset password token.
}

// Zod schema for the form input validation.
const FormSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(52, "Password must be less than 52 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"],
});

// Infer the type for the Zod schema.
type FormSchemaType = z.infer<typeof FormSchema>;



// Creating the ResetForm functional component.
const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  // Destructuring the 'token' prop from the component props.
  const { token } = props;

  // State variables for tracking password strength and form submission status.
  const [passwordScore, setPasswordScore] = useState(0);

  // React Hook Form setup using 'useForm' hook.
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema), // Using Zod resolver for input validation.
  });

  // Function to handle form submission.
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      // Send a POST request to reset the password using the provided token.
      const { data } = await axios.post("/api/auth/reset", {
        password: values.password,
        token,
      });
      reset(); // Reset the form fields after successful submission.
      toast.success(data.message); // Display success message using react-toastify.
    } catch (error: any) {
      toast.error(error.response.data.message); // Display error message if request fails.
    }
  };

  // Function to validate the password strength using zxcvbn library.
  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  // Effect to update password strength score whenever the password input changes.
  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  // JSX representing the ResetForm component UI.
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Reset password
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Sign in instead ? &nbsp;
        <Link
          href="/auth"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign in
        </Link>
      </p>
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        {/* Input for entering the new password */}
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        {/* Password strength indicator */}
        {watch().password?.length > 0 && (
          <div className="flex mt-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2
                      ? "bg-red-400"
                      : passwordScore < 4
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}

        {/* Input for confirming the new password */}
        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />

        {/* Submit button */}
        <SlideButton
          type="submit"
          text="Change password"
          slide_text="Secure"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

// Exporting the ResetForm component to make it accessible to other parts of the application.
export default ResetForm;

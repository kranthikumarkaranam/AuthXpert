// Importing necessary dependencies and components.
import * as React from "react";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

// Interface for the ForgotForm component props.
interface IForgotFormProps {}

// Zod schema for the form input validation.
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."), // Validate the email field.
});

// Infer the type for the Zod schema.
type FormSchemaType = z.infer<typeof FormSchema>;

// Creating the ForgotForm functional component.
const ForgotForm: React.FunctionComponent<IForgotFormProps> = (props) => {
  // React Hook Form setup using 'useForm' hook.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema), // Using Zod resolver for input validation.
  });

  // Function to handle form submission.
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      // Send a POST request to the server to handle the 'forgot password' request.
      const { data } = await axios.post("/api/auth/forgot", {
        email: values.email,
      });
      toast.success(data.message); // Display success message using react-toastify.
    } catch (error: any) {
      toast.error(error.response.data.message); // Display error message if request fails.
    }
  };

  // JSX representing the ForgotForm component UI.
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Forgot password ?
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
        {/* Input for entering the email address */}
        <Input
          name="email"
          label="Email Address"
          type="text"
          icon={<FiMail />}
          placeholder="example@address.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />

        {/* Submit button */}
        <SlideButton
          type="submit"
          text="Send email"
          slide_text="Secure"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

// Exporting the ForgotForm component to make it accessible to other parts of the application.
export default ForgotForm;

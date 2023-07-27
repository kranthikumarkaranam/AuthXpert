// Import necessary libraries and components
import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import axios from "axios";
import Link from "next/link";



// Define props interface for the RegisterForm component
interface IRegisterFormProps {}

// Defining the validation schema for the form using the zod library
const FormSchema = z
  .object({
    // Validation rules for first name
    first_name: z
      .string()
      .min(2, "First name must be atleast 3 characters")
      .max(32, "First name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed"),
    // Validation rules for last name
    last_name: z
      .string()
      .min(2, "Last name must be atleast 3 characters")
      .max(32, "Last name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed"),
    // Validation rules for email
    email: z.string().email("Please enter a valid email adress"),
    // Validation rules for phone number
    phone: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    // Validation rules for password
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(52, "Password must be less than 52 characters"),
    // Validation rules for confirm password, ensuring it matches password
      confirmPassword: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(52, "Password must be less than 52 characters"),
    // Validation rules for accepting terms and conditions
      accept: z.literal(true, {
      errorMap: () => ({
        message:
          "Please agree to all the Terms and Conditions before continuing",
      }),
    }),
  })
  // Adding a refinement to check if the password and password confirmation fields match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

// Infer the type of the form data based on the validation schema
type FormSchemaType = z.infer<typeof FormSchema>;






/* ================= Defining the RegisterForm component ==================== */
const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  
  // State to hold password strength score
  const [passwordScore, setPasswordScore] = useState(0);

  // Initializing the form using the useForm hook and passing in the validation schema using the zodResolver
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      // Make a POST request to server API with form data using AXIOS
      const { data } = await axios.post("/api/auth/signup", {
        ...values,
      });
      // Reset the form and display success message using react-toastify
      reset();
      toast.success(data.message);
    } catch (error: any) {
      // Display error message if the server responds with an error
      toast.error(error.response.data.message);
    }
  };

// Defining a function to check the password strength using the zxcvbn library
  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

// Update password strength score whenever the password field changes using useEffect Hook
  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  // Render the registration form with various input fields and validation
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign up
      </h2>
      {/* Render a link to the sign-in page for existing users */}
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account ? &nbsp;
        <Link
          href="/auth"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign in
        </Link>
      </p>
      {/* Render the form element */}
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* First name field */}
          <Input
            name="first_name"
            label="First Name"
            type="text"
            icon={<CiUser />}
            placeholder="John"
            register={register}
            error={errors?.first_name?.message}
            disabled={isSubmitting}
          />
          {/* Last name field */}
          <Input
            name="last_name"
            label="Last Name"
            type="text"
            icon={<CiUser />}
            placeholder="Doe"
            register={register}
            error={errors?.last_name?.message}
            disabled={isSubmitting}
          />
        {/* Email field */}
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
        {/* Phone number field */}
        <Input
          name="phone"
          label="Phone Number"
          type="text"
          icon={<BsTelephone />}
          placeholder="+(xx) xxxx-xx-xxxx"
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
        {/* Password field */}
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
        {/* Render password strength bars when the password field has input */}
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
        {/* Password confirmation field */}
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />
        {/* Checkbox for accepting terms and conditions */}
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="accept"
            className="mr-2 focus:ring-0 rounded"
            {...register("accept")}
          />
          <label htmlFor="accept" className="text-gray-700">
            I accept the&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              Terms
            </a>
            &nbsp;and&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {/* Render error message if the acceptance checkbox is not checked */}
        <div>
          {errors?.accept && (
            <p className="text-sm text-red-600 mt-1">
              {errors?.accept?.message}
            </p>
          )}
        </div>
        {/* Render the slideable button for signing up */}
        <SlideButton
          type="submit"
          text="Sign up"
          slide_text="Secure sign up"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

// Export the RegisterForm component
export default RegisterForm;

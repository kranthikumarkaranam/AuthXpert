// Importing necessary dependencies and components.
import * as React from "react";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";

// Interface for the LoginForm component props.
interface ILoginFormProps {
  callbackUrl: string; // The 'callbackUrl' prop represents the URL to redirect after successful sign-in.
  csrfToken: string; // The 'csrfToken' prop contains the Cross-Site Request Forgery (CSRF) token for form submission security.
}

// Zod schema for the form input validation.
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"), // Validate the email field.
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(52, "Password must be less than 52 characters"), // Validate the password field.
});

// Infer the type for the Zod schema.
type FormSchemaType = z.infer<typeof FormSchema>;

// Creating the LoginForm functional component.
const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  // Destructuring the 'callbackUrl' and 'csrfToken' props from the component props.
  const { callbackUrl, csrfToken } = props;

  // Using the 'useRouter' hook from Next.js to access the router object.
  const router = useRouter();
  const path = router.pathname; // Get the current path from the router.

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
    const res: any = await signIn("credentials", {
      redirect: false, // Do not perform a redirect after sign-in, as we handle it manually.
      email: values.email,
      password: values.password,
      callbackUrl,
    });

    if (res.error) {
      return toast.error(res.error); // Display error message using react-toastify if sign-in fails.
    } else {
      return router.push("/"); // Redirect to the homepage if sign-in is successful.
    }
  };

  // JSX representing the LoginForm component UI.
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign in
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don't have an account ? &nbsp;
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          onClick={() => {
            // Navigate to the sign-up page when the sign-up link is clicked.
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            });
          }}
        >
          Sign up
        </a>
      </p>
      <form
        method="post"
        action="/api/auth/signin/email"
        className="my-8 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Hidden input field for CSRF token */}
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

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

        {/* Input for entering the password */}
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

        {/* Link to the 'Forgot Password' page */}
        <div className="mt-2 hover:underline w-fit">
          <Link href="/forgot" className="text-blue-600">
            Forgot password ?
          </Link>
        </div>

        {/* Submit button */}
        <SlideButton
          type="submit"
          text="Sign in"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

// Exporting the LoginForm component to make it accessible to other parts of the application.
export default LoginForm;

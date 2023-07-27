// Import required components and utilities.
import Background from "@/components/Backgrounds/Background";
import SocialButton from "@/components/buttons/SocialButton";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";

// Define the auth component.
export default function auth({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Render the appropriate form based on the 'tab' prop */}
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
          {tab == "signin" ? (
            // Render the 'SignIn' form with the appropriate props
            <LoginForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
          ) : (
            // Render the 'SignUp' form
            <RegisterForm />
          )}


          {tab !== "signup" && (
            <>
              {/* Separator */}
              <div className="w-full flex items-center justify-between px-12">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              {/* Render social login buttons */}
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-4">
                {providers.map((provider: any) => {
                  // Skip rendering the 'Credentials' provider button
                  if (provider.name === "Credentials") return null;
                  return (
                    <SocialButton
                      key={provider.id}
                      id={provider.id}
                      text={`Sign in with ${provider.name === "Twitter (Legacy)" ? "Twitter" : provider.name}`}
                      csrfToken={csrfToken}
                    />
                  );
                })}
              </div>
            </>
          )}

        </div>

        {/* Render the Background component with the appropriate background image */}
        <Background
          image={`"../../auth/${tab == "signup" ? "register" : "login"}.jpg"`}
        />
      </div>
    </div>
  );
}

// Server-side function to retrieve necessary props for the component.
export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  const providers = await getProviders();
  return {
    props: {
      providers: Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}

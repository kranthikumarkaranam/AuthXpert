// Import required modules and components.
import { NextPageContext } from "next";
import {
  useSession,
  signOut,
  getSession,
} from "next-auth/react"; // Import NextAuth.js session management functions
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
  // Use the useSession hook to get the current session information of the authenticated user
  const { data: session } = useSession();

  // Sample text content for demonstration purposes
  const text1: string =
    "The complete authentication process is included in this comprehensive build, including login, registration, email account activation, password reset and notifications, advanced form validation, secure routes, session manipulation and many more...";
  const text2: string =
    "In this awesome build, I've used React.js, Next.js, MongoDB, TypeScript, and a bunch of other cool tools like NextAuth, React Hook Form, Zod (A TypeScript-first schema validation library), Axios, Nodemailer and SMTP Services, Gmail SMTP, React Toastify, Zxcvbn (A password strength estimation library), Handlebars, and BcryptJs. Together, they create a super secure and user-friendly authentication process!";

  return (
    <div className="home bg-black min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto">
        <div className=" relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center">
            {/* Log out button */}
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </div>
            </div>

            {/* User profile information */}
            <div className="w-full flex justify-center">
              <img
                src={session?.user?.image!}
                alt={`${session?.user?.name} image`}
                className="rounded-full h-40 w-40"
              />
            </div>
            <div className="text-center mt-7">
              <h3 className="text-4xl font-bold mb-3">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-semibold">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-14">
                You have logged in using &nbsp;
                <span className="capitalize bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 ml-3 font-semibold italic text-xl rounded-md">
                  {session?.user?.provider}
                </span>
              </div>
            </div>

            {/* Additional content */}
            <div className=" py-10  text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-3/5 px-4">
                <p className="font-semibold mt-5 mb-10 text-xl tracking-normal" style={{ fontFamily: "Quicksand, sans-serif" }}> {text1} </p>
                  <p className="mb-10 text-lg tracking-wide">{text2}</p>
                  <div className="mt-8 text-lg font-semibold flex items-center justify-center gap-2">
                    Source code here : &nbsp;
                    <a
                      href="https://github.com/kranthikumarkaranam/AuthXpert/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out text-4xl"
                    >
                      <AiFillGithub />
                    </a>
                  </div>
                  <div className="flex justify-center gap-4 mt-6 pt-6 text-3xl">
                    {/* Social media links */}
                    <a
                      href="https://www.linkedin.com/in/kranthi-kumar-karanam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/kranthikumarkaranam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillGithub />
                    </a>
                    <a
                      href="https://www.facebook.com/kranthikumarkaranam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://www.instagram.com/___kranthi_sm__/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <FaInstagram />
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'getServerSideProps' function is a special Next.js function that runs on the server-side.
// It is used to pre-fetch data and pass it as props to the corresponding page component before the page is rendered on the server-side.
export async function getServerSideProps(ctx: NextPageContext) {
  // This function fetches the session data for the authenticated user on the server-side.
  // It uses the ctx argument to get the request information and then fetches the user's session data from the server.
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}

// Import required modules and components.
import "@/styles/globals.css"; // Import global CSS styles
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; // Import NextAuth.js SessionProvider
import Head from "next/head"; // Import Head component for managing document head
import { ToastContainer } from "react-toastify"; // Import ToastContainer from 'react-toastify' for showing toast messages
import "react-toastify/dist/ReactToastify.css"; // Import CSS for 'react-toastify'

// Define the custom App component.
export default function App({
  Component,
  pageProps: { session, ...pageProps }, // Extract the session object from pageProps
}: AppProps) {
  return (
    <>
      <Head>
        {/* Set the title of the document */}
        <title>AuthXpert</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      {/* Use SessionProvider to provide session data to all pages */}
      <SessionProvider session={session}>
        {/* ToastContainer for showing toast messages */}
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {/* Render the main content of the page */}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

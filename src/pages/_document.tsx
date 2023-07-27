// Import required Next.js components.
import { Html, Head, Main, NextScript } from "next/document";

// Define the custom Document component.
export default function Document() {
  return (
    <Html lang="en"> {/* Set the language of the document to English */}
      <Head /> {/* Include the head of the document with any custom meta tags, links, or scripts */}
      <body>
        <Main /> {/* Render the main content of the page */}
        <NextScript /> {/* Include the necessary Next.js scripts for client-side rendering */}
      </body>
    </Html>
  );
}

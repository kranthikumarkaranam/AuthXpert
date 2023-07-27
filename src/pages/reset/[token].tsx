// Import required components and modules.
import Background from "@/components/Backgrounds/Background";
import ResetForm from "@/components/forms/Reset";
import { NextPageContext } from "next";

// Define the Reset component that receives a `token` prop.
export default function Reset({ token }: { token: string }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Render the ResetForm component inside a container */}
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
          <ResetForm token={token} />
        </div>

        {/* Render the Background component with a background image */}
        <Background image={`"../../auth/reset.jpg"`} />
      </div>
    </div>
  );
}

// Server-side function to get the `token` from the query parameters and pass it as props to the Reset component.
export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  return {
    props: { token },
  };
}

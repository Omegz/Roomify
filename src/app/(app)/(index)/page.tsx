import "server-only";

import { HomeWords } from "~/app/_components/Home_Words";
import Link from "next/link";
import Image from "next/image";
import "~/styles/landing/globals.css";
import AuthButton from "~/app/_components/AuthButton";
import { validateRequest } from "~/server/authUtils";
import OrgLandingNav from "~/app/_components/OrgLandingNav";

export default async function Home() {
  const { user } = await validateRequest();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white ">
      <div className="flex">
        <h1>Company Name: </h1>
        <a href="/choices">
          <button className="ml-3">Choices</button>
        </a>
      </div>

      <div className="mt-4 w-3/4 ">
        <h1>Gay boy Click Here to continue your jouney being Gay:</h1>
        <a href="/louis">
          <button className="ml-3 ml-3 border-2 hover:bg-pink-500">
            I accept being gay!
          </button>
        </a>
      </div>
    </main>
  );
}

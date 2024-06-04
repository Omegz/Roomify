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
      hello world
    </main>
  );
}

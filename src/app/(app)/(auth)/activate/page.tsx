"use server";
import "server-only";

import '~/styles/landing/globals.css'
import '~/styles/auth/globals.css'
import Activate from "~/app/_components/Activate";
import { redirect } from "next/navigation";
import { validateRequest } from "~/server/authUtils";

export default async function Home() {
  const { user } = await validateRequest();
  if (user?.active !== false) {
    throw redirect("/login")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white ">

      <div className="bg-[#131417] h-auto min-h-screen p-12 lg:p-24">
        <div className="container mx-auto max-w-xs p-4 flex flex-col gap-2">
          <Activate user={user} />
        </div>
      </div>
    </main >
  );
}
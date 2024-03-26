import "server-only";

import { HomeWords } from "~/app/_components/Home_Words";
import Link from "next/link";
import Image from "next/image";
import '~/styles/landing/globals.css'
import AuthButton from "~/app/_components/AuthButton";
import { validateRequest } from "~/server/authUtils";

export default async function Home() {
  const { user } = await validateRequest();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white ">
      <div className="flex bg-[#131417] parentDiv">
        <div className="w-1/4 hidden md:flex sp justify-center items-center">
          <div className="m-7 ml-12">
            <h1 className="text-4xl">ChatGpt&apos;s <br /> Best-friend</h1>
            <h1 className="text-2xl mt-5">How it Works:</h1>
            <h1 className="text-2xl mt-5">Ask your Question.</h1>
            <h1 className="text-2xl mt-5">We return it instantly rephrased for better results.</h1>

            <h1 className="text-2xl mt-5">
              Start Chatting with Louis today for an automated Question/Prompt rephraser!
            </h1>
          </div>
        </div>

        <div className=" md:w-2/4 flex flex-col justify-center items-center">
          <h1 className="text-3xl mp">Louis Chatteaux</h1>
          <Image className="w-2/4 m-6 md:w-[100px]" src="/logo.png" alt="" width={100} height={600} />
          <HomeWords />

          <div className="container2">
            {user ? (
              <Link
                href="/louis"
                className="button type--A"
                prefetch={true}
              >
                <div className="button__line"></div>
                <div className="button__line"></div>
                <span className="button__text sp">Chat Now</span>
                <div className="button__drow1"></div>
                <div className="button__drow2"></div>
              </Link>
            ) : null}

            <Link
              href="/about"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">Learn More</span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>
            <AuthButton user={user} />
          </div>
        </div>

        <div className="w-1/4 hidden md:flex sp justify-center items-center">
          <div className="m-7 mr-12">
            <h1 className="text-4xl">With Louis Chatteaux</h1>
            <h1 className="text-2xl mt-5">You Save</h1>
            <h1 className="text-2xl mt-5">Time</h1>
            <h1 className="text-2xl mt-5">Energy</h1>
            <h1 className="text-2xl mt-5">Money</h1>
            <h1 className="text-2xl mt-5">And Much More!!</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
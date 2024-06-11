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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white ">
      <div className="parentDiv flex bg-[#131417]">
        <div className="sp hidden w-1/4 items-center justify-center md:flex">
          <div className="m-7 ml-12">
            <h1 className="text-4xl">
              ChatGpt&apos;s <br /> Best-friend
            </h1>
            <h1 className="mt-5 text-2xl">How it Works:</h1>
            <h1 className="mt-5 text-2xl">Ask your Question.</h1>
            <h1 className="mt-5 text-2xl">
              We return it instantly rephrased for better results.
            </h1>

            <h1 className="mt-5 text-2xl">
              Start Chatting with Louis today for an automated Question/Prompt
              rephraser!
            </h1>
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center md:w-2/4">
          <h1 className="mp text-3xl">Louis Chatteaux</h1>
          <Image
            className="m-6 w-2/4 md:w-[100px]"
            src="/logo.png"
            alt=""
            width={100}
            height={600}
          />
          <HomeWords />

          <div className="container2">
            {user ? (
              <Link href="/rista" className="button type--A" prefetch={true}>
                <div className="button__line"></div>
                <div className="button__line"></div>
                <span className="button__text sp">islatte tilda</span>
                <div className="button__drow1"></div>
                <div className="button__drow2"></div>
              </Link>
            ) : null}

            <Link href="/rista" className="button type--A" prefetch={true}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">islatte tilda</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>

            <Link href="/kaffebaren" className="button type--B" prefetch={true}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">Vestebro</span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>
            <Link href="/tildalatte" className="button type--B" prefetch={true}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">tilda latte</span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>
            <Link
              href="/kaffesalonenlatte"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">kaffe salonen </span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>

            <Link
              href="/dronninglouise"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">dronning </span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>
            <Link
              href="/bistrococorico"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">bistro coco</span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>

            <Link
              href="/kaffesalonencapu"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">kaffe salonen Capu </span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>

            <Link
              href="/bistrococoricocapu"
              className="button type--B"
              prefetch={true}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text sp">bistro coco Capu</span>

              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </Link>

            <AuthButton user={user} />
          </div>
        </div>

        <div className="sp hidden w-1/4 items-center justify-center md:flex">
          <div className="m-7 mr-12">
            <h1 className="text-4xl">With Louis Chatteaux</h1>
            <h1 className="mt-5 text-2xl">You Save</h1>
            <h1 className="mt-5 text-2xl">Time</h1>
            <h1 className="mt-5 text-2xl">Energy</h1>
            <h1 className="mt-5 text-2xl">Money</h1>
            <h1 className="mt-5 text-2xl">And Much More!!</h1>
          </div>
        </div>
      </div>
    </main>
  );
}

"use server";
// 'use client'
// import { signIn } from "next-auth/react"


// export default function SignIn({
// }) {

//   const action = async (fd: FormData) => {
//     await signIn('email', { email: fd.get('email') })
//   }

//   return (
//     <form action={action} className="space-y-1">
//       < h2 className="text-3xl font-bold tracking-tight text-pink-600 flex justify-center">Join</h2>
//       <div className="flex flex-col justify-between space-y-4 !text-sm">
//         <input
//           required
//           placeholder="Email"
//           type="text"
//           name="email"
//           className=" mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />

//         {/* <input
//           required
//           placeholder="Password"
//           type="password"
//           name="password"
//           className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         /> */}
//       </div>
//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-[#1f4f46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Sign in with Email
//       </button>
//     </form>
//     // <form method="post" action="/api/auth/signin/email">
//     //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//     //   <label>
//     //     Email address
//     //     <input type="email" id="email" name="email" />
//     //   </label>
//     //   <button type="submit">Sign in with Email</button>
//     // </form>
//   )
// }

import { db } from "~/server/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "~/server/auth";
import { redirect } from "next/navigation";
import { type ActionResult } from "next/dist/server/app-render/types";




export default async function Page() {
  async function login(formData: FormData): Promise<ActionResult> {
    "use server"
    const email = formData.get("email");
    const password = formData.get("password");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    function isValidEmail(email: string): boolean {
      return /.+@.+/.test(email);
    }

    if (
      typeof email !== "string" || !isValidEmail(email) || email.length > 255
    ) {
      return {
        error: "Invalid email"
      };
    }
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
      return {
        error: "Invalid password"
      };
    }

    const loggedinUser = await db.user.findFirst({
      where: {
        email: email,
        // hashed_password: hashedPassword
      }
    })

    if (loggedinUser?.hashed_password) {
      const validPassword = await new Argon2id().verify(loggedinUser.hashed_password, password);
      if (loggedinUser?.id && validPassword) {
        const session = await lucia.createSession(loggedinUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirect("/")
      }
    }

    throw new Error('Failed to sign in');
  }
  return (
    <>
      <h1>Login</h1>
      <form action={login}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}


'use client'
import { signIn } from "next-auth/react"


export default function SignIn({
}) {

  const action = async (fd: FormData) => {
    await signIn('email', { email: fd.get('email') })
  }

  return (
    <form action={action} className="space-y-1">
      < h2 className="text-3xl font-bold tracking-tight text-pink-600 flex justify-center">Join</h2>
      <div className="flex flex-col justify-between space-y-4 !text-sm">
        <input
          required
          placeholder="Email"
          type="text"
          name="email"
          className=" mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />

        {/* <input
          required
          placeholder="Password"
          type="password"
          name="password"
          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        /> */}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-[#1f4f46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in with Email
      </button>
    </form>
    // <form method="post" action="/api/auth/signin/email">
    //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //   <label>
    //     Email address
    //     <input type="email" id="email" name="email" />
    //   </label>
    //   <button type="submit">Sign in with Email</button>
    // </form>
  )
}
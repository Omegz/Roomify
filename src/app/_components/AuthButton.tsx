'use client'
import type { User } from "lucia"
import Link from "next/link"

export default function AuthButton(props: { user: User | null }) {

  const signOut = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  return props?.user?.active === true ? (
    <button
      onClick={signOut}
      className="button type--C"
    >

      <div className="button__line"></div>
      <div className="button__line"></div>
      <span className="button__text sp">Sign out</span>
      <div className="button__drow1"></div>
      <div className="button__drow2"></div>
    </button>
  ) : (
    <>
      {props?.user?.active !== false ? (<Link
        href="/signup"
        className="button type--C"
        prefetch={true}
      >

        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text sp">Sign up</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </Link>) : null}
      <Link
        href="/login"
        className="button type--C"
        prefetch={true}
      >

        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text sp">Log in</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </Link>
    </>
  )
}
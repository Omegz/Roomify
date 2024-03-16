'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function AuthButton(props: { isLoggedIn: boolean }) {

  return props.isLoggedIn ? (
    <button
      onClick={() => signOut()}
      className="button type--C"
    >

      <div className="button__line"></div>
      <div className="button__line"></div>
      <span className="button__text sp">Sign out</span>
      <div className="button__drow1"></div>
      <div className="button__drow2"></div>
    </button>
  ) : (
    <Link
      href="/signin"
      className="button type--C"
    >

      <div className="button__line"></div>
      <div className="button__line"></div>
      <span className="button__text sp">Sign in</span>
      <div className="button__drow1"></div>
      <div className="button__drow2"></div>
    </Link>
  )
}
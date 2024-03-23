import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { lucia } from "./auth";

import { type ActionResult } from "next/dist/server/app-render/types";
import { Google, generateCodeVerifier, generateState } from "arctic";
import { env } from "~/env";
import { serializeCookie } from "oslo/cookie";
import { redirect } from "next/navigation";


export const serverLogout = async (): Promise<ActionResult> => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}


export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch { }
    return result;
  }
);

export const google = new Google(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.NEXTAUTH_URL + "/api/auth/callback/google");

export const serverGoogleLogin = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier);
  const headers = new Headers();
  headers.append('Location', url.toString());

  // Append cookies using `append` to allow multiple values
  headers.append('Set-Cookie', serializeCookie("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
    maxAge: 60 * 10, // 10 minutes
    path: "/"
  }));
  headers.append('Set-Cookie', serializeCookie("code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
    maxAge: 60 * 10, // 10 minutes
    path: "/"
  }));
  return new Response(null, {
    status: 302,
    headers
  });
}

export const validateOrRedirect = async (invert = false) => {
  const { session, user } = await validateRequest();
  if (user?.active === false) {
    throw redirect("/activate")
  }
  if (user?.active !== true && !invert) {
    throw redirect("/login")
  }
  if (user?.active === true && invert) {
    throw redirect("/")
  }
  return { session, user }
}
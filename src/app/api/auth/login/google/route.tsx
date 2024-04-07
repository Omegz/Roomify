import { generateCodeVerifier, generateState } from "arctic";
import { serializeCookie } from "oslo/cookie";
import { google } from "~/server/authUtils";

const handler = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": [
        serializeCookie("google_oauth_state", state, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
          maxAge: 60 * 10, // 10 minutes
          path: "/",
        }),
        serializeCookie("code_verifier", codeVerifier, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
          maxAge: 60 * 10, // 10 minutes
          path: "/",
        }),
      ] as unknown as string,
    },
  });
};

export { handler as GET, handler as POST };

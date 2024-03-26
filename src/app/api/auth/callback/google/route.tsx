import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { type NextRequest } from "next/server";
import { parseCookies } from "oslo/cookie";
import { lucia } from "~/server/auth";
import { google } from "~/server/authUtils";
import { db } from "~/server/db";
import { parseJWT } from "oslo/jwt";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator"

interface GoogleUserResult {
  iss: string,
  azp: string,
  aud: string,
  sub: string,
  email: string,
  email_verified: boolean,
  at_hash: string,
  nonce: string,
  name: string,
  picture: string,
  given_name: string,
  family_name: string,
  iat: number,
  exp: number
}


const handler = async (req: NextRequest) => {

  const cookies = parseCookies(req.headers.get("Cookie") ?? "");
  const stateCookie = cookies.get("google_oauth_state") ?? null;

  const codeVerifierCookie = cookies.get("code_verifier") ?? "";


  const url = new URL(req.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");


  // verify state
  if (!state || !stateCookie || !code || stateCookie !== state) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifierCookie);
    const googleUserResult = parseJWT(tokens.idToken)!.payload as GoogleUserResult

    const existingUser = await db.user.findFirst({
      where: {
        email: googleUserResult.email,
        google_sub: googleUserResult.sub,
      }
    })

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie": sessionCookie.serialize()
        }
      });
    }

    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey

    const userId = generateId(15);
    await db.user.create({
      data: {
        id: userId,
        username: randomName,
        first_name: googleUserResult.given_name,
        last_name: googleUserResult.family_name,
        email: googleUserResult.email,
        google_sub: googleUserResult.sub,
        image: googleUserResult.picture
      }
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookie.serialize()
      }
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      // bad verification code, invalid credentials, etc
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }

}

export { handler as GET, handler as POST };
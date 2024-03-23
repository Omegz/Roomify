import { serverLogout } from "~/server/authUtils";
import { redirect } from "next/navigation";


const handler = async () => {
  await serverLogout()
  redirect("/")
}

export { handler as GET, handler as POST };

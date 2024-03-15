import "server-only";
// import { useEffect } from "react";
import MobileSiderbar from "~/app/_components/MobileSidebar";
import Sidebar from "~/app/_components/Sidebar";
import Chat from "~/app/_components/Chat";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
// import useAnalytics from "@/hooks/useAnalytics";


export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    throw redirect("/")
  }
  // const { trackEvent } = useAnalytics();

  // useEffect(() => {
  //   trackEvent("page.view", { page: "home" });
  // }, []);

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <MobileSiderbar />
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat />
    </main>
  );
}

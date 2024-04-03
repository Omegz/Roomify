import "server-only";
// import { useEffect } from "react";
import MobileSiderbar from "~/app/_components/MobileSidebar";
import Header from "~/app/_components/Header";
import Sidebar from "~/app/_components/Sidebar";
import Chat from "~/app/_components/Chat";
import { validateOrRedirect } from "~/server/authUtils";
// import useAnalytics from "@/hooks/useAnalytics";

export default async function Louis() {
  await validateOrRedirect();
  // const { trackEvent } = useAnalytics();

  // useEffect(() => {
  //   trackEvent("page.view", { page: "home" });
  // }, []);

  return (
    <main className="relative flex h-screen w-full overflow-hidden">
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

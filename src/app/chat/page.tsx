'use client'
// import { useEffect } from "react";
import MobileSiderbar from "~/app/_components/MobileSidebar";
import Sidebar from "~/app/_components/Sidebar";
import { signal } from "@preact/signals-react";
import Chat from "~/app/_components/Chat";
// import useAnalytics from "@/hooks/useAnalytics";

const mobileSidebarVisible = signal(false);

export default function Home() {
  // const { trackEvent } = useAnalytics();

  // useEffect(() => {
  //   trackEvent("page.view", { page: "home" });
  // }, []);

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <MobileSiderbar mobileSidebarVisible={mobileSidebarVisible} />
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat mobileSidebarVisible={mobileSidebarVisible} />
    </main>
  );
}

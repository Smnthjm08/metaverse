import { Button } from "@ui/components/ui/button";
import LeftSideBar from "../components/menu-bars/left-sidebar";
import { TopBar } from "../components/menu-bars/topbar";
import { BookOpen, Share } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-row items-top justify-between z-50 min-h-screen pt-12 px-12 text-gray-50">
      <LeftSideBar />
      <TopBar />
      <div className="space-x-3">
        <Button size={"sm"} className="gap-x-2">Share</Button>
        <Button size={"sm"} className="gap-x-2" variant={"secondary"}><BookOpen width={"14"} height={"14"} /> Library</Button>
      </div>
    </main>
  );
}

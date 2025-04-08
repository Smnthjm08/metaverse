"use client";

import { Button } from "@ui/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function AppBar() {
  const router = useRouter();

  return (
    <nav className="w-full z-50 h-16 flex items-center justify-between px-6 shadow-md border-b-2 fixed top-0">
      <div className="font-bold font-serif text-xl tracking-tight">
        excaildraw
      </div>

      <div className="flex gap-4">
        <ModeToggle />
        <Button variant="outline" onClick={() => router.push("/signin")}>
          Sign In
        </Button>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </nav>
  );
}

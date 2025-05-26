"use client";

import { Button } from "@ui/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import useAuth from "../../hooks/useAuth";

export default function AppBar() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  return (
    <nav className="w-full z-50 h-16 flex items-center justify-between px-6 shadow-md border-b-2 fixed top-0">
      <div className="font-bold font-sans text-xl tracking-tight">
        metaverse
      </div>

      <div className="flex gap-4">
        <ModeToggle />
        {!isLoading && user ? (
        // @ts-ignore
          user?.name
        ) : (
          <div>
            <Button variant="outline" onClick={() => router.push("/signin")}>
              Sign In
            </Button>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
          </div>
        )}
      </div>
    </nav>
  );
}

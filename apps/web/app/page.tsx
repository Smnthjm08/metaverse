"use client";

import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

import { useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect to app
    if (!isLoading && user) {
      router.push("/app");
    }
  }, [user, isLoading, router]);

  return (
    <main className="flex flex-row items-center justify-center min-h-screen">
      <h1 className="text-yellow-300 font-extrabold">home page</h1>
      <div>
        <Link href={"/app"}>app</Link>
      </div>
    </main>
  );
}

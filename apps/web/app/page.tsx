"use client";

import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [user, router]);

  return (
    <main className="flex flex-row items-center justify-center min-h-screen">
      <h1 className="text-yellow-300 font-extrabold">home page</h1>
    </main>
  );
}

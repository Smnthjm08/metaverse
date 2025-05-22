"use client";

import useAuth from "../../../../hooks/useAuth";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  console.log("user", user);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="font-bold text-yellow-300">This is settings/profile page</div>
    </main>
  );
}

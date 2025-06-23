"use client";

import Loading from "../../../components/global/loading";
import useAuth from "../../../hooks/useAuth";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="font-bold text-yellow-300">This is profile page and needs to be removed.</div>
      <div className="text-white">{user?.name}</div>
    </main>
  );
}

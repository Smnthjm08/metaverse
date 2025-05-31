"use client";

import useSessions from "../../../../hooks/useSessions";

export default function SessionsPage() {
  const { sessions, isPending, isSuccess, isError } = useSessions();
  console.log("sessions", sessions);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="font-bold text-yellow-300">
        This is setting/sessions page
      </div>
    </main>
  );
}

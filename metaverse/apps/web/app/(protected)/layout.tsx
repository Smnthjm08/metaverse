"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/global/loading";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/signin?redirect=${pathname}`);
    }
  }, [isLoading, user, router]);

  if (isLoading || (!isLoading && !user)) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>{children}</div>
    </div>
  );
}

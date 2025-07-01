"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/global/loading";
import { AppSidebar } from "../../components/sidebar/sidebar-layout";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@ui/components/ui/sidebar";
import { Separator } from "@ui/components/ui/separator";

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
  }, [user]);

  if (isLoading || (!isLoading && !user)) {
    return <Loading />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

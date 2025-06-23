"use client";

import { SidebarInset, SidebarProvider } from "@ui/components/ui/sidebar";
import { AppSidebar } from "../../../components/layouts/global-sidebar-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="pt-16">
        <AppSidebar />
      </div>
      <SidebarInset>
        <div className="flex flex-col">
          <div className="p-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

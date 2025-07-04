"use client";

import type * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@ui/components/ui/sidebar";
import { NavUser } from "./nav-user";
import useAuth from "../../hooks/useAuth";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    url: "/app",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
    items: [
      {
        title: "Profile",
        url: "/settings/profile",
      },
      {
        title: "Sessions",
        url: "/settings/sessions",
      },
    ],
  },
  {
    title: "Team",
    icon: Users,
    url: "/team",
    items: [
      {
        title: "Members",
        url: "/team/members",
      },
      {
        title: "Permissions",
        url: "/team/permissions",
      },
      {
        title: "Invitations",
        url: "/team/invitations",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

const isActive = (url: string) => {
  return pathname === url || pathname.startsWith(url + "/");
};


  if (!user && isLoading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div className="font-bold">metaverse</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) =>
              item.items ? (
                <SidebarMenuItem key={item.title}>
                  <Collapsible className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu className="ml-6 mt-1 border-l pl-2">
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(subItem.url)}
                            >
                              <Link href={subItem.url} className="text-sm">
                                {subItem.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
        <div className="mt-auto">
          <SidebarGroup>{user && user?.createdAt && <NavUser user={user} />}</SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

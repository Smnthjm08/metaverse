import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ui/components/ui/sidebar";
import { Calendar, Inbox, Search, Settings, User } from "lucide-react";

const items = [
  {
    title: "Profile",
    url: "/settings/profile",
    icon: User,
  },
  {
    title: "Sessions",
    url: "/settings/sessions",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/settings/",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/settings/",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings/",
    icon: Settings,
  },
];

export default function SettingsSidebar() {
  return (
    <div className="pt-16">
      <Sidebar>
        <SidebarHeader>Hello</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* </SidebarGroup> */}
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

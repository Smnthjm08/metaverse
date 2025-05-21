import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@ui/components/ui/menubar";
import {
  Github,
  Linkedin,
  LogIn,
  LucideTwitter,
  MenuIcon,
  Twitch,
} from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";

export default function LeftSideBar() {
  return (
    <main>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <MenuIcon width={"24"} height={"24"} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Open <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Save to... <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Export Image</MenubarItem>
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Find on Canvas <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Reset the Canvas <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Find on Canvas <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="gap-x-4">
              <Github width={"16"} height={"16"} /> GitHub
            </MenubarItem>{" "}
            <MenubarItem className="gap-x-4">
              <Linkedin width={"16"} height={"16"} /> LinkedIn
            </MenubarItem>{" "}
            <MenubarItem className="gap-x-4">
              <LucideTwitter width={"16"} height={"16"} /> Twitter
            </MenubarItem>
            <MenubarItem className="gap-x-4">
              <Twitch width={"16"} height={"16"} /> Discord
            </MenubarItem>
            <MenubarItem className="gap-x-4">
              <LogIn width={"16"} height={"16"} /> Sign Up
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="gap-x-4">
              <ModeToggle />{" "}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </main>
  );
}

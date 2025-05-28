"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  Bell,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "@ui/components/ui/sonner";
import { queryClient } from "./providers/tanstack-provider";
import { AUTH } from "../hooks/useAuth";

type UserPropsTypes = {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  avatar?: string;
};

export const LOGOUT = "logout";

export default function ProfileDropdown({ user }: { user: UserPropsTypes }) {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH] });
      queryClient.removeQueries({ queryKey: [AUTH] });
      
      toast.success("Logout successful.");
      router.push("/signin");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3 min-w-32 py-2 max-h-24"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar || "/next.svg"}
              alt={user?.name}
            />
            <AvatarFallback className="text-xs">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-light">{user?.name}</span>
            <span className="text-xs text-muted-foreground">
              @{user?.username}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            {user?.verified && (
              <div className="flex items-center gap-1 mt-1">
                <Shield className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/notifications"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-bold text-red-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
"use client";

import { Input } from "@ui/components/ui/input";
import { Badge } from "@ui/components/ui/badge";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Edit2 } from "lucide-react";
import { useState } from "react";
import { editUserSchema } from "@repo/common/edit-user.schema";
import useAuth from "../../../../hooks/useAuth";
import { z } from "zod";


// @ts-ignore
type EditUserFormData = z.infer<typeof editUserSchema>

const mockUser = {
  id: "cmb80attx0001y4cdtjnfc91f",
  name: "Maria Fernanda",
  email: "maria@example.com",
  username: "maria.fernanda",
  createdAt: "2025-05-28T13:54:10.436Z",
  updatedAt: "2025-06-23T17:58:26.596Z",
  verified: true,
  avatar: "https://robohash.org/mail@ashallendesign.co.uk",
};

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      createdAt: user?.createdAt || "",
      updatedAt: user?.updatedAt || "",
      verified: user?.verified || false,
      avatar: user?.avatar || "",
    },
  });

  function onSubmit(values: EditUserFormData) {
    console.log("Profile updated:", values);
    // Handle form submission here
  }

  const handleAvatarEdit = () => {
    setIsEditingAvatar(true);
    console.log("Avatar edit clicked - implement upload functionality");
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-gray-400">View all your profile details here.</p>
        </div>
        {/* <Form {...any}> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-700">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className="font-bold bg-transparent border-none text-center text-white text-2xl p-0 focus-visible:ring-0"
                              placeholder="Your Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {user?.verified && (
                      <Badge className="bg-green-600 text-white mt-2">
                        Verified User
                      </Badge>
                    )}
                  </div>

                  <div className="relative w-32 h-32 mx-auto mb-6 group">
                    <Image
                      src={
                        user?.avatar ?? "/placeholder.svg?height=128&width=128"
                      }
                      alt={user?.name ?? "Profile"}
                      width={128}
                      height={128}
                      className="rounded-full border-4 border-gray-600 object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handleAvatarEdit}
                    >
                      <div className="text-center">
                        <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                        <span className="text-white text-xs">Edit</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 hover:bg-opacity-50"
                      onClick={handleAvatarEdit}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-600 text-white"
                              placeholder="username"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="border-gray-600 text-white"
                              placeholder="email@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} type="hidden" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Account Details
                    <div className="flex items-center space-x-2">
                      {user?.verified && (
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">User ID</div>
                      <div className="text-white font-mono text-sm">
                        {user?.id}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">
                          Account Created
                        </div>
                        <div className="text-white text-sm">
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">
                          Last Updated
                        </div>
                        <div className="text-white text-sm">
                          {user?.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">
                        Account Status
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${user?.verified ? "bg-green-500" : "bg-yellow-500"}`}
                        ></div>
                        <span className="text-white text-sm">
                          {user?.verified
                            ? "Verified Account"
                            : "Unverified Account"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-600 pt-6"></div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 py-2">
                Save Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import Link from "next/link";
import { signUpSchema } from "@repo/common/auth";
import axios from "axios";
import { toast } from "@ui/components/ui/sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    console.log("dwcwds");

    try {
      const validatedData = signUpSchema.safeParse({
        username: username,
        email: email,
        name: name,
        password: password,
        role: "admin",
      });
      console.log("dwcwdssdcdsc");

      if (!validatedData.success) {
        const formattedErrors: Record<string, string> = {};
        validatedData.error.errors.forEach((error) => {
          const path = error.path[0] as string;
          formattedErrors[path] = error.message;
        });
        setErrors(formattedErrors);
        router.push("/dashboard");
        console.log("eerr", errors);
        return;
      }

      console.log("dwcwwsdefrgthyjhtgrfedsds");

      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/signup",
        { username, email, name, password, role: "admin" }
      );

      console.log("response", response?.data?.error);
      router.push("/dashboard");
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
              <CardDescription className="text-center">
                Create an account using your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="username">Username</Label>
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="username">Name</Label>
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="johndoe123"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Signup
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Login with Google
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Already have an account ?
                  <Link href="/signin" className="underline underline-offset-4">
                    Sign In
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

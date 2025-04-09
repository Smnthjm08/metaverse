"use client";

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
import { signInSchema } from "@repo/common/auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "@ui/components/ui/sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const isEmail = emailOrUsername.includes("@");

      let validatedData;
      if (isEmail) {
        validatedData = signInSchema.parse({
          email: emailOrUsername,
          password: password,
        });
      } else {
        validatedData = signInSchema.parse({
          username: emailOrUsername,
          password: password,
        });
      }

      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/signin",
        validatedData
      );
      console.log("response", response);
      router.push("/dashboard");
      toast.success(response?.data?.message);

      console.log("Validated data:", validatedData);
    } catch (error) {
      toast.error("Error Signing up");
      console.log("error", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your email or username below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="emailOrUsername">Email or username</Label>
                    <Input
                      id="emailOrUsername"
                      type="text"
                      placeholder="m@example.com or mexample"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Signin
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Login with Google
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
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

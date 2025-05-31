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
import { toast } from "@ui/components/ui/sonner";
import { useMutation } from "@tanstack/react-query";
import { signInRequest } from "../../../api/auth.api";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/app";

  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response: any) => {
      toast.success(response?.message || "Signed in successfully");
      router.push(redirect);
    },

    onError: (error: any) => {
      let errorMessage = "Failed to sign in. Please try again.";

      if (error?.response?.data?.error) {
        errorMessage = error?.response?.data?.error;
      }

      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const isEmail = emailOrUsername.includes("@");

      const loginData = {
        email: isEmail ? emailOrUsername : undefined,
        username: !isEmail ? emailOrUsername : undefined,
        password,
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "",
      };

      try {
        signInSchema.parse(loginData);
        signIn(loginData);
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          const formattedErrors: Record<string, string> = {};
          zodError.errors.forEach((err) => {
            const path = err.path.join(".");
            formattedErrors[path] = err.message;
          });
          setErrors(formattedErrors);
          toast.error("Please fix the form errors");
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error(error?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold">
                Sign In
              </CardTitle>
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
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username}</p>
                    )}
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

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                  <Button
                    variant="outline"
                    disabled
                    type="button"
                    className="w-full"
                  >
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

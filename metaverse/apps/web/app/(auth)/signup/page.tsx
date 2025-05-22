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
import { toast } from "@ui/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "../../../api/auth.api";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (response: any) => {
      toast.success("Signed up successfully");
      router.push("/app");
    },
    onError: (error: any) => {
      let errorMessage = "Failed to sign up. Please try again.";

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

      const signupData = {
        username,
        email,
        name,
        password,
        confirmPassword,
      };

      try {
        const validatedData = signUpSchema.safeParse(signupData);

        if (!validatedData.success) {
          const formattedErrors: Record<string, string> = {};
          validatedData.error.errors.forEach((err) => {
            const path = err.path[0] as string;
            formattedErrors[path] = err.message;
          });
          setErrors(formattedErrors);
          toast.error("Please fix the form errors");
          return;
        }

        const apiData = {
          username: validatedData.data.username,
          email: validatedData.data.email,
          name: validatedData.data.name,
          password: validatedData.data.password,
          confirmPassword: validatedData.data.confirmPassword,
        };

        signUp(apiData);
      } catch (error: any) {
        toast.error("Validation error: " + (error.message || "Unknown error"));
      }
    } catch (error: any) {
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
                Sign Up
              </CardTitle>
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
                      autoComplete="email"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">ConfirmPassword</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing up..." : "Sign Up"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled
                    className="w-full"
                  >
                    Login with Google
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
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

"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/global";

export default function Component() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const { user, setUser } = useUserStore();

    const signupFunction = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://mesmer-ai-be.souryax.tech/api/user/signup", {
                name,
                email,
                password
            });
            console.log(response);
            if(response?.data?.success) {
                toast.success("Signed up successfully! Please sign in");
            } else if(response?.data?.message == "User already exists") {
                toast.error("User already exists");
            } else {
                toast.error("Error signing up");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error signing up");
        }
    }

    const signinFunction = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://mesmer-ai-be.souryax.tech/api/user/signin", {
                email,
                password
            });
            console.log(response?.data);
            if(response?.data?.success) {
                localStorage.setItem('access_token', response?.data?.access_token);
                toast.success("Signed in successfully");
                router.refresh();
                router.push("/");
            } else if(response?.data?.message == "Wrong credentials") {
                toast.error("Wrong credentials");
            } else {
                toast.error("Error signing in");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error signing in");
        }
    }

  return (
    <div className="grid w-full min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-primary p-6 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-primary-foreground">
              Sign In
            </h1>
            <p className="text-primary-foreground/80">
              Welcome back! Please enter your email and password to sign in.
            </p>
          </div>
          <form onSubmit={signinFunction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
                placeholder="m@example.com"
                className="bg-primary/10 text-primary-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-foreground">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                className="bg-primary/10 text-primary-foreground"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background p-6 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Create a new account to get started with our AI chatbot.
            </p>
          </div>
          <form onSubmit={signupFunction} className="space-y-4">     
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Name
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                type="text"
                placeholder=""
                className="border border-input bg-background text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
                placeholder="m@example.com"
                className="border border-input bg-background text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                className="border border-input bg-background text-foreground"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

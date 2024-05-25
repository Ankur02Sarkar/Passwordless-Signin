"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { startAuthentication } from "@simplewebauthn/browser";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [passkeyEmail, setPasskeyEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data } = useSession();

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password || email === "" || password === "") {
        toast.error("Please enter all Fields");
        return;
      }
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.error) {
          toast.error("Invalid Credentials");
          return;
        }
        toast.success("Login Success");
        await saveUserToLocalStorage();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    const saveUserToLocalStorage = async () => {
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();
        localStorage.setItem("userObj", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    };

    async function startLoginChallenge() {
      try {
        const response = await fetch("/api/login-challenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to Create Login Challenge");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error Creating Login Challenge :", error);
        throw error;
      }
    }

    async function verifyLoginChallenge(userEmail, challenge, cred) {
      const session = localStorage.getItem("userObj");
      if (session) {
        const parsedSession = JSON.parse(session);
        if (!parsedSession.passkeys || parsedSession.passkeys.length === 0) {
          console.error("No passkeys found in session");
          throw new Error("No passkeys found in session. Please log in again.");
        }
        try {
          console.log("userEmail : ", userEmail);
          console.log("passkey : ", parsedSession.passkeys[0]);
          console.log("challenge : ", challenge);
          console.log("cred : ", cred);
          const response = await fetch("/api/login-verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail,
              passkey: parsedSession.passkeys[0],
              challenge,
              cred,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to Verify Login Challenge");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error verifying passkey :", error);
          throw error;
        }
      }
    }

    const handleOneTapSignin = async (e) => {
      // e.preventDefault();
      if (!passkeyEmail) {
        toast.error("Please enter Your Email");
        return;
      }
      try {
        const challengeRes = await startLoginChallenge();
        const { options } = challengeRes;
        const authRes = await startAuthentication(options);
        console.log("authRes : ", authRes);
        const verifyRes = await verifyLoginChallenge(
          passkeyEmail,
          options.challenge,
          authRes
        );
        console.log("verifyRes : ", verifyRes);
        toast.success("Signed In Succesfully");
      } catch (error) {
        console.error("Error Signin in:", error);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                variant="outline"
              >
                One Tap Sign in
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Email</DialogTitle>
                <DialogDescription>
                  Enter your Email and Login using your Passkey
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    onChange={(e) => setPasskeyEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleOneTapSignin}>
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create new account
            </button>
          </p>
        </div>
      </div>
    );
  };

  const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = async (e) => {
      e.preventDefault();
      if (!email || !password || email === "" || password === "") {
        toast.error("Please enter all Fields");
        return;
      }
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        if (user) {
          toast.error("User already exists");
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        console.log("res : ", res);

        if (res.ok) {
          const form = e.target;
          toast.success("User Registered");
          await saveUserToLocalStorage();
          form.reset();
          router.push("/");
        } else {
          toast.error("User registration failed");
        }
      } catch (error) {
        toast.error("Error during registration");
        console.log("Error during registration : ", error);
      }
    };

    const saveUserToLocalStorage = async () => {
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();
        console.log("user from userexist : ", user);
        localStorage.setItem("userObj", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegistration} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

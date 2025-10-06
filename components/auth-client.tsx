"use client";

import {
  useUser,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function AuthClient() {
  const { isSignedIn } = useUser();

  return (
    <nav className="space-x-2.5">
      {!isSignedIn && (
        <>
          <SignInButton mode="modal">
            <Button size={"sm"} variant={"outline"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size={"sm"}>Sign Up</Button>
          </SignUpButton>
        </>
      )}
      {isSignedIn && (
        <SignOutButton>
          <Button size={"sm"} variant={"destructive"}>
            Sign Out
          </Button>
        </SignOutButton>
      )}
    </nav>
  );
}

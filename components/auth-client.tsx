"use client";

import {
  useUser,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export function NavAuthClient() {
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

export function SidebarAuthClient() {
  const { isSignedIn } = useUser();

  return (
    <nav className="space-x-2.5">
      {!isSignedIn && <></>}
      {isSignedIn && (
        <>
          <Link href="/profile" prefetch={true}>
            <div className="w-full px-5 border-b h-14 flex justify-start items-center hover:bg-input/50">
              <p>Profile</p>
            </div>
          </Link>
          <Link href="/write-article" prefetch={true}>
            <div className="w-full px-5 border-b h-14 flex justify-start items-center hover:bg-input/50">
              <p>Write Article</p>
            </div>
          </Link>
        </>
      )}
    </nav>
  );
}

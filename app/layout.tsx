import type { Metadata } from "next";
import { DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";
import AuthClient from "@/components/auth-client";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Amos",
  description: "Inform the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-normal dark", dmSans.className)}>
        <body>
          <header className="w-full h-20 border-b">
            <MaxWidthWrapper className="h-full flex justify-between items-center border-x px-5">
              <Link
                href="/"
                className={cn(
                  "text-5xl font-semibold",
                  dancingScript.className
                )}
              >
                Amos
              </Link>
              <Suspense
                fallback={<Loader2Icon className="animate-spin" size={20} />}
              >
                <AuthClient />
              </Suspense>
            </MaxWidthWrapper>
          </header>
          <MaxWidthWrapper className="min-h-[calc(100vh-80px)] flex border-x">
            <div className="w-1/4 border-r">
              {NAV_LINKS.map((link) => (
                <Link href={link.href} key={link.id}>
                  <div className="w-full px-5 border-b h-14 flex justify-start items-center hover:bg-input/50">
                    <p>{link.label}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-3/4">{children}</div>
          </MaxWidthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}

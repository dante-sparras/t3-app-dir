import "./globals.css";

import { type Metadata } from "next";

import NextAuthProvider from "~/client/components/next-auth-provider";
import TrpcProvider from "~/client/components/trpc-provider/TrpcProvider";

/*
 * Metadata
 */
export const metadata: Metadata = {
  title: "My App",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full w-full text-white">
      <body className="flex h-full w-full items-center justify-center">
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

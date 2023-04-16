"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="rounded-lg bg-blue-600 p-2 px-2 py-1"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <button
      className="rounded-lg bg-blue-600 p-2 px-2 py-1"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

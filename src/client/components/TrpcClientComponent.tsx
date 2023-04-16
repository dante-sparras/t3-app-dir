"use client";

import { useSession } from "next-auth/react";

import { api } from "~/client/api";

export default function TrpcClientComponent() {
  const { data: session } = useSession();
  const publicMsg = api.example.hello.useQuery({
    text: "world",
  });
  const protectedMsg = api.example.getSecretMessage.useQuery();

  return (
    <div className="w-fit border border-dotted border-blue-600 p-2">
      <p>Public message: {publicMsg.data?.greeting}</p>
      <p>
        Protected message:{" "}
        {protectedMsg.failureCount
          ? "Can't get secret message"
          : protectedMsg.data}
      </p>
    </div>
  );
}

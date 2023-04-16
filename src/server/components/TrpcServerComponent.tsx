import { createApiCaller } from "~/server/create-api-caller";

import { getServerSession } from "../get-server-session";

export default async function TrpcServerComponent() {
  const session = await getServerSession();
  const api = await createApiCaller();
  const publicMsg = await api.example.hello({ text: "world" });

  let protectedMsg = "Can't get secret message";

  if (session) {
    protectedMsg = await api.example.getSecretMessage();
  }

  return (
    <div className="w-fit border border-dotted border-blue-600 p-2">
      <p>Public message: {publicMsg.greeting}</p>
      <p>Protected message: {protectedMsg}</p>
    </div>
  );
}

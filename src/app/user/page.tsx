import LoginButton from "~/client/components/LoginButton";
import TrpcClientComponent from "~/client/components/TrpcClientComponent";
import TrpcServerComponent from "~/server/components/TrpcServerComponent";

export default function Page() {
  return (
    <div className="flex h-fit w-fit flex-col gap-2">
      <h1 className="text-white">USER PAGE</h1>
      <hr />
      <h2 className="text-white">Server component</h2>
      {/* @ts-expect-error Async Server Component */}
      <TrpcServerComponent />
      <h2 className="text-white">Client component</h2>
      <TrpcClientComponent />
      <LoginButton />
    </div>
  );
}

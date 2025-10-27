import { HydrateClient, prefetch, trpc } from "@/src/app/lib/trpc/server";
import { ClientGreeting } from "./components/common/client-greeting";

export default async function Home() {
  prefetch(trpc.hello.queryOptions({ text: "Gianluca" }));

  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}

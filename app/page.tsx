import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";

export default async function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: "Gianluca",
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientGreeting />
    </HydrationBoundary>
  );
}

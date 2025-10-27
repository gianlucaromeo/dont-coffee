import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
// import superjson from 'superjson';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR we usually want the staleTime to be >0 to avoid refetching
        // immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,

        // This will allow us to start prefetching in a server component high
        // up the tree, then consuming that promise in a client component
        // further down.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}

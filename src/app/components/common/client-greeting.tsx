import { caller } from "@/src/app/lib/trpc/server";

export async function ClientGreeting() {
  const greeting = await caller.hello({ text: "Gianluca" });

  return <div>{greeting.greeting}</div>;
}

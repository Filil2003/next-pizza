"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient();

const Devtools = dynamic(
  () => import("./devtools-setup").then((mod) => mod.default),
  { ssr: false }
);

export function TanStackProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <Devtools />}
    </QueryClientProvider>
  );
}

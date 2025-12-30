import "./globals.css";
import { clsx } from "clsx";
import { Nunito } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { Header } from "#/components";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"]
});

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      className={clsx(nunito.variable, "antialiased")}
      lang="ru"
      data-scroll-behavior="smooth"
    >
      <body>
        <NuqsAdapter>
          <Header />
          <main className="min-h-svh">{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}

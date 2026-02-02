import "./globals.css";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { TanStackProvider } from "#/shared/lib/tanstack";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  description:
    "Учебный проект, повторяющий интерфейс и функциональность сервиса Додо Пицца"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={clsx(nunito.variable, "antialiased")}
      lang="ru"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-svh flex flex-col">
        <TanStackProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TanStackProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "#/components";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export const metadata: Metadata = {
  title: "Next Pizza | Главная"
};

export default function HomeLayout({ children, modal }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-svh">{children}</main>
      {modal}
    </>
  );
}

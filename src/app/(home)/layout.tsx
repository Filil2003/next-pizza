import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";
import { Header } from "#/components";

interface Props extends PropsWithChildren {
  modal: ReactNode;
}

export const metadata: Metadata = {
  title: "Next Pizza | Главная"
};

export default function HomeLayout({ children, modal }: Props) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      {modal}
    </>
  );
}

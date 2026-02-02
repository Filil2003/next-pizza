import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Header } from "#/components/Header.tsx";

export const metadata: Metadata = {
  title: "Next Pizza | Оформление заказа"
};

export default function CheckoutLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header className="border-b-gray-200" />
      <main className="grow">{children}</main>
    </>
  );
}

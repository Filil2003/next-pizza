import { Suspense } from "react";
import { Filtration, ProductsGroup, TopBar } from "#/components";
import { Services } from "#/services";
import { Container, Heading } from "#/shared/ui";

export default async function Home() {
  const products = await Services.product.getAll();

  return (
    <>
      <Container className="mt-10">
        <Heading as="h2" className="font-extrabold">
          Все пиццы
        </Heading>
      </Container>

      <TopBar />

      <Container className="flex gap-14 mt-10">
        {/* Filtration */}
        <aside className="basis-[250px] shrink-0">
          <Suspense fallback={<div>Загрузка фильтров...</div>}>
            <Filtration />
          </Suspense>
        </aside>

        {/* Feed */}
        <div className="grow flex flex-col gap-12">
          <ProductsGroup title="Пиццы" products={products} />
        </div>
      </Container>
    </>
  );
}

import { Container } from "#/ui/Container.tsx";
import { Filtration } from "#/ui/Filtration.tsx";
import { Heading } from "#/ui/Heading.tsx";
import { ProductsGroupList } from "#/ui/ProductsGroupList.tsx";
import { TopBar } from "#/ui/TopBar.tsx";
import products from "./mockDb.json";

export default function Home() {
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
          <Filtration />
        </aside>

        {/* Feed */}
        <div className="grow flex flex-col gap-12">
          {products.map(({ id, title, items }) => (
            <ProductsGroupList key={id} title={title} products={items} />
          ))}
        </div>
      </Container>
    </>
  );
}

import { Categories } from "#/ui/Categories.tsx";
import { Container } from "#/ui/Container.tsx";
import { Heading } from "#/ui/Heading.tsx";

export default function Home() {
  return (
    <Container className="mt-10">
      <Heading as="h2" className="font-extrabold">
        Все пиццы
      </Heading>
      <Categories />
    </Container>
  );
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PizzaPage({ params }: Props) {
  const { id } = await params;
  return <div>Pizza page {id}</div>;
}

import { NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

export async function GET() {
  const ingredients = await zen.ingredient.findMany();

  return NextResponse.json(ingredients);
}

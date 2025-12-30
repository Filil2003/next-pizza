export interface IngredientDto {
  id: string;
  name: string;
  price: number;
  imageUrn: string | null;
}

export interface SearchProductDto {
  id: string;
  name: string;
  imageUrn: string;
}

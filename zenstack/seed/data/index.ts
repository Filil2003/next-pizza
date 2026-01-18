import cocktails from "./cocktails.json";
import coffee from "./coffee.json";
import desserts from "./desserts.json";
import drinks from "./drinks.json";
import ingredients from "./ingredients.json";
import pizzas from "./pizzas.json";
import sauces from "./sauces.json";
import snacks from "./snacks.json";

export default {
  categoriesData: [pizzas, snacks, coffee, drinks, cocktails, desserts, sauces],
  ingredientsData: ingredients
} as const;

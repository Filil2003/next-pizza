import cocktails from "./cocktails.json";
import coffee from "./coffee.json";
import desserts from "./desserts.json";
import drinks from "./drinks.json";
import ingredients from "./ingredients.json";
import pizzas from "./pizzas.json";
import sauces from "./sauces.json";
import snacks from "./snacks.json";
import volcanoPizzas from "./volcano-pizzas.json";

export default {
  categoriesData: [
    volcanoPizzas,
    pizzas,
    snacks,
    coffee,
    drinks,
    cocktails,
    desserts,
    sauces
  ],
  ingredientsData: ingredients
} as const;

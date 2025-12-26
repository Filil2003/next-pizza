import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  activeCategory: string;
}

interface Actions {
  setActiveCategory: (category: string) => void;
}

type CategoryStore = State & Actions;

const slice: StateCreator<CategoryStore, [["zustand/devtools", never]]> = (
  setState
) => ({
  activeCategory: "Пиццы",
  setActiveCategory: (category) => setState({ activeCategory: category })
});

export const useCategoryStore = create<CategoryStore>()(
  devtools(slice, { name: "CategoryStore" })
);

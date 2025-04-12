import { create } from "zustand";

export interface ICategory {
  id: string;
  name: string;
  priority: number;
  active: boolean
}

interface CategoryStore {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  addCategory: (category: ICategory) => void;
  updateCategory: (category: ICategory) => void;
  removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  setCategories: (categories) => set({ categories }),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateCategory: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      ),
    })),

  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== id),
    })),
}));

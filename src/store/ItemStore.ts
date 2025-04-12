import { IItem } from "@/interfaces/Item";
import { create } from "zustand";

interface ItemStore {
    selectedItem: IItem | null;
    setSelectedItem: (item: IItem) => void;
    clearSelectedItem: () => void;
    items: IItem[];
    setItems: (items: IItem[]) => void;
    addItem: (item: IItem) => void;
    updateItem: (item: IItem) => void;
    removeItem: (id: string) => void;
    method: "UPDATE"|"CREATE";
    setMethod: (value: "UPDATE"|"CREATE") => void;
}

export const useItemStore = create<ItemStore>((set) => ({
    selectedItem: null,
    items: [],
    method: "CREATE",
    setMethod: (value) => set({method: value}),
    setSelectedItem: (item) => set({ selectedItem: item }),
    clearSelectedItem: () => set({ selectedItem: null }),
    setItems: (items) => set({ items }),
    addItem: (item) =>
        set((state) => ({
            items: [item, ...state.items],
        })),
    updateItem: (item) =>
        set((state) => ({
            items: state.items.map((p) => (p.id === item.id ? item : p)),
        })),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((p) => p.id !== id),
        })),
}));

import { ICategory } from "@/interfaces/Category";
//import { IItem } from "@/interfaces/Item";

export const getCategoriesMock: ICategory[] = [
    { id: '1', name: 'Ensaladas', priority: 2, active: true },
    { id: '2', name: 'Entradas', priority: 2, active: true },
    { id: '3', name: 'Principales', priority: 1, active: true },
    { id: '4', name: 'Sanguches', priority: 3, active: true },
    { id: '5', name: 'Postres', priority: 4, active: true }
];
/*
export const getItemsMock: IItem[] = Array.from({ length: 25 }, (_, i) => {
    const category = getCategoriesMock[i % getCategoriesMock.length];
    return {
        id: `item${i + 1}`,
        name: `${category.name} Producto ${i + 1}`,
        description: `Delicioso ${category.name.toLowerCase()} especial número ${i + 1}.`,
        price: parseFloat((5 + Math.random() * 15).toFixed(2)),
        image: `https://example.com/images/producto_${i + 1}.jpg`,
        category,
        active: true,
        stock: Math.floor(Math.random() * 20) + 1
    };
});*/

/*export function groupItemsByCategory(items: IItem[]): Record<string, IItem[]> {
    const grouped = items.reduce((acc, item) => {
        const categoryName = item.idCategory;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {} as Record<string, IItem[]>);

    const sortedCategories = Object.keys(grouped).sort((a, b) => {
        const categoryA = items.find(item => item.category!.name === a)!.category!.priority || 99;
        const categoryB = items.find(item => item.category!.name === b)!.category!.priority || 99;
        return categoryA - categoryB;
    });

    const sortedGrouped: Record<string, IItem[]> = {};
    sortedCategories.forEach(categoryName => {
        sortedGrouped[categoryName] = grouped[categoryName];
    });

    return sortedGrouped;
}*/
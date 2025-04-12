import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, orderBy, query } from "firebase/firestore";
import { ICategory } from "@/interfaces/Category";
import { db } from "./config";

const categoriesCollection = collection(db, "categories");

export const createNewCategory = async (category: ICategory) => {
  try {
    const newCategoryRef = await addDoc(categoriesCollection, category);
    console.log("Categoría creada con ID:", newCategoryRef.id);
    return newCategoryRef;
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw error;
  }
};

export const updateCategory = async (id: string, updatedData: Partial<ICategory>) => {
  try {
    const categoryDoc = doc(categoriesCollection, id);
    await updateDoc(categoryDoc, updatedData);
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const categoryDoc = doc(categoriesCollection, id);
    await deleteDoc(categoryDoc);
  } catch (error) {
    console.error("Error al eliminar la categoría", error);
    throw error;
  }
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const q = query(categoriesCollection, orderBy("priority", "asc"));

    const snapshot = await getDocs(q);

    const categories: ICategory[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        priority: data.priority,
        active: data.active,
      } as ICategory;
    });

    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    return [];
  }
};

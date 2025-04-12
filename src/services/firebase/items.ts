import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    addDoc,
} from "firebase/firestore";
import { db } from "./config";
import { IItem } from "@/interfaces/Item"

const itemsCollection = collection(db, "items");


export const createNewItem = async (item: IItem) => {
    try {
        const newItemRef = await addDoc(itemsCollection, item);
        console.log("Item creado con ID:", newItemRef.id);
        return newItemRef;
    } catch (error) {
        console.error("Error al crear el item", error);
        throw error;
    }
};

export const updateItem = async (id: string, updatedData: Partial<IItem>) => {
    try {
        const itemDoc = doc(itemsCollection, id);
        await updateDoc(itemDoc, updatedData);
    } catch (error) {
        console.error("Error al actualizar el item", error);
        throw error;
    }
}

export const deleteItem = async (id: string) => {
    try {
        const itemDoc = doc(itemsCollection, id);
        await deleteDoc(itemDoc);
    } catch (error) {
        console.error("Error al eliminar el item", error);
        throw error;
    }
}


export const getAllItems = async (): Promise<IItem[]> => {
    try {
        const snapshot = await getDocs(itemsCollection);
        const items: IItem[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                description: data.description,
                price: data.price,
                //image: data.image,
                idCategory: data.idCategory,
                active: data.active,
            } as IItem;
        });
        return items;
    } catch (error) {
        console.error("Error al obtener los items", error);
        //throw error;
        return []
    }
}

export const getItemsByCategory = async (categoryId: string) => {
    try {
        const q = query(itemsCollection, where("idCategory", "==", categoryId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data() as IItem);
    } catch (error) {
        console.error("Error al obtener los items por categoria", error);
        throw error;
    }
}

/*
La db esta estrucuturada de la siguiente manera: 
 una coleccion "items" que contiene multiples documentos (cada item), su estructura es: 
 IItem {
     id: string;
     name: string;
     description: string;
     price: number;
     image: string;
     category: ICategory;
     active:boolean;
     stock?:number;
 } 
 ICategory {
    id:string;
    name: string;
    priority:1|2|3|4|5;
}
 una coleccion "config"
 Una coleccion "users" que contiene los usuarios 


*/
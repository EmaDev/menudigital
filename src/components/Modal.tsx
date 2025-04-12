"use client"
import { IItem } from "@/interfaces/Item";
import { createNewItem, updateItem } from "@/services/firebase/items";
import { useCategoryStore } from "@/store/CategoryStore";
import { useItemStore } from "@/store/ItemStore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
const Modal = () => {

    const { selectedItem, clearSelectedItem, updateItem: updateItemInStore, method } = useItemStore();
    const {categories} = useCategoryStore();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        idCategory: "",
        price: "",
    });


    useEffect(() => {
        if (selectedItem) {
            setIsVisible(true);
            setFormData({
                name: selectedItem.name,
                description: selectedItem.description,
                price: selectedItem.price.toString(),
                idCategory: selectedItem.idCategory
            });
        } else {
            setIsVisible(false)
        }
    }, [selectedItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        clearSelectedItem();
        setIsVisible(false)
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const item: IItem = {
            ...selectedItem,
            active: true,
            description: formData.description,
            name: formData.name,
            price: Number.parseFloat(formData.price),
            idCategory: formData.idCategory,
            image: "",
        }

        if (selectedItem?.id) {
            await updateItem(selectedItem.id, item);
            updateItemInStore({ ...item });
            clearSelectedItem();
            setIsLoading(false)
            return toast.success("Item actualizado exitosamente");
        }


        const newItemRef = await createNewItem(item as IItem);
        const newItem: IItem = {
            ...(item as IItem),
            id: newItemRef.id,
        };

        const addItem = useItemStore.getState().addItem;
        addItem(newItem);
        clearSelectedItem();
        setIsLoading(false)
        toast.success("Item creado exitosamente");
    }


    return (
        <div className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-30 flex in ${!isVisible && "invisible"}`}>
            <div
                className={`w-full md:w-96 h-full bg-white shadow-md p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${isVisible ? "translate-x-0" : "-translate-x-full"
                    }`}
            >

                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{method === "CREATE" ? "Crear Nuevo item" : "Editar item"}</h2>
                    <button
                        onClick={handleClose}>
                        <IoMdClose size={"32px"} className="text-gray-500" />
                    </button>
                </div>
                <div aria-hidden="true" className="border-t border-gray-100 px-2 mt-2 mb-4"></div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre producto"
                        className="border rounded-md p-2 mb-2"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label className="font-bold">Descripcion</label>
                    <textarea
                        name="description"
                        placeholder="Descripcion"
                        className="border rounded-md p-2 min-h-[100px] mb-2"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                    {/*<input
                            type="text"
                            name="stock"
                            placeholder="Stock"
                            className="border rounded-md p-2 w-1/2"
                            value={formData.stock}
                            onChange={handleChange}
                        />*/}
                    <label className="font-bold">Categoria</label>
                    <select
                        name="idCategory"
                        className="border rounded-md p-2 mb-2"
                        value={formData.idCategory}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona una categoria --</option>
                        
                        {categories.map( category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <label className="font-bold">Precio</label>
                    <input
                        type="text"
                        name="price"
                        placeholder="Precio"
                        className="border rounded-md p-2"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    {/*<input
                        type="date"
                        name="date"
                        className="border rounded-md p-2"
                        value={formData.date}
                        onChange={handleChange}
                    />*/}

                    <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300  w-full flex items-center justify-center gap-2"
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >{method === "CREATE" ? "Crear item" : "Actualizar item"}</button>
                        <button className="transition duration-300 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-md w-full  flex items-center justify-center gap-2"
                            onClick={handleClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
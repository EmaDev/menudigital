"use client";

import React, { useState } from "react";
import { ICategory } from "@/interfaces/Category";
import { useCategoryStore } from "@/store/CategoryStore";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { createNewCategory, deleteCategory, updateCategory } from "@/services/firebase/categories";
import toast from "react-hot-toast";

const CategoryManager = () => {
    const { categories, addCategory, updateCategory: updateCategoryStore, removeCategory } = useCategoryStore();

    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<{
        id: string | undefined;
        name: string;
        priority: number;
        active: boolean;
    }>({
        id: "",
        name: "",
        priority: 1,
        active: true
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value,
        }));
    };

    const handleEdit = (category: ICategory, isNew: boolean = false) => {
        setFormData({
            id: isNew ? undefined : category.id,
            name: isNew ? "" : category.name,
            priority: isNew ? 1 : category.priority,
            active: isNew ? true : category.active
        });
        setIsAdding(true);
    }

    const handleDelete = async (categoryId: string) => {
        try {
            if (confirm("¿Seguro que querés eliminar esta categoría?")) {
                await deleteCategory(categoryId);
                removeCategory(categoryId);
                toast.success("Categoría eliminada exitosamente");
            }
        } catch (error) {
            console.error("Error al eliminar la categoría", error);
            toast.error("Error al eliminar la categoría");
        }
    }

    const handleClose = () => {
        setFormData({
            active: true,
            id: undefined,
            name: "",
            priority: 1
        });
        setIsAdding(false);
    }


    const handleSave = async () => {

        if (!formData.name || !formData.priority) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        const priority: number = formData.priority;
        const newCategory: ICategory = {
            id: formData.id ? formData.id : "",
            name: formData.name,
            priority: priority,
            active: formData.active
        };

        try {
            if (formData.id) {
                // Actualizar
                await updateCategory(newCategory.id, {
                    name: newCategory.name,
                    priority: newCategory.priority,
                    active: newCategory.active
                });

                updateCategoryStore(newCategory);
                toast.success("Categoría actualizada exitosamente");
            } else {
                // Crear nueva
                const newRef = await createNewCategory(newCategory);
                addCategory({ ...newCategory, id: newRef.id });
                toast.success("Categoría creada exitosamente");
            }

            setFormData({ name: "", priority: 1, id: undefined, active: true });
            setIsAdding(false);

        } catch (error) {
            console.error("Error al guardar la categoría", error);
            toast.error("Error al guardar la categoría");
        }
    };



    return (
        <div className="p-2 lg:w-[70%] m-auto ">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Categorias</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => handleEdit({} as ICategory, true)}
                    >+ Agregar categoria</button>
                </div>

                <table className="w-full table-auto ">
                    <thead className="bg-gray-50">
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                            <th className="p-2 text-left">Nombre</th>
                            <th className="p-2 text-center w-16 ">Activo</th>
                            <th className="p-2 text-center">Prioridad</th>
                            <th className="p-2 text-center md:w-48">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length < 1 &&
                            <tr>
                                <td colSpan={4} className="text-center text-gray-500 p-4">
                                    Todavía no hay categorías creadas.
                                </td>
                            </tr>
                        }
                        {categories.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100" >
                                <td className="p-2 whitespace-nowrap text-sm">{item.name}</td>
                                <td className="whitespace-nowrap">
                                    <div className={`w-3 h-3 rounded-full m-auto ${item.active ? "bg-green-700" : "bg-red-500 "}`}></div>
                                </td>
                                <td className="p-2 whitespace-nowrap text-center font-semibold text-sm">{item.priority}</td>
                                <td className="p-2">
                                    <div className='flex items-center gap-2'>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300  w-full flex items-center justify-center gap-2"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <MdEdit />
                                            <span className="hidden md:inline">Editar</span>
                                        </button>
                                        <button className="transition duration-300 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-md w-full  flex items-center justify-center gap-2"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <MdDelete />
                                            <span className="hidden md:inline">Eliminar</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-30 flex ${!isAdding && "invisible"} overflow-hidden`}>
                <div
                    className={`w-full md:w-96 h-full bg-white shadow-md p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${isAdding ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Editar Categoria</h2>
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
                            onChange={handleInputChange}
                        />

                        <label className="font-bold">Prioridad</label>
                        <select
                            name="priority"
                            className="border rounded-md p-2 mb-2"
                            value={formData.priority}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>-- Seleccione prioridad --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <input name="active" type="checkbox" id="check-activo" checked={formData.active}
                                onChange={handleInputChange} />
                            <label className="font-bold" htmlFor="check-activo">¿Está Activo?</label>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300  w-full flex items-center justify-center gap-2"
                                type="button"
                                onClick={handleSave}
                            >Guardar</button>
                            <button className="transition duration-300 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-md w-full  flex items-center justify-center gap-2"
                                onClick={handleClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;

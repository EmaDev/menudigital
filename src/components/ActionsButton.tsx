"use client"
import { IItem } from '@/interfaces/Item'
import { deleteItem } from '@/services/firebase/items';
import { useItemStore } from '@/store/ItemStore';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdEdit, MdDelete } from "react-icons/md";

interface Props {
    item: IItem;
    onDeleted: (id: string) => void;
}

export const ActionsButton = ({ item, onDeleted }: Props) => {

    const { setSelectedItem, setMethod } = useItemStore();
    const [loading, setLoading] = useState(false);

    const handleSelectItem = () => {
        setSelectedItem(item);
        setMethod("UPDATE");
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar este item?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await deleteItem(item.id!);
            toast.success("Item eliminado exitosamente");
            onDeleted(item.id!);
        } catch (error) {
            console.error("Error al eliminar el item", error);
            toast.error("Error al eliminar el item");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className='flex items-center gap-2'>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300  w-full flex items-center justify-center gap-2"
                onClick={handleSelectItem}
            >
                <MdEdit />
                <span className="hidden md:inline">Editar</span>
            </button>
            <button className="transition duration-300 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-md w-full  flex items-center justify-center gap-2"
                onClick={handleDelete}
                disabled={loading}
            >
                <MdDelete />
                <span className="hidden md:inline">Eliminar</span>
            </button>
        </div>
    )
}

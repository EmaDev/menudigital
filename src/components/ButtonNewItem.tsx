"use client"
import { useItemStore } from '@/store/ItemStore'
import React from 'react'

export const ButtonNewItem = () => {

    const { setSelectedItem, setMethod } = useItemStore();
    
    const handleNewItem = () => {
        setSelectedItem({
            active: true,
            idCategory: "",
            description: "",
            image: "",
            name: "",
            price: 0,
        });
        setMethod("CREATE")
    }

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full md:w-fit"
        onClick={handleNewItem}
        >+ Agregar item</button>
    )
}

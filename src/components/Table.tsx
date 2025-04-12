import React from "react";
import Modal from "./Modal";
import { ActionsButton } from "./ActionsButton";
import { ButtonNewItem } from "./ButtonNewItem";
import { useItemStore } from "@/store/ItemStore";
import { useCategoryStore } from "@/store/CategoryStore";


const Table = () => {

  const { items, removeItem } = useItemStore();
  const { categories } = useCategoryStore();

  const handleItemDeleted = (id: string) => {
    removeItem(id)
  };

  const renderCategoryName = (idCategory: string) => {
    const name = categories.find(category => category.id === idCategory)?.name || "No encontrada" ;
    return (
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded m-auto">
        {name}
      </span>
    )
  }

  return (
    <>
      <Modal />
      <div className="mt-6 p-2 lg:w-[70%] m-auto">
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto border border-gray-100">
          <h2 className="font-bold text-lg mb-4">Productos</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            {/*<div className="w-full md:w-1/3 mb-1 md:mb-0">
              <input type="text" placeholder="Buscar..." className="w-full px-4 py-2 rounded-md border 
              border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>*/}
            <ButtonNewItem />
          </div>

          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                <th className="p-2 text-left">item</th>
                <th className="p-2 text-center">Categoria</th>
                <th className="p-2 text-center">Precio</th>
                <th className="p-2 text-left md:w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length < 1 &&
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 p-4">
                    Todavía no hay productos creados.
                  </td>
                </tr>
              }
              {items.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 whitespace-nowrap text-sm">{item.name}</td>
                  <td className="p-2 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded m-auto">
                      {renderCategoryName(item.idCategory)}
                    </span>
                  </td>
                  <td className="p-2 whitespace-nowrap text-center text-sm">${item.price.toLocaleString()}</td>
                  <td className="p-2">
                    <ActionsButton
                      item={item}
                      onDeleted={handleItemDeleted}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
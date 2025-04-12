import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { getAllItems } from "@/services/firebase/items";
import { getAllCategories } from "@/services/firebase/categories";
import logoImg from "../../assets/logo.png";

export default async function Menu() {

    const items = await getAllItems();
    const categories = await getAllCategories()

    return (
        <div className="bg-[#fffbe8] min-h-[100vh]">
            <header className="relative flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-400 to-red-500 shadow-md">
                <Image src={logoImg} alt="San Gusto Logo" className="w-32 h-32 border-white rounded-full shadow-md" />
                <div className="text-right text-sm font-semibold text-white flex flex-col items-end">
                    <p className="flex gap-1 items-center"><FaLocationDot /> Almafuerte 3155</p>
                    <p className="flex gap-1 items-center"><FaWhatsapp /> 11 2469-2647</p>
                    <p className="flex gap-1 items-center"><FaInstagram /> sangusto.ok</p>
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-6">
                {categories.filter((category) => category.active).map(category => (
                    <section key={category.id} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2 flex items-center">
                            {category.name}
                            <span className="flex-1 h-1 mt-3 bg-gradient-to-r from-red-400 to-red-500 ml-4 rounded-3xl"></span>
                        </h2>
                        <div>
                            {items
                                .filter((item) => item.idCategory === category.id)
                                .map((item) => (
                                    <div key={item.id} className="mb-6">
                                        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                                            <div className="font-semibold text-md break-words">
                                                {item.name}
                                            </div>
                                            <div className="border-b border-dashed border-gray-400 w-full h-px"></div>
                                            <div className="font-semibold text-right whitespace-nowrap">
                                                ${item.price.toLocaleString()}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1 ml-1">{item.description}</p>
                                    </div>
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

/* 
<div className="p-6 font-sans text-gray-900 max-w-4xl mx-auto bg-amber-200 grid grid-cols-2 gap-4">
            {categories.map(category => (
                <div key={category.id} className="p-4 bg-amber-300">
                    <div>{category.name}</div>
                    <div>
                        {
                            items[category.name].map( item => (
                                <p key={item.id}>{item.name}</p>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>

*/
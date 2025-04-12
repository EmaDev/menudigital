import Image from "next/image";
import logoImg from "../assets/logo.png";
import { IoLogOut } from "react-icons/io5";
import { logoutUser } from "@/services/firebase/auth";

export const Header = () => {

    const handleLogOut = async() => {
        await logoutUser()
    }

    return (
        <header>
            <div className="h-18 bg-gradient-to-r from-red-400 to-red-600 relative mb-10">
                <button className="w-full flex justify-end p-4 mr-6" onClick={handleLogOut}>
                    <IoLogOut className="text-white text-3xl" />
                </button>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                        <Image src={logoImg} alt="Profile" className="h-full w-full object-cover" width={300} />
                    </div>
                </div>
            </div>
            <h1 className="p-2 font-bold text-xl text-center">Panel de Administración</h1>
        </header>
    )
}

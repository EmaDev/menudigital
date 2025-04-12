"use client"

import Image from 'next/image';
import logoImg from "../assets/logo.png";
import { loginWithEmailPassword, loginWithGoogle, signUpWithEmailPassword } from '@/services/firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Login = () => {

    const [form, setForm] = useState({ email: "", password: "", password2: "" });
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isRegister) {
                if (form.password.trim() !== form.password2.trim()) {
                    toast.error("Las contraseñas son diferentes");
                } else {
                    await signUpWithEmailPassword(form.email, form.password);
                    toast.success("Bienvenido!");
                }
            } else {
                await loginWithEmailPassword(form.email, form.password);
                toast.success("Bienvenido!");
            }
        } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error);
                    toast.error(error.message || "Error al iniciar sesión");
                } else {
                    console.error("Error desconocido", error);
                    throw new Error("Error desconocido en login con Google");
                }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        await loginWithGoogle()
    }

    return (
        <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-red-400 to-red-500 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
                <div className="flex justify-center">
                    <Image src={logoImg} alt="San Gusto Logo" className="w-32" width={300} />
                </div>

                <h2 className="text-center text-3xl font-bold mb-3">{isRegister ? "Registrate" : "Ingresar"}</h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded-md p-2 focus:outline-none"
                            placeholder="Tu email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            className="w-full border border-black rounded-md p-2 focus:outline-none"
                            placeholder="Tu contraseña"
                            required
                        />
                    </div>
                    {
                        isRegister &&
                        <div>
                            <label className="block text-sm font-medium mb-1">Repetir contraseña</label>
                            <input
                                type="password"
                                name="password2"
                                value={form.password2}
                                onChange={handleInputChange}
                                className="w-full border border-black rounded-md p-2 focus:outline-none"
                                placeholder="Tu contraseña"
                                required
                            />
                        </div>
                    }

                    <button
                        type="submit"
                        disabled={loading}
                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-red-400 focus:bg-blue-50 active:bg-blue-100 bg-red-500"
                    >
                        <div className="relative flex items-center space-x-4 justify-center">
                            <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-white text-white sm:text-base">
                                {loading ? "Cargando..." : isRegister ? "Registrar" : "Ingresar"}
                            </span>
                        </div>
                    </button>

                    <div className="flex items-center mb-4">
                        <div className="flex-grow border-t border-black"></div>
                        <span className="mx-2 text-sm text-black">o ingresar con</span>
                        <div className="flex-grow border-t border-black"></div>
                    </div>

                    <button
                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                        type='button'
                        onClick={handleGoogle}
                    >
                        <div className="relative flex items-center space-x-4 justify-center">

                            <FcGoogle className="absolute left-0 w-12 text-2xl" />
                            <span
                                className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continuar
                                con Google
                            </span>
                        </div>
                    </button>

                    {
                        isRegister ?
                            <p className="text-center text-sm mt-6">
                                Ya tenés cuenta?{' '}
                                <label className="underline" onClick={() => setIsRegister(false)}>Ingresa</label>
                            </p>
                            :
                            <p className="text-center text-sm mt-6">
                                No tenes cuenta?{' '}
                                <label className="underline" onClick={() => setIsRegister(true)}>Registrate</label>
                            </p>
                    }
                </form>
            </div>
        </div>
    );
}

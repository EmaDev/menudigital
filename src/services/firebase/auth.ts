import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";
import { useAuthStore } from "@/store/authStore";
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        console.log("Usuario logueado con Google:", {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });

        return user;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message || "Error en login con Google");
        } else {
            console.error("Error desconocido", error);
            throw new Error("Error desconocido en login con Google");
        }
    }
};

export const signUpWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        console.log("Usuario registrado:", {
            uid: user.uid,
            email: user.email,
        });

        return user; // 🔥 Devolvemos el usuario
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error en registro:", error.message);
            throw new Error(error.message || "Error al registrar usuario");
        } else {
            console.error("Error desconocido", error);
            throw new Error("Error desconocido en login con Google");
        }
    }
};

export const loginWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        console.log("Usuario logueado:", {
            uid: user.uid,
            email: user.email,
        });

        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error en login:", error.message);
            throw new Error(error.message || "Error al iniciar sesión");
        } else {
            console.error("Error desconocido", error);
            throw new Error("Error desconocido en login con Google");
        }
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);

        const setUser = useAuthStore.getState().setUser;
        setUser(null);

        console.log("Sesión cerrada correctamente.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al cerrar sesión:", error.message);
            throw new Error(error.message || "Error al cerrar sesión");
        } else {
            console.error("Error desconocido", error);
            throw new Error("Error desconocido en login con Google");
        }
    }
};
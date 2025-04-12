"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Login } from "./Login";
import { useAuthStore } from "@/store/authStore";
import { useCategoryStore } from "@/store/CategoryStore";
import { useItemStore } from "@/store/ItemStore";
import { auth } from "@/services/firebase/config";
import { getAllCategories } from "@/services/firebase/categories";
import { getAllItems } from "@/services/firebase/items";
import { ClientWrapper } from "./ClientWrapper";

const AuthGate = () => {
  const { user, setUser } = useAuthStore();
  const { setCategories } = useCategoryStore();
  const { setItems } = useItemStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // 🔥 Cargar datos solo si está logueado
        const [categories, items] = await Promise.all([
          getAllCategories(),
          getAllItems(),
        ]);
        setCategories(categories);
        setItems(items);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setCategories, setItems]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  return user ? <ClientWrapper /> : <Login />;
};

export default AuthGate;

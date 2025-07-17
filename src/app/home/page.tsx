"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (!isLogged) router.push("/login");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo à GameZone!</h1>
      <p className="text-lg">Sua página inicial está em construção.</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition"
      >
        Logout (sair)
      </button>
    </div>
  );
}

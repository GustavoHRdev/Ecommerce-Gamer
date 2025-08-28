"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Digite um e-mail válido.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = storedUsers.some(
      (storedUser: { email: string }) => storedUser.email === email
    );

    if (emailExists) {
      setError("E-mail já cadastrado.");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    alert("Cadastro realizado com sucesso! Agora faça login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg max-w-md w-full shadow-lg">
        <h1 className="text-3xl text-cyan-400 font-bold mb-6 text-center">Cadastro</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          {error && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 p-3 rounded font-bold transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

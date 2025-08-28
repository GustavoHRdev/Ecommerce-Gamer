
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";


// Componente do título animado
const AnimatedTitle = () => {
  const text = "GAMEZONE";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <h1 className="text-5xl sm:text-6xl font-extrabold text-cyan-400 font-mono tracking-widest mb-10 select-none">
      {displayed}
      <span className="blink">|</span>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </h1>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) router.push("/home");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = storedUsers.find(
      (u: { email: string; password: string }) =>
        (u.email === user || u.email === user.trim()) && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("isLogged", "true");
      router.push("/home");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1713630019375-f483a9729a8b?fm=jpg&q=60&w=3000')",
      }}
    >
      <div className="bg-black bg-opacity-80 p-10 rounded-xl max-w-md w-full mx-4">
        <AnimatedTitle />

       <div className="flex justify-center gap-6 mb-8">

          <Link
            href="/login/register"
            className="px-8 py-3 border-2 border-cyan-400 rounded-lg font-bold text-cyan-400 hover:bg-cyan-600 hover:border-cyan-700 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Usuário"
            aria-label="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              aria-label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              className="absolute right-3 top-3 text-cyan-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 p-3 rounded font-bold tracking-wide transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-10 text-center text-cyan-400">
          <p className="mb-3 font-semibold">Me siga nas redes sociais</p>
          <div className="flex justify-center space-x-10 text-3xl">
            <a
              href="https://github.com/GustavoHRdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/gustavohrdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/5543996448129"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-white transition-colors"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

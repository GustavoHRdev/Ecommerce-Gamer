"use client";

export default function HeroSection() {
  return (
    <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
        Bem-vindo à GameZone
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-6 text-gray-200">
        Sua loja gamer com os melhores preços, produtos exclusivos e estilo futurista.
      </p>
      <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition">
        Ver Produtos
      </button>
    </section>
  );
}

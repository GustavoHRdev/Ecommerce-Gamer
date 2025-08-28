
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./components/HeroSection";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  // Estado para exibir o modal do carrinho
  const [showCarrinho, setShowCarrinho] = useState(false);
  // Estado do carrinho
  const [carrinho, setCarrinho] = useState<Array<{id:number;nome:string;preco:number;imagem:string;quantidade:number}>>([]);
  const [msgCarrinho, setMsgCarrinho] = useState("");

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (!isLogged) router.push("/login");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    router.push("/login");
  };

  // Função para alterar quantidade
  const alterarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return;
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  // Função para remover item do carrinho
  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  // Mock de produtos
  const produtos = [
    {
      id: 1,
      nome: "Mouse Gamer RGB",
      preco: 199.99,
      imagem: "/window.svg",
      descricao: "Mouse com alta precisão e iluminação RGB personalizável."
    },
    {
      id: 2,
      nome: "Teclado Mecânico",
      preco: 349.90,
      imagem: "/globe.svg",
      descricao: "Teclado mecânico com switches azuis e design compacto."
    },
    {
      id: 3,
      nome: "Headset Surround",
      preco: 299.00,
      imagem: "/vercel.svg",
      descricao: "Headset com som surround 7.1 e microfone removível."
    },
    {
      id: 4,
      nome: "Monitor 144Hz",
      preco: 1299.00,
      imagem: "/next.svg",
      descricao: "Monitor gamer 24'' Full HD com taxa de atualização de 144Hz."
    }
  ];

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = (produto: typeof produtos[0]) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
    setMsgCarrinho(`${produto.nome} adicionado ao carrinho!`);
    setTimeout(() => setMsgCarrinho(""), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroSection />

      <div className="max-w-5xl mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400">Catálogo de Produtos</h2>
          <button
            onClick={() => setShowCarrinho(true)}
            className="bg-cyan-700 hover:bg-cyan-800 px-6 py-2 rounded font-bold text-white shadow-lg"
          >
            Ver carrinho ({carrinho.reduce((acc, item) => acc + item.quantidade, 0)})
          </button>
        </div>
        {/* Modal do carrinho */}
        {showCarrinho && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full relative">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Seu Carrinho</h3>
              {carrinho.length === 0 ? (
                <p className="text-gray-300 text-center">O carrinho está vazio.</p>
              ) : (
                <ul className="divide-y divide-gray-700 mb-6">
                  {carrinho.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-4">
                        <Image src={item.imagem} alt={item.nome} width={48} height={48} className="w-12 h-12" />
                        <div>
                          <span className="font-semibold text-cyan-300">{item.nome}</span>
                          <div className="text-gray-400 text-sm">R$ {item.preco.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                          className="bg-cyan-700 px-2 rounded text-white font-bold"
                        >-</button>
                        <span className="font-bold text-cyan-400">{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                          className="bg-cyan-700 px-2 rounded text-white font-bold"
                        >+</button>
                        <button
                          onClick={() => removerDoCarrinho(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700 font-bold"
                        >Remover</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between items-center mt-6">
                <span className="font-bold text-lg text-cyan-400">Total: R$ {carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)}</span>
                <button
                  onClick={() => setShowCarrinho(false)}
                  className="bg-red-600 px-6 py-2 rounded font-bold text-white hover:bg-red-700"
                >Fechar</button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-black bg-opacity-80 rounded-lg p-6 flex flex-col items-center shadow-lg">
              <Image src={produto.imagem} alt={produto.nome} width={96} height={96} className="w-24 h-24 mb-4" />
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">{produto.nome}</h3>
              <p className="text-gray-300 mb-2">{produto.descricao}</p>
              <span className="text-cyan-400 font-bold text-lg mb-4">R$ {produto.preco.toFixed(2)}</span>
              <button onClick={() => adicionarAoCarrinho(produto)} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded font-bold transition-colors">Adicionar ao carrinho</button>
            </div>
          ))}
        </div>

        {/* Mensagem de produto adicionado */}
        {msgCarrinho && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-cyan-700 text-white px-6 py-3 rounded shadow-lg z-50 font-bold">
            {msgCarrinho}
          </div>
        )}

        <div className="flex flex-col items-center justify-center mt-10 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Logout (sair)
          </button>
        </div>
      </div>
    </main>
  );
}

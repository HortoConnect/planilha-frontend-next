import React from "react";
import SearchForm from "@/components/SearchForm";
import produtosMock, { produtosMockRandom } from "../../../mock/products";
import Link from "next/link";
import SearchFilter from "@/components/SearchFilter";
import Image from "next/image";
import Favoritos from "@/components/Favoritos";
import Favorito from "@/components/Favorito";
import logo from "../../../assets/imgs/logo.png";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const { query, category, subcategory } = await searchParams;

  const filteredProducts = produtosMockRandom.filter((produto) => {
    const searchQuery = query?.toLowerCase() || "";
    const productName = produto.nome.toLowerCase();

    const matchesSearch = productName.includes(searchQuery);
    const matchesCategory = category
      ? produto.category === category.toLowerCase()
      : true;
    const matchesSubcategory = subcategory
      ? produto.subcategory === subcategory
      : true;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <main>
      <div className="container mx-auto px-4 mt-10">
        {/* Hero Section */}
        <div className="mb-2 text-white">
          <div className="flex items-center justify-between">
            <Link href="/produtos">
              <Image src={logo} alt="Logo" className="w-[100px] h-auto" />
            </Link>
            <Favoritos query={query} />
          </div>
          <p className="text-lg font-semibold text-green-600">
            Encontre os melhores produtos frescos direto dos produtores
          </p>
        </div>

        {/* Search Form */}
        <div className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-4 sm:px-0">
          <SearchForm query={query} />
          <SearchFilter />
        </div>

        <section className="py-10 max-w-[1200px] mx-auto">
          <p className="text-2xl font-nunito font-semibold mb-5">
            {query
              ? `Resultados de pesquisa para "${query}"`
              : "Todos os produtos disponíveis"}
          </p>
          <ul
            className={
              filteredProducts.length > 0
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "grid grid-cols-1"
            }
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((produto) => (
                <Link
                  key={produto._id}
                  href={`/produto/${produto._id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full h-48 object-cover transition-transform duration-200"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {produto.nome}
                    </h3>

                    <div className="favorito-container">
                      <Favorito />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-normal text-base">
                {query
                  ? `Nenhum produto encontrado para ${query} 😔`
                  : `Nenhum produto encontrado para ${
                      subcategory || category
                    } 😔`}
              </p>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}

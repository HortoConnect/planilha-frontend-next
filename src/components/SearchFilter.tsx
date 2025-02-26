"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronDown } from "lucide-react";

const categories = [
  {
    id: "frutas",
    name: "Frutas",
    subcategories: [
      "Banana",
      "Maçã",
      "Laranja",
      "Uva",
      "Morango",
      "Abacaxi",
      "Manga",
      "Pêra",
      "Mamão",
      "Melancia",
    ],
  },
  {
    id: "legumes",
    name: "Legumes",
    subcategories: [
      "Tomate",
      "Cenoura",
      "Batata",
      "Abobrinha",
      "Berinjela",
      "Pimentão",
      "Pepino",
      "Chuchu",
      "Beterraba",
      "Mandioca",
    ],
  },
  {
    id: "verduras",
    name: "Verduras",
    subcategories: [
      "Alface",
      "Couve",
      "Espinafre",
      "Rúcula",
      "Agrião",
      "Acelga",
      "Repolho",
      "Brócolis",
      "Couve-flor",
      "Hortelã",
    ],
  },
];

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [showFilters, setShowFilters] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentSubcategory = searchParams.get("subcategory") || "";

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (name === "category" && value === "" || name === "subcategory" && value === "") {
      params.delete("subcategory");
      params.delete("category");
    }

    if (value) {
      params.set(name, value);
      if (name === "category") params.delete("subcategory");
    } else {
      params.delete(name);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col w-full relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 self-start mb-2"
      >
        <Filter />
        <span>Filtros</span>
        <ChevronDown
          className={`h-5 w-5 transform transition-transform duration-200 ${
            showFilters ? "rotate-180" : ""
          }`}
        />
      </button>

      {showFilters && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentCategory}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              paddingLeft: "15px",
            }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategoria
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentSubcategory}
              onChange={(e) =>
                handleFilterChange("subcategory", e.target.value)
              }
              disabled={!currentCategory}
            >
              <option value="">Todas as Subcategorias</option>
              {currentCategory &&
                categories
                  .find((cat) => cat.id === currentCategory)
                  ?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, X, Image as ImageIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../assets/imgs/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "@/components/ui/button";
import ProdutoOrdersTable from "@/components/produto-orders-table";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  price: string;
}

const page = () => {
  const params = useParams();
  const fornecedorId = params.id;

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Banana Prata",
      category: "Frutas",
      subcategory: "Banana",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop",
      price: "3,99",
    },
    {
      id: 2,
      name: "Maçã Fuji",
      category: "Frutas",
      subcategory: "Maçã",
      image:
        "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop",
      price: "6,99",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: "",
    subcategory: "",
    name: "",
    price: "",
    image: "",
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.image
    ) {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts([...products, { ...(newProduct as Product), id: newId }]);
      setNewProduct({
        category: "",
        subcategory: "",
        name: "",
        price: "",
        image: "",
      });
      setImagePreview("");
      setShowNewProductForm(false);
    }
  };

  const handleImagePreview = (url: string) => {
    setImagePreview(url);
    setNewProduct({ ...newProduct, image: url });
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <Card>
        <Card>
          <CardHeader className="px-7">
            <Link
              href="/fornecedor"
              className="text-xs text-green-500 flex items-center gap-2 mb-5"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar a lista de fornecedores
            </Link>
            <CardTitle className="flex items-center justify-between">
              <Image src={logo} alt="Logo" className="w-[100px] h-auto" />
              <Button onClick={() => setShowNewProductForm(true)}>
                Novo produto
              </Button>
            </CardTitle>
            <CardDescription>
              Gerenciar Produtos do fornecedor {fornecedorId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProdutoOrdersTable />
          </CardContent>
        </Card>
      </Card>

      {/* Modal de Novo Produto */}
      {showNewProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="p-6 border border-b-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Novo Produto
                </h2>
                <button
                  onClick={() => {
                    setShowNewProductForm(false);
                    setImagePreview("");
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Produto
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <div className="relative">
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none transition-all pr-10"
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Legumes">Legumes</option>
                        <option value="Verduras">Verduras</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategoria
                    </label>
                    <input
                      type="text"
                      value={newProduct.subcategory}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          subcategory: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço (R$)
                    </label>
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL da Imagem
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="URL"
                        value={newProduct.image}
                        onChange={(e) => handleImagePreview(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                        <p>Preview da imagem</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleAddProduct}
                  className=" bg-green-600"
                  disabled={
                    !newProduct.name ||
                    !newProduct.category ||
                    !newProduct.price ||
                    !newProduct.image
                  }
                >
                  <span>Salvar Produto</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

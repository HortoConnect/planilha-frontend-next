"use client"

import { useState } from "react";
import { MessageCircle, ArrowLeft, Star, Package, Scale } from 'lucide-react';

const DetailsProduct = ({produto} : any) => {

  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const fornecedores = produto.fornecedores;

  const qualities = ['Premium', 'Padrão', 'Econômico'];
  const sizes = ['Pequeno', 'Médio', 'Grande'];

  return (
    <>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagem do Produto */}
          <div className="relative h-[400px]">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Detalhes e Filtros */}
          <div className="p-8 space-y-6">            
            {/* Filtros */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualidade
                </label>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione a qualidade</option>
                  {qualities.map(quality => (
                    <option key={quality} value={quality}>{quality}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamanho
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione o tamanho</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Fornecedores */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fornecedores Disponíveis</h2>
        <div className="space-y-4">
          {fornecedores.map((fornecedor : any) => (
            <div
              key={fornecedor.nome}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold text-gray-800">{fornecedor.nome}</h3>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{fornecedor.avaliacao}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>Entrega em {fornecedor.tempoEntrega} horas</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Scale className="h-4 w-4" />
                      <span>Pedido mínimo: {fornecedor.pedidoMinimo}kg</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">Volume disponível: {fornecedor.volumeDisponivel}kg</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Preço por kg</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {fornecedor.precoPorKg.toFixed(2)}
                    </p>
                  </div>
                  <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Contatar</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DetailsProduct

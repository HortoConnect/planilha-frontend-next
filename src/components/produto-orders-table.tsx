"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "../components/ui/badge";
import Image from "next/image";
import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  price: string;
}

export default function ProdutoOrdersTable() {
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

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Imagem</TableHead>
          <TableHead className="table-cell">Nome</TableHead>
          <TableHead className="table-cell">Categoria</TableHead>
          <TableHead className="table-cell">Subcategoria</TableHead>
          <TableHead className="table-cell">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>
              <div className="font-medium">{product.name}</div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {product.category}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {product.subcategory}
              </Badge>
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="flex gap-2">
              <button
                title="Editar"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                title="Excluir"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

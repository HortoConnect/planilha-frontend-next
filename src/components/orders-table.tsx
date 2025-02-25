"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrdersTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const fornecedores = [
    {
      id: 1,
      nome: "Fornecedor A",
      email: "fornecedorA@example.com",
      status: "Ativo",
      cnpj: "12.345.678/0001-90",
    },
    {
      id: 2,
      nome: "Fornecedor B",
      email: "fornecedorB@example.com",
      status: "Ativo",
      cnpj: "98.765.432/0001-01",
    },
    {
      id: 3,
      nome: "Fornecedor C",
      email: "fornecedorC@example.com",
      status: "Ativo",
      cnpj: "11.222.333/0001-02",
    },
    {
      id: 4,
      nome: "Fornecedor D",
      email: "fornecedorD@example.com",
      status: "Cancelado",
      cnpj: "44.555.666/0001-03",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Fornecedor</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell">CNPJ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fornecedores.map((fornecedor) => (
          <TableRow key={fornecedor.id}>
            <TableCell>
              <Link href={`/fornecedor/${fornecedor.id}`} className="block">
                <div className="font-medium">{fornecedor.nome}</div>
                <div className="hidden md:inline text-sm text-[#64748b]">
                  {fornecedor.email}
                </div>
              </Link>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {fornecedor.status}
              </Badge>
            </TableCell>
            <TableCell>{fornecedor.cnpj}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

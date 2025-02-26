import { Suspense } from 'react';
import logo from "../../../assets/imgs/logo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import Image from "next/image";
import SearchInput from "@/components/search-input";
import OrdersTable from "@/components/orders-table";

const Page = () => {
  return (
    <div className="container mx-auto px-4 mt-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>
            <Image src={logo} alt="Logo" className="w-[100px] h-auto" />
          </CardTitle>
          <CardDescription>Listagem de fornecedores</CardDescription>
          <div className="flex pt-10 gap-4">
            {/* Adicione Suspense aqui */}
            <Suspense fallback={<div>Carregando busca...</div>}>
              <SearchInput/>
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Carregando tabela...</div>}>
            <OrdersTable/>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
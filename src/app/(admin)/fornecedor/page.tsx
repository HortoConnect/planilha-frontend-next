import logo from "../../../assets/imgs/logo.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import Image from "next/image";
import SearchInput from "@/components/search-input";
import OrdersTable from "@/components/orders-table";

const page = () => {
  return (
    <div className="container mx-auto px-4 mt-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>
            <Image src={logo} alt="Logo" className="w-[100px] h-auto" />
          </CardTitle>
          <CardDescription>Listagem de fornecedores</CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput/>
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable/>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

import Link from "next/link";
import produtosMock from "@/mock/products";
import DetailsProduct from "../../../../components/DetailsProduct";
import { ArrowLeft } from 'lucide-react';


const page =  async ({ params }: { params: Promise<{ id: string }> })=> {

  const id = (await params).id
  const produto = produtosMock.find(produto => produto._id === id);

  console.log(produto)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar para lista de produtos</span>
      </Link>

      <DetailsProduct produto={produto}/>
    
    </div>
  ); 
}

export default page

"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "../components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Favoritos = ({ query }: { query?: string }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );
      setRecentSearches(searches);
    }
  }, []);

  useEffect(() => {
    if (query && typeof window !== "undefined") {
      const pesquisa = query.toLowerCase();
      
      const isPesquisaExistente = recentSearches.some(search => search === pesquisa);
      
      if (!isPesquisaExistente) {
        const updatedSearches = [pesquisa, ...recentSearches].slice(0, 5); 
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        setRecentSearches(updatedSearches);
      }
    }
  }, [query]);

  return (
    <>
      <DropdownMenu open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenuTrigger asChild>
          <Button className={cn("bg-green-500 text-gray-100 hover:bg-green-600")}>Favotiros</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {recentSearches.length > 0 ? (
            recentSearches.map((search, index) => (
              <DropdownMenuLabel key={index} className="cursor-pointer">
                <Link href={`/produtos?query=${search}`}>
                {search}
                </Link>
              </DropdownMenuLabel>
            ))
          ) : (
            <p className="text-sm">Nenhuma pesquisa recente.</p>
          )}
          <DropdownMenuLabel></DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Favoritos;

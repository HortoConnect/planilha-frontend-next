"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term.toLocaleLowerCase());

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", term.toLocaleLowerCase());
      replace(`${pathname}?${params.toString()}`);
    }, 500); 

    setTypingTimeout(timeout);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] py-5"
        onChange={(e) => handleSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}

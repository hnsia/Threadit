"use client";

import { useQuery } from "@tanstack/react-query";
import { Command, CommandInput } from "./ui/Command";
import { useState } from "react";
import axios from "axios";
import { Prisma, Subthreadit } from "@prisma/client";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as Subthreadit & {
        _count: Prisma.SubthreaditCountOutputType;
      };
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />
    </Command>
  );
};

export default SearchBar;

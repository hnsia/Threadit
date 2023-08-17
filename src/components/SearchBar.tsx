"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { useCallback, useState } from "react";
import axios from "axios";
import { Prisma, Subthreadit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";

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
      return data as (Subthreadit & {
        _count: Prisma.SubthreaditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  const request = debounce(() => {
    refetch();
  }, 500);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const router = useRouter();

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />

      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map((subthreadit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/t/${e}`);
                    router.refresh();
                  }}
                  key={subthreadit.id}
                  value={subthreadit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/t/${subthreadit.name}`}>t/{subthreadit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;

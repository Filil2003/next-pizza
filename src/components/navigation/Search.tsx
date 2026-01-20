"use client";

import { Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useClickAway } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";
import { search } from "./api";

/* ===== Typing props ===== */
interface Props {
  className?: string;
}

/* ===== Search component ===== */
export const Search = ({ className }: Props) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<
    Awaited<ReturnType<typeof search>>
  >([]);
  const searchRef = useRef(null);

  useClickAway(searchRef, () => setIsFocused(false));

  useEffect(() => {
    if (query) void search(query).then(setSuggestions);
  }, [query]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchValue = event.currentTarget.value
      .trimStart()
      .replace(/\s{2,}/g, " ");
    setQuery(newSearchValue);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleClick() {
    setIsFocused(false);
    setQuery("");
    setSuggestions([]);
  }

  // TODO: Добавить анимацию печатания категорий: Найти пиццу... Найти кофе... и так далее
  return (
    <>
      {isFocused && (
        <div className="fixed inset-0 bg-black/50 z-30" role="presentation" />
      )}

      <search className={cn("relative z-30", className)} ref={searchRef}>
        <form className="relative h-full">
          <SearchIcon className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 h-[1.8cap]" />
          <input
            className="rounded-2xl outline-none h-full w-full bg-gray-100 pl-11"
            type="search"
            name="query"
            placeholder="Найти пиццу..."
            autoComplete="off"
            value={query}
            aria-autocomplete="list"
            aria-controls="suggestions"
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </form>
        {suggestions.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              isFocused && "visible opacity-100 top-12"
            )}
            id="suggestions"
            role="listbox"
          >
            {suggestions.map((suggestion) => (
              <div key={suggestion.slug}>
                <Link
                  className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                  role="option"
                  href={`/product/${suggestion.slug}`}
                  onClick={handleClick}
                >
                  <div className="relative aspect-square w-8">
                    <Image
                      src={suggestion.showCaseImageUrl}
                      alt={suggestion.name}
                      sizes="32px"
                      fill
                    />
                  </div>
                  <span>
                    {suggestion.name
                      .split(new RegExp(`(${query})`, "gi"))
                      .map((part, index) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <mark className="font-bold" key={index.valueOf()}>
                            {part}
                          </mark>
                        ) : (
                          part
                        )
                      )}
                  </span>
                  <span className="text-gray-500">
                    От {suggestion.minPrice / 100}₽
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </search>
    </>
  );
};

import { createParser, type SingleParser } from "nuqs";

export function parseAsSet<T>(itemParser: SingleParser<T>, separator = ",") {
  return createParser<Set<T>>({
    parse(queryString) {
      if (queryString === "") return new Set<T>();
      const items = queryString
        .split(separator)
        .map(itemParser.parse)
        .filter((item): item is T => item != null);
      return new Set<T>(items);
    },
    serialize(value) {
      return Array.from(value)
        .map((item) =>
          itemParser.serialize ? itemParser.serialize(item) : String(item)
        )
        .join(separator);
    }
  });
}

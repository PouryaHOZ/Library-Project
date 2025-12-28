import { BOOK_CATEGORIES, BookCategory } from "./placeholder";

export function isBookCategory(value: string): value is BookCategory {
  return (
    typeof value === "string" &&
    BOOK_CATEGORIES.includes(value as BookCategory)
  );
}
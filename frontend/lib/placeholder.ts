export type bookType = {
    book_id: number,
    title: string,
    author: string,
    category: BookCategory,
    total_count: number,
    available_count: number
}

export const BOOK_CATEGORIES = [
  "رمان",
  "تاریخ",
  "ادبیات",
  "تخیلی",
  "روان‌شناسی",
  "علمی",
  "فلسفه",
  "کودک و نوجوان",
  "زندگی‌نامه",
  "دینی",
  "هنر",
  "شعر",
  "سیاسی",
  "اقتصادی",
  "کامپیوتر",
  "حقوق",
  "پزشکی",
  "آموزشی",
  "زبان",
  "داستان کوتاه",
  "سفرنامه",
  "علوم اجتماعی",
] as const;

export type BookCategory = typeof BOOK_CATEGORIES[number];

export type userType = {
  username: string,
  fullname: string,
  role: "member" | "librarian" | "admin"
}
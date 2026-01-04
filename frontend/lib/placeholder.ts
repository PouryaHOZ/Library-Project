export type bookType = {
    book_id: string,
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
  full_name: string,
  role: userRoleType,
  is_active: boolean
}

export type userCreationType = {
  username: string,
  password: string,
  full_name: string,
  role: userRoleType,
  is_active: boolean
}

export type userRoleType = "member" | "librarian" | "admin"
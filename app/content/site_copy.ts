// Every visible interface string lives here. The site is Turkish only, so
// these are plain strings rather than {en, tr} pairs. Book and chapter
// titles live in books.ts; chapter text in app/content/books/.

export const siteCopy = {
  name: "Neawe",
  description: "Neawe — Sait Kaplan.",
  comingSoon: "Yakında",
  skipLink: "İçeriğe geç",
  booksTitle: "Kitaplar",
  noBooks: "Henüz yayımlanmış bir kitap yok.",
  draftBadge: "taslak",
  backToBooks: "Kitaplar",
  chapterNavLabel: "Bölümler arasında",
  notFoundTitle: "404 — Sayfa bulunamadı",
  notFoundDescription: "Aradığın sayfa bulunamadı.",
  homeLink: "Ana sayfa",
  authorName: "Sait Kaplan",
} as const;

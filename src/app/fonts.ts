import { Aboreto, Manrope } from "next/font/google";

// Aboreto: тільки для імені (персональна айдентика). Лише латиниця.
export const aboreto = Aboreto({
  variable: "--font-aboreto",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

// Manrope: увесь інший текст. Кирилиця потрібна, інакше буде запасний шрифт.
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const fontVariables = `${aboreto.variable} ${manrope.variable}`;

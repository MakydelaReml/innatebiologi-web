import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { es } from "./i18n/es";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = es.metadata;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}

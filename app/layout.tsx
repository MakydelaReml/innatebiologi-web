import type { Metadata } from "next";
import type { ReactNode } from "react";
import { es } from "./i18n/es";
import "./globals.css";

export const metadata: Metadata = es.metadata;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

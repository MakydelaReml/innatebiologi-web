import type { Metadata } from "next";
import type { ReactNode } from "react";
import { es } from "./i18n/es";
import "./globals.css";

export const metadata: Metadata = {
  ...es.metadata,
  icons: {
    icon: "/ISOTIPO_favicon_256.png",
    shortcut: "/ISOTIPO_favicon_256.png",
    apple: "/ISOTIPO_master.png"
  }
};

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

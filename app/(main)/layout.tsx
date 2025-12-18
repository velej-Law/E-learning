import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";
// IMPORTANTE: Importamos el Header que acabamos de crear
import Header from "@/components/layout/Header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mare Vitae International",
  description: "Plataforma de eLearning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased bg-bg-mist`}>
        
        {/* Aquí va nuestro componente Header */}
        <Header />

        <main className="min-h-screen">
            {children}
        </main>
        
      </body>
    </html>
  );
}
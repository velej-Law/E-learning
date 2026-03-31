import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logicube | Desarrollo y Asesoría TI",
  description: "Plataforma de Desarrollo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${syne.variable} antialiased bg-signal-white`}>
        
        

        <main className="min-h-screen">
            {children}
        </main>
        
      </body>
    </html>
  );
}
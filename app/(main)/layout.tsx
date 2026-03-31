import Header from "@/components/layout/Header";
import Preloader from "@/components/layout/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área Personal | Logicube",
  description: "Panel de Desarrollo y Asesoría TI",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Preloader />
      {/* El Header corporativo y navegación va en este sub-layout 
          para que no afecte la vista previa del login */}
      <Header />
      
      {/* Contenido dinámico del sub-routing de /(main) */}
      <main className="min-h-screen">
          {children}
      </main>
    </>
  );
}
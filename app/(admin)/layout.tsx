"use client"; // 1. Necesario para detectar la URL activa

import Link from "next/link";
import { usePathname } from "next/navigation"; // 2. Importamos el hook
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from "lucide-react";
import { clsx } from "clsx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Obtenemos la ruta actual (ej: /admin/estudiantes)

  // 3. Definimos el menú para iterar sobre él limpiamente
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Gestión Cursos", href: "/admin/cursos", icon: BookOpen },
    { name: "Estudiantes", href: "/admin/estudiantes", icon: Users },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-montserrat">
      
      {/* --- SIDEBAR DE ADMINISTRACIÓN --- */}
      <aside className="w-64 bg-[#0a2342] text-white flex flex-col flex-shrink-0 transition-all duration-300">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
            <div className="w-8 h-8 rounded-full border border-luxury-gold flex items-center justify-center bg-white/10">
               <span className="font-playfair font-bold text-xs">MV</span>
            </div>
            <div>
              <span className="font-playfair font-bold text-lg tracking-widest block leading-none">ADMIN</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Panel de Control</span>
            </div>
        </div>

        {/* Navegación Dinámica */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          {navItems.map((item) => {
            // 4. Lógica de Estado Activo Inteligente
            // - Si es el Dashboard (/admin), la coincidencia debe ser exacta.
            // - Para los demás, usamos startsWith para que si entras a "/admin/cursos/crear",
            //   el botón de "Gestión Cursos" siga encendido.
            const isActive = item.href === "/admin" 
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={clsx(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-primary-turquoise text-white shadow-md font-bold" // ESTILO ACTIVO
                    : "text-gray-400 hover:bg-white/10 hover:text-white font-medium" // ESTILO INACTIVO
                )}
              >
                 <item.icon size={20} className={clsx(isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                 <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-white/10">
            <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-action-coral hover:bg-white/5 rounded-lg transition-colors text-sm font-bold">
                <LogOut size={18} /> Salir
            </Link>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header simple del admin */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 flex-shrink-0 z-10">
            <h2 className="text-text-darkBlue font-bold text-sm uppercase tracking-wide">
                Bienvenido, Administrador
            </h2>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-text-darkBlue">Admin User</p>
                    <p className="text-[10px] text-gray-400">Super Admin</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-luxury-gold flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white ring-1 ring-gray-100 cursor-pointer">
                    AD
                </div>
            </div>
        </header>

        {/* Inyección de las páginas (Con scroll independiente) */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth bg-gray-50">
            {children}
        </div>
      </main>

    </div>
  );
}
"use client"; // Necesario porque usamos hooks interactivos (useState, useRouter)

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Mail, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { clsx } from "clsx";

/**
 * COMPONENTE: HEADER GLOBAL
 * --------------------------------------------------------------------
 * Este es el menú de navegación principal que aparece en todas las páginas.
 * Es 'sticky', lo que significa que se queda fijo arriba al hacer scroll.
 * Adapta su diseño automáticamente entre Escritorio y Móvil.
 */
export default function Header() {
  // Hook para manejar redirecciones programáticas (ej: al cerrar sesión)
  const router = useRouter();
  
  // Estado para controlar si el menú hamburguesa (móvil) está desplegado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estado para controlar si el menú dropdown del perfil (escritorio) está visible
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Hook para saber en qué URL estamos y pintar el enlace activo en dorado
  const pathname = usePathname();

  // ------------------------------------------------------------------
  // 🔴 DATOS MOCK (SIMULADOS) - BACKEND TODO:
  // Estos datos están "quemados" en el código. El equipo de Backend debe
  // reemplazar esto obteniendo los datos reales del contexto de usuario 
  // (React Context, Redux o Zustand) una vez que el usuario hace login.
  // ------------------------------------------------------------------
  const user = {
    name: "JORDY JOEL VELE CARRERA",
    avatar: "/avatar-placeholder.png", // Usaremos un fallback si no existe la imagen real
    notifications: 2, // Número de notificaciones sin leer
    messages: 1,      // Número de mensajes sin leer
  };

  // Enlaces de navegación principales. Fácil de editar si cambia la estructura del sitio.
  const navLinks = [
    { name: "ELEARNING", href: "/elearning" },
    { name: "ÁREA PERSONAL", href: "/" }, // Asumimos que el dashboard es el home
    { name: "MIS CURSOS", href: "/cursos" },
  ];

  /**
   * FUNCION: CERRAR SESIÓN
   * ------------------------------------------------------------------
   * Se ejecuta cuando el usuario hace clic en "Cerrar Sesión".
   */
  const handleLogout = () => {
    // 🔴 BACKEND TODO: Implementar lógica real de Logout aquí.
    // Pasos sugeridos para el desarrollador Backend:
    // 1. Hacer petición POST a endpoint /api/auth/logout para invalidar sesión en servidor.
    // 2. Borrar cookies HttpOnly o tokens del LocalStorage.
    // 3. Limpiar cualquier estado global de usuario en la app.
    
    console.log("Cerrando sesión (Simulado)...");
    
    // Redirigimos al usuario a la pantalla de Login
    router.push('/login'); 
  };

  return (
    <header className="bg-hero-gradient text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- ZONA 1: LOGOTIPO (Izquierda) --- */}
          <div className="shrink-0 flex items-center gap-3 cursor-pointer">
            {/* Icono decorativo */}
            <div className="w-10 h-10 rounded-md border-2 border-luminous-orange flex items-center justify-center bg-white/10 backdrop-blur-sm p-1">
               <img src="/Isotipo.png" alt="Logicube Logo" className="w-full h-full object-contain" />
            </div>
            {/* Texto de la marca con tipografías corporativas */}
            <div className="flex flex-col">
              <span className="font-space-grotesk font-bold text-lg leading-none tracking-widest text-white">
                LOGICUBE
              </span>
              <span className="font-syne text-[10px] tracking-[0.2em] text-luminous-orange uppercase">
                Desarrollo y Asesoría TI
              </span>
            </div>
          </div>

          {/* --- ZONA 2: NAVEGACIÓN ESCRITORIO (Centro) --- */}
          {/* 'hidden md:flex' oculta esto en móviles y lo muestra en pantallas medianas en adelante */}
          <nav className="hidden md:flex space-x-8 items-center h-full">
            {navLinks.map((link) => {
              // Verificamos si este link corresponde a la página actual para marcarlo activo
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "relative h-full flex items-center px-1 text-sm font-bold tracking-wide transition-colors duration-300",
                    isActive 
                      ? "text-white" // Estilo si está activo
                      : "text-gray-300 hover:text-luminous-orange" // Estilo inactivo
                  )}
                >
                  {link.name}
                  {/* Línea naranja inferior indicadora de "Activo" */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-luminous-orange rounded-t-md shadow-[0_-2px_10px_rgba(236,103,42,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- ZONA 3: ACCIONES DE USUARIO (Derecha) --- */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Iconos de notificación (Campana y Correo) */}
            <div className="flex items-center gap-4 text-gray-300">
              <button className="relative hover:text-luminous-orange transition-colors">
                <Bell size={20} />
                {/* Punto naranja si hay notificaciones */}
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-luminous-orange rounded-full animate-pulse" />
                )}
              </button>
              <button className="relative hover:text-luminous-orange transition-colors">
                <Mail size={20} />
                {/* Contador numérico de mensajes */}
                {user.messages > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-luminous-orange text-[10px] flex items-center justify-center rounded-full text-white font-bold">
                    {user.messages}
                  </span>
                )}
              </button>
            </div>

            <div className="h-6 w-px bg-white/20" /> {/* Separador Vertical visual */}

            {/* Dropdown de Usuario (Perfil) */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle del menú
                className="flex items-center gap-3 group focus:outline-none"
              >
                 <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold text-white group-hover:text-luminous-orange transition-colors">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Estudiante</p>
                 </div>
                 {/* Avatar Cuadrangular redondeado con borde naranja */}
                 <div className="h-10 w-10 rounded-md border-2 border-luminous-orange/50 group-hover:border-luminous-orange overflow-hidden transition-all shadow-lg">
                    {/* Placeholder de imagen (Iniciales) */}
                    <div className="w-full h-full bg-ultramarine-blue flex items-center justify-center text-white">
                        <span className="font-space-grotesk font-bold">JV</span>
                    </div>
                 </div>
                 {/* Flechita que gira si el menú está abierto */}
                 <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú Flotante (Dropdown) - Solo visible si isProfileOpen es true */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-md shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200 border border-signal-white z-50">
                  <div className="px-4 py-3 border-b border-signal-white lg:hidden">
                    <p className="text-sm font-bold text-dark-blue">{user.name}</p>
                  </div>
                  
                  {/* Link al Perfil */}
                  <Link 
                    href="/perfil" 
                    onClick={() => setIsProfileOpen(false)} // Cerramos el menú al navegar
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-signal-white hover:text-luminous-orange transition-colors"
                  >
                    <User size={16} /> Mi Perfil
                  </Link>
                  
                  {/* Botón Cerrar Sesión */}
                  <button 
                    onClick={handleLogout} // Llama a la función de logout
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-luminous-orange hover:bg-orange-50 transition-colors text-left"
                  >
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* --- ZONA 4: BOTÓN DE MENÚ MÓVIL (Visible solo en celular) --- */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-luminous-orange transition-colors p-2"
            >
              {/* Cambia el icono entre Hamburguesa y X según el estado */}
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
      {/* Se renderiza fuera de la barra principal, empujando o flotando sobre el contenido */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ultramarine-blue/98 backdrop-blur-lg border-t border-white/10 absolute w-full z-40">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-white hover:bg-white/10 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)} // Cerramos menú al hacer clic
              >
                {link.name}
              </Link>
            ))}
            {/* Sección de usuario en móvil (ya que los iconos de arriba se ocultan) */}
            <div className="border-t border-white/10 my-2 pt-2">
                 <p className="px-3 text-xs text-gray-400 uppercase mb-2">Cuenta</p>
                 <div className="flex items-center gap-3 px-3 py-2 text-white">
                    <div className="h-8 w-8 rounded-md bg-luminous-orange flex items-center justify-center text-xs font-bold text-white">JV</div>
                    <span className="text-sm">{user.name}</span>
                 </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra Naranja Inferior (Detalle estético para separar el header del contenido) */}
      <div className="h-1 w-full bg-orange-gradient" />
    </header>
  );
}
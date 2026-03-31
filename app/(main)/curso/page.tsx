"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseSidebar from "@/components/course-player/CourseSidebar";
import AssignmentView from "@/components/course-player/AssignmentView";
import { ChevronLeft, Play, Menu, X } from "lucide-react"; // Importamos Menu y X
import Link from "next/link";
import { clsx } from "clsx";

export default function CoursePlayerPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const [activeLessonId, setActiveLessonId] = useState(searchParams.get('lessonId') || "l1"); 
  const [contentType, setContentType] = useState(searchParams.get('type') || "video");
  
  // Estado para menú móvil
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectLesson = (id: string, type: string) => {
    setActiveLessonId(id);
    setContentType(type);
    setIsMobileSidebarOpen(false); // Cerrar menú al seleccionar en móvil
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-signal-white relative">
      
      {/* --- HEADER DEL PLAYER --- */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0 z-20">
         <div className="flex items-center gap-4">
             <Link href="/cursos" className="flex items-center gap-2 text-sm text-gray-500 hover:text-luminous-orange font-medium">
                <ChevronLeft size={18}/> <span className="hidden sm:inline">Mis cursos</span>
             </Link>
             <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
             <h1 className="text-sm font-bold text-dark-blue uppercase truncate max-w-[200px] sm:max-w-md">
                Talasoterapia Avanzada
             </h1>
         </div>

         {/* Botón Menú Móvil (Solo visible en pantallas pequeñas) */}
         <button 
            className="lg:hidden p-2 text-dark-blue hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileSidebarOpen(true)}
         >
             <Menu size={24} />
         </button>
      </div>

      {/* --- LAYOUT PRINCIPAL --- */}
      <div className="flex grow overflow-hidden relative">
        
        {/* ÁREA DE CONTENIDO */}
        <div className="grow overflow-y-auto p-4 md:p-8 scroll-smooth">
            {contentType === 'video' && (
                <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                    <div className="aspect-video bg-black rounded-md overflow-hidden shadow-lg relative group cursor-pointer mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play size={32} className="text-white fill-white ml-1"/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm">
                        <h2 className="font-space-grotesk font-bold text-xl mb-4">Introducción al Módulo</h2>
                        <p className="text-gray-600 text-sm mb-4">Descripción del video...</p>
                    </div>
                </div>
            )}

            {contentType === 'assignment' && <AssignmentView />}
        </div>

        {/* --- SIDEBAR DESKTOP (Fijo a la derecha) --- */}
        <div className="hidden lg:block w-80 shrink-0 h-full border-l border-gray-200 bg-white">
            <CourseSidebar activeLessonId={activeLessonId} onSelectLesson={handleSelectLesson} />
        </div>

        {/* --- SIDEBAR MÓVIL (Overlay + Slide) --- */}
        {/* 1. Fondo Oscuro (Backdrop) */}
        <div 
            className={clsx(
                "fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300",
                isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* 2. Panel Deslizante */}
        <div className={clsx(
            "fixed inset-y-0 right-0 w-80 bg-white z-40 lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out",
            isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="font-bold text-dark-blue">Temario</span>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X size={24} className="text-gray-500"/>
                </button>
            </div>
            <div className="h-full overflow-y-auto pb-20">
                <CourseSidebar activeLessonId={activeLessonId} onSelectLesson={handleSelectLesson} />
            </div>
        </div>

      </div>
    </div>
  );
}
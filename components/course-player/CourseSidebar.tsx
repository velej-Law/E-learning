"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle, FileCheck, CheckCircle, Lock, Circle } from "lucide-react";
import { clsx } from "clsx";

/**
 * CONTRATO DE DATOS (Estructura del Curso)
 * ------------------------------------------------------------------
 * 🔴 BACKEND TODO:
 * El endpoint GET /api/courses/{id}/syllabus debe devolver un array de Módulos.
 *
 * Estructura de 'Lesson' (Lección):
 * @property id - Identificador único.
 * @property title - Título de la lección.
 * @property type - 'video' | 'assignment' | 'quiz'. Determina qué vista cargar a la derecha.
 * @property status - 'completed' (Check verde) | 'current' (Activo) | 'pending' (Gris) | 'locked' (Candado).
 * @property duration - String de tiempo ("10:00") o etiqueta ("Tarea").
 *
 * Estructura de 'Module':
 * @property id - ID del módulo.
 * @property title - Título del módulo.
 * @property isOpen - Booleano opcional para saber si debe venir desplegado por defecto.
 * @property lessons - Array de objetos Lesson.
 */

// ------------------------------------------------------------------
// DATOS MOCK (SIMULADOS)
// Ejemplo de la respuesta JSON esperada.
// ------------------------------------------------------------------
const modules = [
  {
    id: 1,
    title: "Módulo 1: Fundamentos",
    lessons: [
      { id: "l1", title: "Historia de la Talasoterapia", type: "video", status: "completed", duration: "10:00" },
      { id: "l2", title: "Propiedades del Agua", type: "video", status: "completed", duration: "15:30" },
    ]
  },
  {
    id: 2,
    title: "Módulo 2: Aplicaciones Prácticas",
    isOpen: true, // Este módulo inicia abierto por defecto para mejorar la UX
    lessons: [
      { id: "l3", title: "Técnicas de Hidromasaje", type: "video", status: "current", duration: "20:00" },
      // INTEGRACIÓN DE TAREA EN EL FLUJO:
      // Nótese el type: "assignment". Esto le dice al componente padre que cargue la vista de Tarea.
      { id: "task-1", title: "Práctica de Talasoterapia", type: "assignment", status: "pending", duration: "Tarea" }, 
      { id: "quiz-1", title: "Examen del Módulo", type: "quiz", status: "locked", duration: "20 min" },
    ]
  }
];

/**
 * COMPONENTE: SIDEBAR DEL CURSO (ACORDEÓN)
 * ------------------------------------------------------------------
 * Panel lateral de navegación dentro del aula virtual.
 *
 * @param activeLessonId - ID de la lección que se está viendo actualmente (para resaltarla).
 * @param onSelectLesson - Callback que comunica al padre (Page) que el usuario quiere cambiar de contenido.
 */
export default function CourseSidebar({ activeLessonId, onSelectLesson }: { activeLessonId: string, onSelectLesson: (id: string, type: string) => void }) {
  
  // Estado local para manejar qué acordeones (módulos) están desplegados.
  // Inicializamos con el ID 2 abierto simulando que es el progreso actual del usuario.
  const [openModules, setOpenModules] = useState<number[]>([2]);

  // Función para abrir/cerrar un módulo específico
  const toggleModule = (id: number) => {
    if (openModules.includes(id)) {
      setOpenModules(openModules.filter(m => m !== id)); // Cerrar si ya existe
    } else {
      setOpenModules([...openModules, id]); // Abrir agregando al array
    }
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      
      {/* --- ZONA SUPERIOR: RESUMEN DE PROGRESO --- */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-space-grotesk font-bold text-dark-blue text-lg">Contenido del Curso</h2>
        
        {/* Barra de progreso visual */}
        <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
             {/* El ancho (width) debe ser dinámico basado en: (lecciones_completadas / total) * 100 */}
             <div className="bg-luminous-orange w-[35%] h-full rounded-full"></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">35% Completado</p>
      </div>

      {/* --- LISTA DE MÓDULOS (Scrollable) --- */}
      <div className="grow overflow-y-auto">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-100">
            
            {/* CABECERA DEL MÓDULO (Botón Colapsable) */}
            <button 
                onClick={() => toggleModule(module.id)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="font-bold text-sm text-dark-blue">{module.title}</span>
                {/* Icono Chevron que rota 180 grados si está abierto */}
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${openModules.includes(module.id) ? 'rotate-180' : ''}`}/>
            </button>

            {/* LISTA DE LECCIONES (Solo visible si el módulo está en openModules) */}
            {openModules.includes(module.id) && (
                <div className="bg-white">
                    {module.lessons.map((lesson) => {
                        // Verificamos si esta es la lección activa para pintarla de Turquesa
                        const isActive = activeLessonId === lesson.id;
                        
                        return (
                            <button 
                                key={lesson.id}
                                // Si está bloqueada (locked), no hacemos nada. Si no, notificamos al padre.
                                onClick={() => lesson.status !== 'locked' && onSelectLesson(lesson.id, lesson.type)}
                                disabled={lesson.status === 'locked'}
                                className={clsx(
                                    "w-full flex items-start gap-3 p-3 pl-6 border-l-4 transition-all text-left group",
                                    // Estilos condicionales: Activo vs Inactivo vs Bloqueado
                                    isActive ? "border-luminous-orange bg-luminous-orange/5" : "border-transparent hover:bg-gray-50",
                                    lesson.status === 'locked' && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {/* --- ICONOGRAFÍA DE ESTADO --- */}
                                <div className="mt-0.5">
                                    {/* Caso 1: Completado (Check Verde -> Naranja en Logicube) */}
                                    {lesson.status === 'completed' && <CheckCircle size={16} className="text-luminous-orange" />}
                                    
                                    {/* Caso 2: Bloqueado (Candado Gris) */}
                                    {lesson.status === 'locked' && <Lock size={16} className="text-gray-300" />}
                                    
                                    {/* Caso 3: Pendiente o Actual (Icono según tipo de contenido) */}
                                    {(lesson.status === 'pending' || lesson.status === 'current') && (
                                        lesson.type === 'assignment' 
                                            ? <FileCheck size={16} className={isActive ? "text-luminous-orange" : "text-gray-400"} /> // Icono Tarea
                                            : <PlayCircle size={16} className={isActive ? "text-luminous-orange" : "text-gray-400"} /> // Icono Video
                                    )}
                                </div>
                                
                                {/* --- TEXTOS --- */}
                                <div className="grow">
                                    <p className={clsx("text-sm font-medium leading-tight", isActive ? "text-luminous-orange" : "text-gray-600")}>
                                        {lesson.title}
                                    </p>
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                                        {lesson.duration}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
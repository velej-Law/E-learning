"use client";
import Link from "next/link";

import { useState } from "react";
import { Clock, SlidersHorizontal, FileUp, ChevronDown } from "lucide-react";

/**
 * CONTRATO DE DATOS (API)
 * ------------------------------------------------------------------
 * 🔴 BACKEND TODO:
 * Esta interfaz define la estructura exacta que el Frontend espera recibir
 * del endpoint GET /api/student/tasks/pending
 * * @property id - Identificador único de la tarea (usado para deep-linking).
 * @property dateLabel - Fecha ya formateada para mostrar (ej: "Lun. 30").
 * @property time - Hora límite de entrega.
 * @property type - Tipo de actividad para renderizar el icono correcto.
 * @property courseName - Nombre del curso al que pertenece la tarea.
 */
interface Task {
  id: string;
  dateLabel: string; // Ej: "Lun. 30 de Mayo del 2025"
  time: string;
  title: string;
  type: "assignment" | "quiz" | "forum";
  courseName: string; // Para mostrar contexto si se ordena por fecha
}

// ------------------------------------------------------------------
// DATOS MOCK (SIMULADOS)
// Estos datos se usan para visualizar la UI mientras no hay conexión a API.
// Deben ser reemplazados por un useEffect + fetch en la implementación final.
// ------------------------------------------------------------------
const mockTasks: Task[] = [
  {
    id: "1",
    dateLabel: "Lun. 30 de Mayo del 2025",
    time: "09:00",
    title: "Práctica de desarrollo Modular",
    type: "assignment",
    courseName: "Fundamentos de desarrollo Modular"
  },
  {
    id: "2",
    dateLabel: "Mié. 1 de Junio del 2025",
    time: "22:00",
    title: "Investigación de elementos de un propmt",
    type: "assignment",
    courseName: "Redacción y Optimizacion de Prompts"
  }
];

/**
 * COMPONENTE: LISTA DE TAREAS (TIMELINE)
 * ------------------------------------------------------------------
 * Muestra las entregas pendientes ordenadas cronológicamente.
 * Permite filtrar por fecha y redirige directamente a la tarea específica
 * dentro del reproductor del curso.
 */
export default function TimelineList() {
  // Estados para controlar la visibilidad de los menús desplegables (Dropdowns)
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  
  // Estado visual del filtro activo (Solo cambia el texto del botón por ahora)
  const [activeFilter] = useState("Próximos 7 días");

  /**
   * Ayudante visual: Decide qué icono mostrar según el tipo de tarea.
   * Si en el futuro añadimos 'quiz' o 'forum', aquí definimos su icono.
   */
  const getIcon = (type: string) => {
    switch (type) {
      case "assignment": return <FileUp size={20} className="text-white" />;
      default: return <FileUp size={20} className="text-white" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 min-h-[400px]">
      
      {/* --- ZONA DE CONTROLES SUPERIOR (Filtros y Ordenamiento) --- */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        
        {/* 1. Filtro de Tiempo (Izquierda - Icono Reloj) */}
        <div className="relative">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-luminous-orange text-white rounded-md shadow-sm hover:bg-dark-blue transition-colors text-sm font-medium"
          >
            <Clock size={18} />
            <span className="hidden sm:inline">{activeFilter}</span>
            <ChevronDown size={14} />
          </button>

          {/* Dropdown Menu Izquierdo */}
          {filterOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="py-1">
                    {/* BACKEND TODO: Conectar estos botones para refetching de datos con filtros de fecha */}
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-signal-white hover:text-luminous-orange">
                        Todas
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-luminous-orange font-bold hover:bg-orange-50">
                        Atrasadas
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <p className="px-4 py-1 text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                        Fecha de vencimiento
                    </p>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-signal-white hover:text-luminous-orange">
                        Próximos 7 días
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-signal-white hover:text-luminous-orange">
                        Próximos 30 días
                    </button>
                </div>
            </div>
          )}
        </div>

        {/* 2. Filtro de Ordenamiento (Derecha - Icono Sliders) */}
        <div className="relative">
             <button 
                onClick={() => setSortOpen(!sortOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Opciones de ordenamiento"
             >
                <SlidersHorizontal size={20} />
             </button>

             {/* Dropdown Menu Derecho */}
             {sortOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-signal-white font-medium">
                            Ordenar por fecha
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-signal-white font-medium">
                            Ordenar por curso
                        </button>
                    </div>
                </div>
             )}
        </div>
      </div>

      {/* --- LISTA DE TAREAS (Renderizado) --- */}
      <div className="space-y-8">
        {mockTasks.map((task) => (
            <div key={task.id} className="animate-in slide-in-from-bottom-2 duration-500">
                
                {/* Cabecera de Fecha (Ej: Lun. 30 de Mayo...) */}
                <h3 className="font-space-grotesk text-lg text-dark-blue font-bold mb-4 border-l-4 border-luminous-orange pl-3">
                    {task.dateLabel}
                </h3>

                {/* Tarjeta de la Tarea Individual */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 group">
                    
                    {/* Información Izquierda (Hora, Icono, Títulos) */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <span className="text-sm font-bold text-gray-400 min-w-[45px]">
                            {task.time}
                        </span>
                        
                        {/* Contenedor del Icono */}
                        <div className="w-10 h-10 rounded-full bg-luminous-orange flex items-center justify-center shadow-md shrink-0">
                            {getIcon(task.type)}
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold text-dark-blue text-base leading-tight group-hover:text-luminous-orange transition-colors">
                                {task.title}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                                Curso: {task.courseName}
                            </span>
                        </div>
                    </div>

                    {/* Espaciador Visual (Línea punteada visible solo en desktop para guiar el ojo) */}
                    <div className="hidden md:block grow mx-6 border-b-2 border-dotted border-gray-200 h-1 relative top-1"></div>

                    {/* Botón de Acción: AGREGAR ENTREGA */}
                    {/* ESTRATEGIA DE NAVEGACIÓN:
                      En lugar de ir a una página de tarea aislada, enviamos al usuario al 
                      reproductor del curso (/curso/[slug]) pero le pasamos parámetros Query:
                      ?lessonId=... -> Para que el player cargue esa lección específica.
                      ?type=...     -> Para que el player sepa que debe mostrar la vista de Tarea.
                    */}
                    <Link 
                    //Apuntamos a la ruta del curso y pasamos params: ?lessonId=... & type=...
                    href={`/curso/talasoterapia-avanzada?lessonId=${task.id}&type=${task.type}`} className="w-full md:w-auto">
                          <button className="w-full px-5 py-2 rounded-md border border-luminous-orange text-luminous-orange font-bold text-sm hover:bg-luminous-orange hover:text-white transition-all shadow-sm uppercase tracking-wide">
                              Agregar entrega
                          </button>
                    </Link>
                </div>
            </div>
        ))}
        
        {/* Mensaje vacío (Se muestra si el array mockTasks está vacío) */}
        {mockTasks.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                <p>No tienes tareas pendientes para este periodo.</p>
            </div>
        )}
      </div>
    </div>
  );
}
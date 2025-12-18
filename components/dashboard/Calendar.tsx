import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

/**
 * COMPONENTE: CALENDAR
 * --------------------------------------------------------------------
 * Este componente renderiza la vista mensual del calendario de eventos.
 * Actualmente es estático (Mock), pero está preparado para recibir datos dinámicos.
 * * NOTA DE DISEÑO:
 * Utiliza CSS Grid (grid-cols-7) para alinear los días.
 * Distingue visualmente los fines de semana con encabezados dorados y fondo crema.
 */
export default function Calendar() {
  
  // ------------------------------------------------------------------
  // 🔴 BACKEND TODO: ESTRUCTURA DE DATOS ESPERADA
  // El backend debe devolver un array de objetos representando los días del mes visualizado.
  // 
  // Interface sugerida para la API:
  // interface CalendarEvent {
  //   id: string;
  //   title: string;
  //   color: "teal" | "white" | "gold"; // Para mapear estilos CSS
  //   type: "webinar" | "assignment" | "exam";
  // }
  //
  // interface DayCell {
  //   date: string;       // Día del mes ("1", "2", etc) o "" para celdas vacías de relleno
  //   type: "empty" | "weekday" | "weekend"; // Para aplicar fondo blanco o crema
  //   event?: CalendarEvent; // Opcional, si hay evento ese día
  // }
  // ------------------------------------------------------------------

  // Definimos los días estáticos para replicar el mockup de Noviembre 2025
  const days = [
    // Relleno inicial (Padding): Días del mes anterior para que el día 1 caiga en Sábado
    { date: "", type: "empty" }, { date: "", type: "empty" }, { date: "", type: "empty" }, { date: "", type: "empty" }, { date: "", type: "empty" }, 
    
    // Inicio del mes
    { date: "1", type: "weekend" }, { date: "2", type: "weekend" },
    { date: "3", type: "weekday" }, { date: "4", type: "weekday" }, { date: "5", type: "weekday" }, { date: "6", type: "weekday" }, { date: "7", type: "weekday" }, 
    { date: "8", type: "weekend" }, { date: "9", type: "weekend" },
    { date: "10", type: "weekday" }, { date: "11", type: "weekday" }, { date: "12", type: "weekday" }, { date: "13", type: "weekday" }, 
    
    // Ejemplo de Evento Tipo 1 (Webinar - Teal)
    { date: "14", type: "weekday", event: { title: "Webinar: Propiedades del Agua de Mar", color: "teal" } }, 
    
    { date: "15", type: "weekend" }, { date: "16", type: "weekend" },
    { date: "17", type: "weekday" }, { date: "18", type: "weekday" }, { date: "19", type: "weekday" }, { date: "20", type: "weekday" }, 
    
    // Ejemplo de Evento Tipo 2 (Entrega - Blanco con borde)
    { date: "21", type: "weekday", event: { title: "Entrega: Ensayo sobre Lodos Marinos", color: "white" } }, 
    
    { date: "22", type: "weekend" }, { date: "23", type: "weekend" },
    { date: "24", type: "weekday" }, { date: "25", type: "weekday" }, { date: "26", type: "weekday" }, { date: "27", type: "weekday" }, { date: "28", type: "weekday" }, 
    { date: "29", type: "weekend" }, { date: "30", type: "weekend" },
  ];

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
      
      {/* --- ZONA DE CONTROLES (Filtros y Acciones) --- */}
      <div className="flex justify-between items-center mb-6">
        {/* Filtro por Curso: Debe poblarse dinámicamente con la lista de cursos del usuario */}
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 bg-white min-w-[200px]">
            <option>Todos los cursos</option>
            <option>Talasoterapia I</option>
        </select>
        
        {/* Botón de Acción Principal */}
        <button className="px-4 py-2 bg-action-coral text-white text-sm font-bold rounded shadow hover:bg-action-coralDark transition-colors">
             Nuevo evento
        </button>
      </div>

      {/* --- NAVEGACIÓN DE MES --- */}
      <div className="flex justify-between items-center mb-2">
         {/* Botón Mes Anterior: Necesita lógica JS para cambiar el estado del mes */}
         <button className="text-gray-500 hover:text-primary-turquoise font-bold text-sm flex items-center">
            <ChevronLeft size={16} /> octubre
         </button>
         
         {/* Título del Mes Actual */}
         <h3 className="text-lg font-bold text-text-darkBlue uppercase">noviembre 2025</h3>
         
         {/* Botón Mes Siguiente */}
         <button className="text-gray-500 hover:text-primary-turquoise font-bold text-sm flex items-center">
            diciembre <ChevronRight size={16} />
         </button>
      </div>

      {/* --- GRID PRINCIPAL DEL CALENDARIO --- */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        
        {/* 1. Cabecera con Días de la Semana */}
        <div className="grid grid-cols-7 text-sm font-bold text-white">
            {weekDays.map((day, index) => (
                <div 
                    key={day} 
                    className={clsx(
                        "py-2 px-2 text-left",
                        // LÓGICA VISUAL: Si es Sábado (idx 5) o Domingo (idx 6), aplicamos el gradiente dorado.
                        // El resto de días usan el color turquesa corporativo.
                        index >= 5 ? "bg-gold-gradient text-text-darkBlue" : "bg-primary-turquoise"
                    )}
                >
                    {day}
                </div>
            ))}
        </div>

        {/* 2. Celdas de los Días (Renderizado del array 'days') */}
        <div className="grid grid-cols-7 auto-rows-[100px] text-sm">
            {days.map((day, i) => (
                <div 
                    key={i} 
                    className={clsx(
                        "border-r border-b border-gray-100 p-1 relative transition-colors hover:bg-gray-50",
                        // LÓGICA VISUAL: Fondo crema sutil para fines de semana para diferenciarlos rápidamente
                        day.type === "weekend" ? "bg-[#fffdf5]" : "bg-white" 
                    )}
                >
                    {/* Número del día (Solo si no es celda vacía) */}
                    {day.date && (
                        <span className="font-semibold text-gray-700 ml-1">{day.date}</span>
                    )}

                    {/* --- RENDERIZADO DE EVENTOS --- */}
                    {/* Si el objeto día tiene un evento, pintamos el "chip" */}
                    {day.event && (
                        <div className={clsx(
                            "mt-2 p-2 text-[10px] leading-tight rounded font-bold cursor-pointer shadow-sm",
                            // Estilos condicionales según el tipo de evento (Color)
                            day.event.color === "teal" 
                                ? "bg-primary-turquoise text-white hover:bg-primary-dark" 
                                : "bg-white border-l-4 border-text-darkBlue text-text-darkBlue hover:shadow-md"
                        )}>
                            {day.event.title}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
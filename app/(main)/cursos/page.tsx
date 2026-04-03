import { Search, LayoutGrid, List, ChevronDown } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";

/**
 * DATOS MOCK (SIMULADOS)
 * ------------------------------------------------------------------
 * 🔴 BACKEND TODO:
 * Estos datos deben venir del endpoint GET /api/student/courses
 *
 * Parametrización sugerida para filtros:
 * GET /api/student/courses?status=in-progress&search=talasoterapia&sort=last_access
 */
const courses = [
  {
    id: "1",
    title: "Fundamentos de Intercomunicaciones",
    instructor: "Logicube Instructor",
    parallel: "Paralelo 1",
    imageSrc: "/course1.jpg",
    progress: 38,
    slug: "fundamentos-intercomunicaciones"
  },
  {
    id: "2",
    title: "Fundamentos de desarrollo Modular",
    instructor: "Logicube Instructor",
    parallel: "Paralelo 1",
    imageSrc: "/course2.jpg",
    progress: 8,
    slug: "fundamentos-desarrollo-modular"
  },
  {
    id: "3",
    title: "Aplicaciones y Parametros de IA",
    instructor: "Logicube Instructor",
    parallel: "Paralelo 1",
    imageSrc: "/course3.jpg",
    progress: 25,
    slug: "aplicaciones-ia"
  },
  {
    id: "4",
    title: "Gestión de Recursos",
    instructor: "Logicube Instructor",
    parallel: "Paralelo 1",
    imageSrc: "/course4.jpg",
    progress: 0, // No iniciado
    slug: "gestion-recursos"
  },
   {
    id: "5",
    title: "Redacción y Optimizacion de Prompts",
    instructor: "Logicube Instructor",
    parallel: "Paralelo 1",
    imageSrc: "/course5.jpg",
    progress: 100,
    slug: "redaccion-prompts"
  }
];

/**
 * PÁGINA: MIS CURSOS (CATÁLOGO)
 * ------------------------------------------------------------------
 * Vista principal donde el estudiante ve todos sus cursos inscritos.
 * Incluye una barra de herramientas avanzada con búsqueda y filtros.
 */
export default function MisCursosPage() {
  return (
    <div className="bg-signal-white min-h-screen">
      
      {/* --- HERO SECTION --- */}
      {/* Cabecera visual con degradado corporativo */}
      <section className="bg-gradient-to-r from-dark-blue to-ultramarine-blue pt-16 pb-24 text-center relative overflow-hidden">
        {/* Decoración de fondo (Patrón de ondas opcional) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        
        <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white uppercase tracking-widest relative z-10 drop-shadow-md">
          Mis Cursos
        </h1>
      </section>

      {/* --- BARRA DE FILTROS FLOTANTE --- */}
      {/* Se posiciona con margen negativo (-mt-8) para "flotar" entre el Hero y el contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* 1. FILTRO DE CATEGORÍA/ESTADO */}
          <div className="w-full md:w-auto min-w-[150px]">
            <div className="relative">
                {/* 🔴 FRONTEND TODO: Agregar onChange para filtrar la lista 'courses' */}
                <select className="w-full appearance-none bg-signal-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded focus:outline-none focus:border-luminous-orange cursor-pointer text-sm font-medium">
                    <option>Todos</option>
                    <option>En Progreso</option>
                    <option>Completados</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16}/>
            </div>
          </div>

          {/* 2. BUSCADOR CENTRAL */}
          <div className="w-full md:flex-grow max-w-2xl relative">
            {/* 🔴 FRONTEND TODO: Implementar Debounce en el input para no saturar la API al escribir */}
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full border border-gray-200 rounded py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-luminous-orange focus:ring-1 focus:ring-luminous-orange transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* 3. CONTROLES DE VISTA (Orden y Grid/Lista) */}
          <div className="w-full md:w-auto flex gap-3">
             <div className="relative flex-col grow md:flex-grow-0">
                <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded focus:outline-none focus:border-luminous-orange cursor-pointer text-sm">
                    <option>Ordenar por nombre</option>
                    <option>Último acceso</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16}/>
            </div>

            {/* Toggle Grid/Lista (Actualmente visual, requiere lógica de estado) */}
            <div className="flex border border-gray-200 rounded md:rounded-md overflow-hidden flex-shrink-0">
                <button className="p-2 bg-luminous-orange text-white shadow-inner">
                    <LayoutGrid size={18}/>
                </button>
                <button className="p-2 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                    <List size={18}/>
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* --- GRID DE CURSOS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapeamos el array de cursos para renderizar las tarjetas */}
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* --- FOOTER INFORMATIVO (Específico de esta página) --- */}
      {/* Muestra enlaces a plataformas antiguas si el estudiante viene de otro periodo */}
      <section className="bg-ultramarine-blue py-8 text-center border-t border-white/10 mt-auto">
          <div className="max-w-3xl mx-auto px-4 space-y-2">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Elearning anterior</p>
            <p className="text-gray-300 text-sm">
                Aulas virtuales de periodos académicos anteriores:{" "}
                <a href="#" className="text-luminous-orange hover:text-white underline transition-colors">
                    marzo 2025 - julio 2025
                </a>
            </p>
            <p className="text-gray-500 text-[10px] pt-4">Syne Regular</p>
          </div>
      </section>

    </div>
  );
}
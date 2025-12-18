import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * CONTRATO DE DATOS (Interfaz)
 * ------------------------------------------------------------------
 * 🔴 BACKEND TODO:
 * Al renderizar la lista de "Mis Cursos", cada objeto del array JSON
 * debe cumplir con esta estructura.
 * * @property id - ID único del curso.
 * @property imageSrc - URL de la imagen de portada (CDN/S3).
 * @property progress - Entero de 0 a 100.
 * @property slug - Identificador amigable para la URL (ej: "talasoterapia-101").
 */
export interface CourseProps {
  id: string;
  title: string;
  instructor: string;
  parallel: string;
  imageSrc: string;
  progress: number;
  slug: string; // Para el enlace
}

/**
 * COMPONENTE: TARJETA DE CURSO (CARD)
 * ------------------------------------------------------------------
 * Componente de presentación reutilizable.
 * Se encarga de mostrar la información resumida de un curso y su estado de progreso.
 * Cambia visualmente (color de botón) dependiendo de si el usuario ha iniciado o no.
 */
export default function CourseCard({ course }: { course: CourseProps }) {
  
  // Lógica de UI: Determina el estado visual basado en el progreso.
  // Si es > 0, el curso está "En progreso" (Botón Coral).
  // Si es 0, el curso está "Sin empezar" (Botón Turquesa).
  const isStarted = course.progress > 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* --- ZONA 1: IMAGEN DE PORTADA Y PROGRESO --- */}
      <div className="relative h-48 w-full bg-gray-200">
        
        {/* Placeholder / Imagen */}
        {/* NOTA DE DISEÑO: Usamos un div gris con texto por defecto. 
            Para producción, descomentar <Image /> de Next.js. */}
        <div className="absolute inset-0 bg-primary-dark/20 flex items-center justify-center text-gray-500">
             {/* Aquí iría <Image src={course.imageSrc} ... /> real */}
             <span className="text-xs font-bold text-white/50 uppercase">Imagen del curso</span>
        </div>
        
        {/* Overlay degradado: Mejora la legibilidad de textos sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>

        {/* --- BARRA DE PROGRESO (Diseño Personalizado Mare Vitae) --- */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-black/60 backdrop-blur-sm flex items-center px-3 gap-3">
           {/* Contenedor de la barra (Gris oscuro) */}
           <div className="flex-grow bg-gray-600/50 rounded-full h-1.5 overflow-hidden">
              {/* Relleno de la barra (Dorado Corporativo) */}
              <div 
                className="bg-luxury-gold h-full rounded-full shadow-[0_0_10px_#D4AF37] relative" 
                style={{ width: `${course.progress}%` }}
              >
                {/* Efecto de brillo/resplandor al final de la barra */}
                <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[2px]"></div>
              </div>
           </div>
           {/* Texto numérico del porcentaje */}
           <span className="text-[10px] text-white font-bold whitespace-nowrap min-w-[30px] text-right">
             {course.progress}%
           </span>
        </div>
      </div>

      {/* --- ZONA 2: INFORMACIÓN TEXTUAL --- */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Título truncado a 2 líneas para mantener uniformidad en el grid */}
          <h3 className="font-playfair font-bold text-lg leading-tight text-text-darkBlue uppercase mb-2 line-clamp-2 min-h-[3rem]">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium mb-1">{course.instructor}</p>
          <p className="text-xs text-gray-400 font-light mb-4">{course.parallel}</p>
        </div>

        {/* --- ZONA 3: BOTÓN DE ACCIÓN (Call to Action) --- */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          
          {/* Navegación:
              1. La línea comentada es la implementación FINAL (Dinámica usando slug).
              2. La línea activa es temporal para la demo, redirige a una vista genérica.
          */}
          {/*-- <Link href={`/curso/${course.slug}`}> -- Enlace para llamar a cursos en la base de datos --*/}
          <Link href={`/curso`}>
            <button className={clsx(
                "w-full py-2.5 px-4 rounded-md font-bold text-xs shadow-md transition-all uppercase tracking-wider",
                // Cambio de estilo condicional según estado
                isStarted 
                    ? "bg-coral-gradient text-white hover:opacity-90 hover:shadow-lg" // Curso iniciado
                    : "bg-primary-turquoise text-white hover:bg-primary-dark"         // Curso nuevo
            )}>
              {isStarted ? "Continuar Curso" : "Ver Detalles"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
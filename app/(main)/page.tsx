import Calendar from "@/components/dashboard/Calendar";
import TimelineList from "@/components/dashboard/TimelineList";

export default function Home() {
  return (
    <div className="bg-bg-mist min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-text-darkBlue uppercase mb-8 border-b-2 border-gray-100 pb-4">
        Área Personal
      </h1>

      {/* Sección 1: Tareas / Línea de tiempo */}
      <section className="mb-10">
        <h2 className="font-playfair text-xl font-bold text-text-darkBlue mb-4">
          Línea de tiempo
        </h2>
        {/* Aquí va el nuevo componente */}
        <TimelineList />
      </section>

      {/* Sección 2: Calendario */}
      <section>
        <h2 className="font-playfair text-xl font-bold text-text-darkBlue mb-4">
          Calendario
        </h2>
        <Calendar />
      </section>
      </div>
      {/* --- FOOTER INFORMATIVO (estatico) --- */}
      <section className="bg-[#0a2342] py-8 text-center border-t border-white/10 mt-auto">
          <div className="max-w-3xl mx-auto px-4 space-y-2">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Elearning anterior</p>
            <p className="text-gray-300 text-sm">
                Aulas virtuales de periodos académicos anteriores:{" "}
                <a href="#" className="text-luxury-gold hover:text-white underline transition-colors">
                    marzo 2025 - julio 2025
                </a>
            </p>
            <p className="text-gray-500 text-[10px] pt-4">Montserrat Regular</p>
          </div>
      </section>
    </div>
  );
}
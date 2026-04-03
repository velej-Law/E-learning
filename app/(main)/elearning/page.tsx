import React from 'react';
import { Star, Quote } from 'lucide-react';

const ghostReviews = [
  {
    id: 1,
    name: "María Pérez",
    role: "Estudiante de Desarrollo",
    text: "Logicube Cursos transformó por completo mi forma de aprender. Los instructores son de primer nivel y la plataforma es súper intuitiva. 100% recomendado.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Gómez",
    role: "Profesional de TI",
    text: "Excelente contenido y muy bien estructurado. Todo el material de e-learning está diseñado para ir directo al grano, me ayudó muchísimo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Diseñadora UX/UI",
    text: "Los cursos son muy prácticos e interactivos. He probado otras plataformas, pero esta tiene el equilibrio perfecto entre teoría y ejercicios aplicados.",
    rating: 4,
  }
];

export default function ElearningPage() {
  return (
    <div className="bg-signal-white min-h-screen pb-12">
      {/* --- HERO SECTION: Quiénes Somos --- */}
      <section className="bg-gradient-to-r from-dark-blue to-ultramarine-blue py-20 text-center relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-md">
            ¿Quiénes somos Logicube Cursos?
          </h1>
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">
            En Logicube, creemos que la educación debe ser accesible, innovadora y de la más alta calidad. 
            Somos una plataforma de e-learning dedicada a potenciar tus habilidades tecnológicas y profesionales 
            a través de cursos diseñados por expertos.
          </p>
        </div>
      </section>

      {/* --- SECCIÓN DE CONTENIDO PLACEHOLDER --- */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center text-gray-700">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">Nuestra Filosofía de Aprendizaje</h2>
            <p className="mb-6 leading-relaxed">
                Creemos en aprender a través de la experiencia y la práctica, tal como lo propone el pragmatismo, lo que convierte la enseñanza en algo relevante y aplicable a la vida diaria.
            </p>
            <p className="leading-relaxed">
                Fomentamos la capacidad de reflexionar críticamente sobre la realidad y actuar con ética, responsabilidad y conciencia social.
            </p>
        </div>
      </section>

      {/* --- SECCIÓN DE RESEÑAS FANTASMA --- */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 mt-4">
          <h2 className="text-3xl font-bold text-dark-blue mb-4">Lo que dicen nuestros estudiantes</h2>
          <p className="text-gray-500">Miles de profesionales ya han acelerado su carrera con nuestra metodología.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ghostReviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative transition-transform hover:-translate-y-1">
              
              {/* Icono de Comillas Flotante */}
              <div className="absolute -top-6 left-8 bg-luminous-orange rounded-full p-3 shadow-md border-4 border-signal-white">
                <Quote size={20} className="text-white fill-white" />
              </div>
              
              {/* Estrellas */}
              <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i + review.rating} size={18} className="fill-gray-200 text-gray-200" />
                  ))}
              </div>

              {/* Texto de la resenña */}
              <p className="text-gray-600 italic mb-8">&quot;{review.text}&quot;</p>
              
              {/* Autor */}
              <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="font-bold text-dark-blue">{review.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

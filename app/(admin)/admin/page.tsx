import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Estudiantes Totales", value: "1,240", icon: Users, color: "bg-blue-500" },
    { title: "Cursos Activos", value: "12", icon: BookOpen, color: "bg-primary-turquoise" },
    { title: "Ingresos Mes", value: "$4,320", icon: DollarSign, color: "bg-luxury-gold" },
    { title: "Tasa Finalización", value: "85%", icon: TrendingUp, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <h1 className="font-playfair text-3xl font-bold text-text-darkBlue">Resumen General</h1>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white shadow-md`}>
                <stat.icon size={24} />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-text-darkBlue">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Espacio para gráficos futuros */}
      <div className="bg-white h-96 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
          <p>Gráfico de actividad de estudiantes (Placeholder)</p>
      </div>
    </div>
  );
}
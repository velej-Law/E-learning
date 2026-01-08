"use client";

import { useState } from "react";
import { 
  Search, Plus, Filter, Trash2, Edit, 
  Mail, BookOpen, Calendar, Save, X, Layers
} from "lucide-react";
import { clsx } from "clsx";

// --- TIPOS DE DATOS ---
interface Student {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  enrolledCourses: string[]; // CAMBIO: Ahora es un array de strings
  progress: number; // Promedio global o lógica personalizada
  lastAccess: string;
  avatarInitial: string;
}

// --- LISTA DE CURSOS DISPONIBLES (Para el select y filtros) ---
const AVAILABLE_COURSES = [
  "Fundamentos de Talasoterapia",
  "Hidroterapia Marina Avanzada",
  "Aplicaciones de Algas y Fangos",
  "Gestión de Centros de Bienestar",
  "Climatoterapia Marina"
];

// --- DATOS MOCK INICIALES ---
const initialStudents: Student[] = [
  { 
    id: "1", 
    name: "Jordy Vele", 
    email: "jordy@marevitae.com", 
    status: "active", 
    enrolledCourses: ["Fundamentos de Talasoterapia", "Hidroterapia Marina Avanzada"], 
    progress: 45, 
    lastAccess: "Hace 2 horas", 
    avatarInitial: "JV" 
  },
  { 
    id: "2", 
    name: "María González", 
    email: "maria@email.com", 
    status: "active", 
    enrolledCourses: ["Hidroterapia Marina Avanzada"], 
    progress: 85, 
    lastAccess: "Ayer", 
    avatarInitial: "MG" 
  },
  { 
    id: "3", 
    name: "Carlos Perez", 
    email: "carlos@email.com", 
    status: "inactive", 
    enrolledCourses: ["Fundamentos de Talasoterapia", "Gestión de Centros de Bienestar", "Climatoterapia Marina"], 
    progress: 12, 
    lastAccess: "Hace 5 días", 
    avatarInitial: "CP" 
  },
  { 
    id: "4", 
    name: "Ana Lopez", 
    email: "ana@email.com", 
    status: "suspended", 
    enrolledCourses: [], 
    progress: 0, 
    lastAccess: "Hace 1 mes", 
    avatarInitial: "AL" 
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  
  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all"); // Nuevo filtro por curso

  // --- LÓGICA CRUD ---

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este estudiante?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const openCreateModal = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Obtener todos los checkboxes marcados con name="courses"
    const selectedCourses = formData.getAll("courses") as string[];

    const newData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      enrolledCourses: selectedCourses,
      status: formData.get("status") as "active" | "inactive",
      progress: currentStudent ? currentStudent.progress : 0,
      lastAccess: currentStudent ? currentStudent.lastAccess : "Hoy",
      avatarInitial: (formData.get("name") as string).substring(0,2).toUpperCase(),
    };

    if (currentStudent) {
      setStudents(students.map(s => s.id === currentStudent.id ? { ...s, ...newData } : s));
    } else {
      setStudents([...students, { ...newData, id: Date.now().toString() } as Student]);
    }
    setIsModalOpen(false);
  };

  // --- FILTRADO AVANZADO ---
  const filteredStudents = students.filter(student => {
    // 1. Buscador texto
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Filtro Estado
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;

    // 3. Filtro Curso (Nuevo): ¿El estudiante tiene este curso en su lista?
    const matchesCourse = filterCourse === "all" || student.enrolledCourses.includes(filterCourse);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-playfair text-3xl font-bold text-text-darkBlue">Estudiantes</h1>
            <p className="text-gray-500 text-sm">Gestiona el acceso, progreso y matrículas de los alumnos.</p>
        </div>
        <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-primary-turquoise text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-all"
        >
            <Plus size={20} /> Registrar Alumno
        </button>
      </div>

      {/* BARRA DE HERRAMIENTAS (Filtros) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4 items-center justify-between">
         
         {/* Buscador */}
         <div className="relative w-full xl:w-96">
            <input 
                type="text" 
                placeholder="Buscar por nombre o correo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-turquoise"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
         </div>

         {/* Grupo de Filtros Dropdown */}
         <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            
            {/* Filtro: CURSO (Nuevo) */}
            <div className="relative w-full sm:w-auto">
                <select 
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="w-full sm:w-64 appearance-none bg-bg-mist border border-gray-200 text-gray-700 py-2 px-4 pr-10 rounded-lg text-sm font-medium focus:outline-none cursor-pointer truncate"
                >
                    <option value="all">Todos los cursos</option>
                    {AVAILABLE_COURSES.map(course => (
                        <option key={course} value={course}>{course}</option>
                    ))}
                </select>
                <Layers className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Filtro: ESTADO */}
            <div className="relative w-full sm:w-auto">
                <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-48 appearance-none bg-bg-mist border border-gray-200 text-gray-700 py-2 px-4 pr-10 rounded-lg text-sm font-medium focus:outline-none cursor-pointer"
                >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                    <option value="suspended">Suspendidos</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
         </div>
      </div>

      {/* TABLA DE DATOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                        <th className="px-6 py-4">Estudiante</th>
                        <th className="px-6 py-4">Cursos Inscritos</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4">Progreso Global</th>
                        <th className="px-6 py-4">Último Acceso</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                            
                            {/* Identidad */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-turquoise/10 text-primary-turquoise flex items-center justify-center font-bold text-xs border border-primary-turquoise/20">
                                        {student.avatarInitial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-darkBlue text-sm">{student.name}</p>
                                        <p className="text-gray-400 text-xs">{student.email}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Cursos (Multi-badge visualización) */}
                            <td className="px-6 py-4 max-w-xs">
                                <div className="flex flex-wrap gap-1.5">
                                    {student.enrolledCourses.length > 0 ? (
                                        student.enrolledCourses.map((course, idx) => (
                                            <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100 truncate max-w-[150px]">
                                                {course}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">Sin inscripción</span>
                                    )}
                                </div>
                            </td>

                            {/* Estado */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                    student.status === 'active' && "bg-green-50 text-green-600 border-green-100",
                                    student.status === 'inactive' && "bg-gray-50 text-gray-500 border-gray-200",
                                    student.status === 'suspended' && "bg-red-50 text-red-500 border-red-100",
                                )}>
                                    {student.status === 'active' ? 'Activo' : student.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                                </span>
                            </td>

                            {/* Progreso */}
                            <td className="px-6 py-4 w-40">
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div 
                                            className="bg-primary-turquoise h-full rounded-full" 
                                            style={{ width: `${student.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-500">{student.progress}%</span>
                                </div>
                            </td>

                            {/* Acceso */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <Calendar size={14} />
                                    {student.lastAccess}
                                </div>
                            </td>

                            {/* Acciones */}
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => openEditModal(student)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(student.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                No se encontraron estudiantes con esos criterios.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Mostrando {filteredStudents.length} resultados</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Siguiente</button>
            </div>
        </div>
      </div>

      {/* --- MODAL (CREATE / EDIT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
                    <h3 className="font-playfair font-bold text-lg text-text-darkBlue">
                        {currentStudent ? "Editar Estudiante" : "Registrar Nuevo Alumno"}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Nombre Completo</label>
                            <input 
                                name="name"
                                defaultValue={currentStudent?.name}
                                required
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-turquoise text-sm"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    name="email"
                                    defaultValue={currentStudent?.email}
                                    required
                                    type="email" 
                                    className="w-full pl-9 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-turquoise text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN MULTI-CURSO (Checkboxes) */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                            <BookOpen size={14} /> Cursos Inscritos
                        </label>
                        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 max-h-40 overflow-y-auto space-y-2">
                            {AVAILABLE_COURSES.map((course) => {
                                const isChecked = currentStudent?.enrolledCourses.includes(course);
                                return (
                                    <label key={course} className="flex items-start gap-3 cursor-pointer p-2 hover:bg-white rounded transition-colors">
                                        <input 
                                            type="checkbox" 
                                            name="courses" 
                                            value={course}
                                            defaultChecked={isChecked}
                                            className="mt-0.5 rounded text-primary-turquoise focus:ring-primary-turquoise border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700 leading-tight">{course}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Estado de la cuenta</label>
                        <div className="flex gap-4 p-3 border border-gray-200 rounded-lg">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="radio" name="status" value="active" defaultChecked={currentStudent?.status === 'active' || !currentStudent} className="text-primary-turquoise focus:ring-primary-turquoise" />
                                <span className="text-green-700 font-medium">Activo</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="radio" name="status" value="inactive" defaultChecked={currentStudent?.status === 'inactive'} className="text-primary-turquoise focus:ring-primary-turquoise" />
                                <span className="text-gray-500 font-medium">Inactivo</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-2 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-2 bg-primary-turquoise text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            <Save size={16} /> Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}
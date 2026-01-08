"use client";

import { useState } from "react";
import { 
  Search, LayoutGrid, Plus, Trash2, Edit, X, 
  Save, Video, FileText, ChevronRight, ChevronDown, 
  MoreVertical, Image as ImageIcon, ArrowLeft, Layers
} from "lucide-react";
import { CourseProps } from "@/components/courses/CourseCard"; 
import { clsx } from "clsx";

// --- TIPOS DE DATOS AVANZADOS ---

type LessonType = "video" | "text";

interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  content: string; 
  duration?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Extendemos la interfaz base
interface FullCourse extends CourseProps {
  description?: string;
  modules: Module[];
}

// --- DATOS MOCK INICIALES ---
const initialCourses: FullCourse[] = [
  {
    id: "1",
    title: "Fundamentos de Talasoterapia",
    instructor: "Montserrat Regular",
    parallel: "Paralelo 1",
    imageSrc: "/course1.jpg",
    progress: 38, // Este dato ya no afectará visualmente
    slug: "fundamentos-talasoterapia",
    modules: [
        {
            id: "m1", title: "Introducción", lessons: [
                { id: "l1", title: "Bienvenida", type: "text", content: "Bienvenidos al curso..." },
                { id: "l2", title: "Historia", type: "video", content: "video_url.mp4" }
            ]
        }
    ]
  },
  {
    id: "2",
    title: "Hidroterapia Marina Avanzada",
    instructor: "Montserrat Regular",
    parallel: "Paralelo 1",
    imageSrc: "/course2.jpg",
    progress: 8,
    slug: "hidroterapia-avanzada",
    modules: []
  },
];

// --- COMPONENTE LOCAL: TARJETA DE ADMIN (Sin barra de progreso) ---
const AdminCourseCard = ({ course }: { course: FullCourse }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
        
        {/* IMAGEN DEL CURSO (Sin Barra de Progreso) */}
        <div className="relative h-48 w-full bg-gray-200">
          <div className="absolute inset-0 bg-primary-dark/20 flex items-center justify-center text-gray-500">
               <span className="text-xs font-bold text-white/50 uppercase">Imagen del curso</span>
          </div>
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
        </div>
  
        {/* CONTENIDO */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-playfair font-bold text-lg leading-tight text-text-darkBlue uppercase mb-2 line-clamp-2 min-h-[3rem]">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-1">{course.instructor}</p>
            <p className="text-xs text-gray-400 font-light mb-4">{course.parallel}</p>
          </div>
  
          {/* BOTÓN ESTANDARIZADO (Ver Detalles) */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <button className="w-full py-2.5 px-4 rounded-md font-bold text-xs shadow-md transition-all uppercase tracking-wider bg-primary-turquoise text-white hover:bg-primary-dark">
                Ver Detalles
            </button>
          </div>
        </div>
      </div>
    );
};

// --- COMPONENTE: CONSTRUCTOR DE CURSO (BUILDER) ---
const CourseBuilder = ({ 
    course, 
    onSave, 
    onCancel 
}: { 
    course: FullCourse | null, 
    onSave: (c: FullCourse) => void, 
    onCancel: () => void 
}) => {
    const [formData, setFormData] = useState<FullCourse>(course || {
        id: Date.now().toString(),
        title: "Nuevo Curso Sin Título",
        instructor: "Admin",
        parallel: "Paralelo 1",
        imageSrc: "/placeholder.jpg",
        progress: 0,
        slug: "",
        modules: []
    });

    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

    const addModule = () => {
        const newModule: Module = { id: Date.now().toString(), title: "Nuevo Módulo", lessons: [] };
        setFormData({ ...formData, modules: [...formData.modules, newModule] });
    };

    const addLesson = (moduleId: string, type: LessonType) => {
        const newLesson: Lesson = {
            id: Date.now().toString(),
            title: type === 'video' ? "Nueva Video-Lección" : "Nueva Lectura",
            type: type,
            content: ""
        };
        const updatedModules = formData.modules.map(m => {
            if (m.id === moduleId) return { ...m, lessons: [...m.lessons, newLesson] };
            return m;
        });
        setFormData({ ...formData, modules: updatedModules });
        setActiveLessonId(newLesson.id);
    };

    const deleteModule = (moduleId: string) => {
        if(!confirm("¿Borrar módulo y su contenido?")) return;
        setFormData({ ...formData, modules: formData.modules.filter(m => m.id !== moduleId) });
    };

    const deleteLesson = (moduleId: string, lessonId: string) => {
        if(!confirm("¿Borrar lección?")) return;
        const updatedModules = formData.modules.map(m => {
            if (m.id === moduleId) return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
            return m;
        });
        setFormData({ ...formData, modules: updatedModules });
        if (activeLessonId === lessonId) setActiveLessonId(null);
    };

    let activeLesson: Lesson | undefined;
    let activeModuleId: string | undefined;
    formData.modules.forEach(m => {
        const l = m.lessons.find(l => l.id === activeLessonId);
        if (l) { activeLesson = l; activeModuleId = m.id; }
    });

    const updateActiveLesson = (field: keyof Lesson, value: string) => {
        if (!activeModuleId || !activeLesson) return;
        const updatedModules = formData.modules.map(m => {
            if (m.id === activeModuleId) {
                const updatedLessons = m.lessons.map(l => l.id === activeLessonId ? { ...l, [field]: value } : l);
                return { ...m, lessons: updatedLessons };
            }
            return m;
        });
        setFormData({ ...formData, modules: updatedModules });
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col animate-in slide-in-from-bottom-5">
            {/* Header del Builder */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <input 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="font-playfair font-bold text-xl text-text-darkBlue bg-transparent border-b border-transparent focus:border-primary-turquoise focus:outline-none w-96"
                            placeholder="Título del Curso"
                        />
                        <p className="text-xs text-gray-400">Modo Edición</p>
                    </div>
                </div>
                <button onClick={() => onSave(formData)} className="flex items-center gap-2 bg-primary-turquoise text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-primary-dark transition-all">
                    <Save size={18} /> Guardar Curso
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* SIDEBAR: Estructura */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <span className="font-bold text-xs text-gray-500 uppercase">Estructura</span>
                        <button onClick={addModule} className="text-primary-turquoise hover:text-primary-dark text-xs font-bold flex items-center gap-1">
                            <Plus size={14} /> Módulo
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        {formData.modules.map((module) => (
                            <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center group">
                                    <input 
                                        value={module.title}
                                        onChange={(e) => {
                                            const updated = formData.modules.map(m => m.id === module.id ? {...m, title: e.target.value} : m);
                                            setFormData({...formData, modules: updated});
                                        }}
                                        className="bg-transparent font-bold text-sm text-gray-700 w-full focus:outline-none"
                                    />
                                    <button onClick={() => deleteModule(module.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                                </div>
                                <div className="p-2 space-y-1">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} onClick={() => setActiveLessonId(lesson.id)} className={clsx("flex items-center gap-2 p-2 rounded cursor-pointer text-sm", activeLessonId === lesson.id ? "bg-primary-turquoise/10 text-primary-turquoise font-medium" : "hover:bg-gray-50 text-gray-600")}>
                                            {lesson.type === 'video' ? <Video size={14}/> : <FileText size={14}/>}
                                            <span className="truncate flex-1">{lesson.title}</span>
                                            <button onClick={(e) => { e.stopPropagation(); deleteLesson(module.id, lesson.id); }} className="hover:text-red-500 text-gray-300"><X size={12}/></button>
                                        </div>
                                    ))}
                                    <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
                                        <button onClick={() => addLesson(module.id, 'text')} className="flex-1 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center gap-1"><FileText size={10}/> + Texto</button>
                                        <button onClick={() => addLesson(module.id, 'video')} className="flex-1 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center gap-1"><Video size={10}/> + Video</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EDITOR */}
                <div className="flex-1 bg-bg-mist p-8 overflow-y-auto">
                    {activeLesson ? (
                        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px] flex flex-col">
                            <div className="border-b border-gray-100 p-4 flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${activeLesson.type === 'video' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {activeLesson.type === 'video' ? <Video size={24}/> : <FileText size={24}/>}
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Título de la Lección</label>
                                    <input value={activeLesson.title} onChange={(e) => updateActiveLesson("title", e.target.value)} className="w-full font-playfair font-bold text-xl text-text-darkBlue focus:outline-none"/>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                {activeLesson.type === 'text' ? (
                                    <>
                                        <label className="text-xs font-bold text-gray-500 mb-2 block">Contenido (Texto / HTML)</label>
                                        <textarea value={activeLesson.content} onChange={(e) => updateActiveLesson("content", e.target.value)} className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise resize-none font-mono text-sm" placeholder="Escribe aquí..."/>
                                    </>
                                ) : (
                                    <>
                                        <label className="text-xs font-bold text-gray-500 mb-2 block">URL del Video</label>
                                        <div className="flex gap-2 mb-4">
                                            <input value={activeLesson.content} onChange={(e) => updateActiveLesson("content", e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-turquoise" placeholder="https://vimeo.com/..."/>
                                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-600">Subir</button>
                                        </div>
                                        <div className="flex-1 bg-black rounded-xl flex items-center justify-center text-white/50"><Video size={48} /><span className="ml-2">Vista Previa</span></div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon size={64} className="mb-4 opacity-20"/><p className="text-lg font-medium">Selecciona una lección para editar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- PÁGINA PRINCIPAL DE GESTIÓN ---
export default function AdminCursosPage() {
  const [courses, setCourses] = useState<FullCourse[]>(initialCourses);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<FullCourse | null>(null);

  const handleCreateNew = () => { setEditingCourse(null); setIsBuilderOpen(true); };
  const handleEdit = (course: FullCourse) => { setEditingCourse(course); setIsBuilderOpen(true); };
  const handleDelete = (id: string) => { if(confirm("¿Eliminar curso?")) setCourses(courses.filter(c => c.id !== id)); };
  const handleSaveCourse = (savedCourse: FullCourse) => {
    if (editingCourse) setCourses(courses.map(c => c.id === savedCourse.id ? savedCourse : c));
    else setCourses([...courses, savedCourse]);
    setIsBuilderOpen(false);
  };

  if (isBuilderOpen) return <CourseBuilder course={editingCourse} onSave={handleSaveCourse} onCancel={() => setIsBuilderOpen(false)} />;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-playfair text-3xl font-bold text-text-darkBlue">Gestión de Cursos</h1>
            <p className="text-gray-500 text-sm">Administra el catálogo académico y crea nuevos contenidos.</p>
        </div>
        <div className="flex gap-3">
             <div className="relative">
                <input type="text" placeholder="Buscar curso..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-turquoise w-64"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             </div>
             <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"><LayoutGrid size={20} /></button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* TARJETA "CREAR NUEVO" */}
        <button onClick={handleCreateNew} className="group h-full min-h-[320px] bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-turquoise hover:bg-primary-turquoise/5 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-primary-turquoise/20 flex items-center justify-center mb-4 transition-colors"><Plus size={32} className="text-gray-400 group-hover:text-primary-turquoise" /></div>
            <h3 className="font-playfair font-bold text-lg text-gray-500 group-hover:text-primary-turquoise transition-colors">Crear Nuevo Curso</h3>
            <p className="text-xs text-gray-400 mt-2 px-8 text-center">Configura módulos, lecciones y tareas</p>
        </button>

        {/* LISTADO DE CURSOS (Usando AdminCourseCard) */}
        {courses.map((course) => (
          <div key={course.id} className="relative group">
             <div className="relative h-full">
                 <AdminCourseCard course={course} />
                 {/* OVERLAY DE ACCIONES */}
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-xl z-10">
                     <button onClick={() => handleEdit(course)} className="p-3 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform shadow-lg" title="Editar Contenido"><Edit size={20} /></button>
                     <button onClick={() => handleDelete(course.id)} className="p-3 bg-white text-red-500 rounded-full hover:scale-110 transition-transform shadow-lg" title="Eliminar Curso"><Trash2 size={20} /></button>
                 </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
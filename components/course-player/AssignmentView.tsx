"use client"; // Necesario para la interactividad del input file

import { useState, useRef } from "react";
import { UploadCloud, Calendar, AlertCircle, FileText, File, X, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

/**
 * COMPONENTE: VISTA DE ENTREGA DE TAREA
 * ------------------------------------------------------------------
 * Este componente maneja la interfaz para que el estudiante suba sus archivos.
 * Actualmente simula la selección local de archivos.
 */
export default function AssignmentView() {
  
  // Referencia al input HTML oculto para dispararlo manualmente
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para guardar el archivo seleccionado localmente (Feedback visual)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * MANEJADOR DE CLIC EN ÁREA DE CARGA
   * Redirige el clic del div decorativo al input file oculto.
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * MANEJADOR DE CAMBIO DE ARCHIVO
   * Se ejecuta cuando el usuario selecciona un archivo del explorador.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 🔴 BACKEND TODO: Aquí se podría validar el tamaño (max 25MB) y el tipo (PDF/MP4) antes de setear el estado.
    }
  };

  /**
   * MANEJADOR PARA QUITAR ARCHIVO
   * Permite al usuario deseleccionar el archivo antes de enviar.
   */
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se vuelva a abrir el explorador de archivos
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
    }
  };

  /**
   * MANEJADOR DE ENVÍO FINAL
   */
  const handleSubmitAssignment = () => {
    if (!selectedFile) return;
    
    // 🔴 BACKEND TODO: Integración de Subida (Upload)
    // 1. Crear instancia de FormData: const formData = new FormData();
    // 2. formData.append('file', selectedFile);
    // 3. formData.append('assignmentId', 'task-1');
    // 4. Enviar POST a /api/student/assignments/submit
    // 5. Manejar progreso de subida (Upload Progress) si es posible.
    
    alert(`Simulando envío de: ${selectedFile.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      
      {/* --- CABECERA DE LA TAREA --- */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-turquoise/10 text-primary-turquoise text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Tarea Práctica
            </span>
            <span className="bg-red-50 text-action-coral text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <AlertCircle size={12}/> Pendiente
            </span>
        </div>
        <h1 className="font-playfair text-3xl font-bold text-text-darkBlue mb-4">
          Práctica de Talasoterapia
        </h1>
        <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-luxury-gold"/>
                <span>Vence: <strong>Domingo, 30 de Mayo</strong></span>
            </div>
            <div className="flex items-center gap-2">
                <FileText size={16} className="text-luxury-gold"/>
                <span>Puntos: <strong>10/10</strong></span>
            </div>
        </div>
      </div>

      {/* --- INSTRUCCIONES --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 prose prose-slate max-w-none">
        <h3 className="font-bold text-text-darkBlue mb-2">Instrucciones de la entrega</h3>
        <p className="text-gray-600 mb-4">
            Basado en el módulo anterior, debes realizar un video corto (máx 2 min) o redactar un documento PDF explicando 
            la técnica correcta para la aplicación de lodos marinos en la zona lumbar.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Formato aceptado: PDF, MP4, DOCX.</li>
            <li>Peso máximo: 25MB.</li>
            <li>Asegúrate de citar las fuentes bibliográficas.</li>
        </ul>
      </div>

      {/* --- ÁREA DE CARGA (UPLOAD AREA) --- */}
      <div>
        {/* Input Oculto */}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.docx,.mp4" // Restricción nativa del navegador
        />

        {!selectedFile ? (
            // ESTADO 1: NO HAY ARCHIVO SELECCIONADO (Mostrar zona de Drop)
            <div 
                onClick={handleUploadClick}
                className="bg-bg-mist/50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-primary-turquoise hover:bg-primary-turquoise/5 transition-all cursor-pointer group"
            >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-primary-turquoise" />
                </div>
                <h3 className="text-lg font-bold text-text-darkBlue mb-1">Arrastra tu archivo aquí</h3>
                <p className="text-sm text-gray-500 mb-6">o haz clic para buscar en tu ordenador</p>
                <button className="px-6 py-2 bg-primary-turquoise text-white font-bold rounded-md shadow hover:bg-primary-dark transition-colors">
                    Seleccionar Archivo
                </button>
            </div>
        ) : (
            // ESTADO 2: ARCHIVO SELECCIONADO (Mostrar preview y confirmación)
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-turquoise/10 rounded-lg flex items-center justify-center text-primary-turquoise">
                            <File size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-text-darkBlue text-sm">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Listo para subir</p>
                        </div>
                    </div>
                    <button 
                        onClick={removeFile}
                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-action-coral rounded-full transition-colors"
                        title="Quitar archivo"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={removeFile}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-text-darkBlue transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSubmitAssignment}
                        className="px-6 py-2 bg-primary-turquoise text-white font-bold rounded-md shadow hover:bg-primary-dark transition-all flex items-center gap-2"
                    >
                        <CheckCircle2 size={16} /> Enviar Entrega
                    </button>
                </div>
            </div>
        )}
      </div>

    </div>
  );
}
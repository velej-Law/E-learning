"use client";

import { useState, useRef  } from "react";
import { User, Mail, Phone, MapPin, Lock, Camera, Save, Loader2, ShieldCheck, Upload } from "lucide-react";
import Image from "next/image"; // Importamos el componente optimizado de Next.js
import { clsx } from "clsx";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
// Estado para la URL de la imagen de perfil. 
  // Inicialmente puede ser null o una URL por defecto de tu carpeta público.
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); 

  // Referencia al input file oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado del formulario (Simulado)
  const [formData, setFormData] = useState({
    firstName: "Jordy Joel",
    lastName: "Vele Carrera",
    email: "jordy.vele@marevitae.com",
    phone: "+593 99 123 4567",
    location: "Riobamba, Ecuador",
    bio: "Estudiante apasionado por la talasoterapia y el bienestar marino. Buscando especializarme en tratamientos con algas."
  });

  // Función para disparar el selector de archivos
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Función que maneja la selección del archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validaciones básicas (opcional: tamaño, tipo)
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido.");
      return;
    }

    setIsUploadingImage(true);

    // Simular subida al servidor (Aquí iría la llamada a tu API Backend real)
    setTimeout(() => {
      // Crear una URL local temporal para previsualizar la imagen
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      setIsUploadingImage(false);
      
      // NOTA IMPORTANTE PARA BACKEND: 
      // En un escenario real, aquí enviarías 'file' (FormData) a tu endpoint API.
      // Y el backend te devolvería la URL final de la imagen en S3/Cloudinary.
    }, 1500); // Simulamos 1.5s de espera
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false);
      alert("Perfil actualizado correctamente");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-mist pb-20">
      
      {/* --- CABECERA DECORATIVA --- */}
      <div className="h-48 bg-hero-gradient relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-luxury-gold rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- COLUMNA IZQUIERDA: TARJETA DE IDENTIDAD --- */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              
              <div className="p-8 flex flex-col items-center text-center border-b border-gray-100">
                {/* --- SECCIÓN DEL AVATAR INTERACTIVO --- */}
                <div className="relative mb-4 group">
                    
                    {/* Input file oculto */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/png, image/jpeg, image/jpg" // Restringir tipos
                        className="hidden" 
                    />

                    {/* Contenedor de la imagen (Clickeable) */}
                    <button 
                        onClick={handleAvatarClick}
                        disabled={isUploadingImage}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-200 overflow-hidden relative block"
                    >
                        {/* Estado de carga mientras se "sube" */}
                        {isUploadingImage && (
                             <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
                                 <Loader2 className="text-white animate-spin" size={32} />
                             </div>
                        )}

                        {/* Renderizado Condicional: Imagen o Placeholder */}
                        {avatarUrl ? (
                            <Image 
                                src={avatarUrl}
                                alt="Foto de perfil"
                                fill // Ocupa todo el contenedor padre
                                className="object-cover"
                                // Como son URLs blob locales, no necesitamos optimización remota de Next.js por ahora
                                unoptimized 
                            />
                        ) : (
                            // Placeholder si no hay imagen
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-3xl font-playfair font-bold">
                                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                            </div>
                        )}
                    </button>

                    {/* Overlay de cámara al hacer hover (Solo si no está cargando) */}
                    {!isUploadingImage && (
                        <div 
                            onClick={handleAvatarClick}
                            className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                        >
                            <Upload className="text-white w-8 h-8" />
                            <span className="text-white text-xs font-bold absolute bottom-6">Cambiar foto</span>
                        </div>
                    )}
                    
                    {/* Icono pequeño de cámara fijo */}
                    <div className="absolute bottom-1 right-1 bg-luxury-gold p-2 rounded-full border-2 border-white shadow-sm z-20 pointer-events-none">
                        <Camera size={14} className="text-white" />
                    </div>
                </div>
                {/* --- FIN SECCIÓN AVATAR --- */}

                <h2 className="font-playfair font-bold text-2xl text-text-darkBlue mb-1">
                    {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-primary-turquoise font-medium text-sm uppercase tracking-wider mb-4">
                    Estudiante Premium
                </p>

                {/* Badges / Etiquetas */}
                <div className="flex gap-2 justify-center flex-wrap">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                        <ShieldCheck size={12} /> Cuenta Verificada
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                        Nivel 3
                    </span>
                </div>
              </div>

              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-2 divide-x divide-gray-100 bg-gray-50/50">
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                      <span className="block font-playfair text-xl font-bold text-text-darkBlue">12</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Cursos Completados</span>
                  </div>
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                      <span className="block font-playfair text-xl font-bold text-text-darkBlue">85%</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Promedio Global</span>
                  </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-text-darkBlue text-sm mb-3">Tu Biografía</h3>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                    "{formData.bio}"
                </p>
              </div>

            </div>
          </div>

          {/* --- COLUMNA DERECHA: FORMULARIOS DE EDICIÓN --- */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* 1. SECCIÓN: INFORMACIÓN PERSONAL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <h3 className="font-playfair font-bold text-lg text-text-darkBlue flex items-center gap-2">
                        <User size={18} className="text-luxury-gold" /> Información Personal
                    </h3>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                        <input 
                            type="text" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise focus:ring-1 focus:ring-primary-turquoise transition-all text-sm font-medium"
                        />
                    </div>
                    {/* Apellido */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Apellido</label>
                        <input 
                            type="text" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise focus:ring-1 focus:ring-primary-turquoise transition-all text-sm font-medium"
                        />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="email" 
                                value={formData.email}
                                disabled // Email suele ser inmutable
                                className="w-full pl-10 p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed text-sm"
                            />
                        </div>
                    </div>
                     {/* Telefono */}
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Teléfono</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full pl-10 p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise focus:ring-1 focus:ring-primary-turquoise transition-all text-sm font-medium"
                            />
                        </div>
                    </div>
                    {/* Ubicación (Full width) */}
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Ubicación</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full pl-10 p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise focus:ring-1 focus:ring-primary-turquoise transition-all text-sm font-medium"
                            />
                        </div>
                    </div>
                    
                    {/* Bio (Full width) */}
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Sobre mí</label>
                        <textarea 
                            rows={3}
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="w-full p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise focus:ring-1 focus:ring-primary-turquoise transition-all text-sm font-medium resize-none"
                        />
                    </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-primary-turquoise text-white px-6 py-2 rounded-md font-bold text-sm shadow hover:bg-primary-dark transition-all"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Guardar Cambios
                    </button>
                </div>
            </div>

            {/* 2. SECCIÓN: SEGURIDAD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <h3 className="font-playfair font-bold text-lg text-text-darkBlue flex items-center gap-2">
                        <Lock size={18} className="text-luxury-gold" /> Seguridad
                    </h3>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nueva Contraseña</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise transition-all text-sm"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Confirmar Contraseña</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 bg-bg-mist/30 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise transition-all text-sm"/>
                    </div>
                </div>
                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button className="text-gray-500 hover:text-text-darkBlue font-bold text-sm underline px-4">Cancelar</button>
                    <button className="bg-white border border-gray-300 text-text-darkBlue px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-gray-50 transition-all ml-2">
                        Actualizar Contraseña
                    </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
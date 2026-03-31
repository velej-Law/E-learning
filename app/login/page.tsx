"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Importante: Hook de navegación
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); // 2. Instanciamos el router
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
// 🔴 BACKEND TODO: Aquí comienza la integración real
    // 1. Enviar POST a /api/auth/login con formData.email y formData.password
    // 2. Esperar respuesta (await).
    // 3. Si es exitoso: Guardar el token (JWT) en Cookies HttpOnly o LocalStorage.
    // 4. Si falla: Mostrar error en la UI (ej: setErrorMessage("Credenciales inválidas")).

    // Simulación de espera del servidor
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulación exitosa: Redirigimos al Dashboard (Área Personal)
      console.log("Login exitoso, redirigiendo...");
      router.push('/'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-signal-white relative z-10">
      
      {/* --- SECCIÓN IZQUIERDA: VISUAL --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-hero-gradient items-center justify-center overflow-hidden">
        {/* Patrón de fondo opcional */}
        <div className="absolute inset-0 opacity-15 bg-[url('/Textura.png')] bg-cover bg-center"></div>
        
        <div className="relative z-10 text-center px-12 text-white max-w-lg">
          <div className="mb-8 flex justify-center">
             <img src="/Isotipo.png" alt="Logicube" className="h-24 w-auto drop-shadow-2xl" />
          </div>
          <h2 className="font-space-grotesk text-4xl font-bold mb-6 leading-tight">
             <span className="text-pure-white font-black drop-shadow-lg">Logicube</span>
          </h2>
          <p className="font-syne text-gray-300 text-sm leading-relaxed tracking-wide">
            Desarrollo y Asesoría TI. Accede a tu espacio personal.
          </p>
        </div>
      </div>

      {/* --- SECCIÓN DERECHA: FORMULARIO --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative">
        
        {/* Botón "Volver" flotante móvil */}
        <div className="absolute top-6 right-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-luminous-orange font-bold flex items-center gap-2 transition-colors">
                Volver al inicio <ArrowRight size={16}/>
            </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Header del Formulario */}
          <div className="text-center lg:text-left">
            <h1 className="font-space-grotesk text-3xl font-bold text-dark-blue mb-2">Bienvenido de nuevo</h1>
            <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder al aula.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            
            {/* Input Email */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-ultramarine-blue uppercase tracking-wider ml-1">Correo Electrónico</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-luminous-orange transition-colors" />
                    </div>
                    <input 
                        type="email" 
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luminous-orange/20 focus:border-luminous-orange transition-all bg-signal-white"
                        placeholder="ejemplo@logicube.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
                 <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-ultramarine-blue uppercase tracking-wider">Contraseña</label>
                    <a href="#" className="text-xs text-luminous-orange hover:text-dark-blue font-medium transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-luminous-orange transition-colors" />
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luminous-orange/20 focus:border-luminous-orange transition-all bg-signal-white"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Botón Login */}
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 rounded-md bg-orange-gradient text-white font-bold shadow-lg shadow-luminous-orange/30 hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Iniciando...
                    </>
                ) : (
                    "Iniciar Sesión"
                )}
            </button>
          </form>

          {/* Footer del Formulario */}
          <div className="mt-6 text-center">
             <p className="text-sm text-gray-500">
                ¿No tienes una cuenta?{' '}
                <a href="#" className="font-bold text-dark-blue hover:text-luminous-orange transition-colors">
                    Contactar soporte
                </a>
             </p>
          </div>

           {/* Decoración inferior */}
           <div className="pt-8 mt-8 border-t border-gray-100 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Aquí irían logos de partners o certificaciones */}
                <div className="h-8 w-8 rounded bg-gray-200"></div>
                <div className="h-8 w-8 rounded bg-gray-200"></div>
                <div className="h-8 w-8 rounded bg-gray-200"></div>
           </div>

        </div>
      </div>
    </div>
  );
}
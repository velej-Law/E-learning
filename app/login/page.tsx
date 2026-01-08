"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react"; // Agregamos ShieldCheck

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 🔴 BACKEND TODO: Aquí comienza la integración real
    // ... (Lógica de backend igual que antes) ...

    setTimeout(() => {
      setIsLoading(false);
      console.log("Login exitoso, redirigiendo...");
      router.push('/'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white relative z-10">
      
      {/* --- SECCIÓN IZQUIERDA: VISUAL (Sin cambios) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-hero-gradient items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-turquoise rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-luxury-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-center px-12 text-white max-w-lg">
          <div className="mb-8 flex justify-center">
             <div className="w-20 h-20 rounded-full border-2 border-luxury-gold flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl">
                 <span className="font-playfair text-3xl font-bold">MV</span>
             </div>
          </div>
          <h2 className="font-playfair text-4xl font-bold mb-6 leading-tight">
            Descubre el poder del mar <br/> <span className="text-luxury-gold italic">en tu formación</span>
          </h2>
          <p className="font-montserrat text-gray-200 text-sm leading-relaxed tracking-wide">
            Accede a tu espacio personal y continúa tu viaje en la Talasoterapia profesional con Mare Vitae International.
          </p>
        </div>
      </div>

      {/* --- SECCIÓN DERECHA: FORMULARIO --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative">
        
        {/* ⭐️ CAMBIO AQUÍ: BARRA DE NAVEGACIÓN SUPERIOR DERECHA 
            Hemos agrupado los botones en un flex container.
        */}
        <div className="absolute top-6 right-6 flex items-center gap-6">
            
            {/* Botón MODO ADMIN (Nuevo) */}
            <Link 
                href="/admin" // Asumimos que esta será la ruta (la crearemos luego)
                className="text-xs font-bold text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 uppercase tracking-widest group"
            >
                <ShieldCheck size={16} className="text-gray-300 group-hover:text-luxury-gold transition-colors" />
                <span>Admin</span>
            </Link>

            {/* Separador Visual */}
            <div className="h-4 w-px bg-gray-200"></div>

            {/* Botón VOLVER AL INICIO (Original) */}
            <Link href="/" className="text-sm text-gray-400 hover:text-primary-turquoise font-bold flex items-center gap-2 transition-colors">
                Volver al inicio <ArrowRight size={16}/>
            </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Header del Formulario */}
          <div className="text-center lg:text-left">
            <h1 className="font-playfair text-3xl font-bold text-text-darkBlue mb-2">Bienvenido de nuevo</h1>
            <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder al aula.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            
            {/* Input Email */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-text-darkBlue uppercase tracking-wider ml-1">Correo Electrónico</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-turquoise transition-colors" />
                    </div>
                    <input 
                        type="email" 
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-turquoise/20 focus:border-primary-turquoise transition-all bg-bg-mist/30"
                        placeholder="ejemplo@marevitae.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
                 <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-text-darkBlue uppercase tracking-wider">Contraseña</label>
                    <a href="#" className="text-xs text-primary-turquoise hover:text-primary-dark font-medium transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-luxury-gold transition-colors" />
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all bg-bg-mist/30"
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
                className="w-full py-3.5 rounded-lg bg-coral-gradient text-white font-bold shadow-lg shadow-action-coral/30 hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
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
                <a href="#" className="font-bold text-text-darkBlue hover:text-luxury-gold transition-colors">
                    Contactar soporte
                </a>
             </p>
          </div>

           {/* Decoración inferior */}
           <div className="pt-8 mt-8 border-t border-gray-100 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="h-8 w-8 rounded bg-gray-200"></div>
                <div className="h-8 w-8 rounded bg-gray-200"></div>
                <div className="h-8 w-8 rounded bg-gray-200"></div>
           </div>

        </div>
      </div>
    </div>
  );
}
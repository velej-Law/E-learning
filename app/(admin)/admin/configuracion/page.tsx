"use client";

import { useState } from "react";
import { 
  Save, Globe, Shield, CreditCard, Bell, 
  UploadCloud, ToggleLeft, ToggleRight, CheckCircle2 
} from "lucide-react";
import { clsx } from "clsx";

// --- TIPOS DE CONFIGURACIÓN ---
type ConfigTab = "general" | "academic" | "security" | "billing";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>("general");
  const [isSaving, setIsSaving] = useState(false);

  // Estado simulado de la configuración
  const [config, setConfig] = useState({
    siteName: "Mare Vitae International",
    supportEmail: "soporte@marevitae.com",
    maintenanceMode: false,
    minPassingGrade: 70,
    enableCertificates: true,
    allowGuestAccess: false,
    twoFactorAuth: true,
    currency: "USD",
  });

  const handleToggle = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: keyof typeof config, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // 🔴 BACKEND TODO: POST /api/admin/settings
    setTimeout(() => {
      setIsSaving(false);
      alert("Configuración guardada correctamente");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-playfair text-3xl font-bold text-text-darkBlue">Configuración</h1>
            <p className="text-gray-500 text-sm">Ajusta los parámetros generales de la plataforma.</p>
        </div>
        <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary-turquoise text-white px-6 py-2.5 rounded-lg font-bold shadow hover:bg-primary-dark transition-all disabled:opacity-70"
        >
            {isSaving ? "Guardando..." : <><Save size={18} /> Guardar Cambios</>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR DE NAVEGACIÓN (TABS) --- */}
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="flex flex-col p-2 space-y-1">
                    <button 
                        onClick={() => setActiveTab("general")}
                        className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors text-left", activeTab === 'general' ? "bg-primary-turquoise/10 text-primary-turquoise" : "text-gray-500 hover:bg-gray-50")}
                    >
                        <Globe size={18} /> General
                    </button>
                    <button 
                        onClick={() => setActiveTab("academic")}
                        className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors text-left", activeTab === 'academic' ? "bg-primary-turquoise/10 text-primary-turquoise" : "text-gray-500 hover:bg-gray-50")}
                    >
                        <Bell size={18} /> Académico
                    </button>
                    <button 
                        onClick={() => setActiveTab("security")}
                        className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors text-left", activeTab === 'security' ? "bg-primary-turquoise/10 text-primary-turquoise" : "text-gray-500 hover:bg-gray-50")}
                    >
                        <Shield size={18} /> Seguridad
                    </button>
                    <button 
                        onClick={() => setActiveTab("billing")}
                        className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors text-left", activeTab === 'billing' ? "bg-primary-turquoise/10 text-primary-turquoise" : "text-gray-500 hover:bg-gray-50")}
                    >
                        <CreditCard size={18} /> Facturación
                    </button>
                </nav>
            </div>
        </div>

        {/* --- CONTENIDO DE LA PESTAÑA --- */}
        <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* PESTAÑA: GENERAL */}
            {activeTab === "general" && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-text-darkBlue mb-4 border-b border-gray-100 pb-2">Identidad del Sitio</h3>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Nombre de la Plataforma</label>
                                <input 
                                    type="text" 
                                    value={config.siteName}
                                    onChange={(e) => handleChange("siteName", e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Correo de Soporte</label>
                                <input 
                                    type="email" 
                                    value={config.supportEmail}
                                    onChange={(e) => handleChange("supportEmail", e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-text-darkBlue mb-4 border-b border-gray-100 pb-2">Logotipo y Branding</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <span className="text-xs font-bold block mb-1">LOGO</span>
                                    <span className="text-[10px]">(Preview)</span>
                                </div>
                            </div>
                            <div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                    <UploadCloud size={16} /> Subir nueva imagen
                                </button>
                                <p className="text-xs text-gray-400 mt-2">Recomendado: 500x500px PNG transparente.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-text-darkBlue mb-4 border-b border-gray-100 pb-2">Mantenimiento</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-gray-700 text-sm">Modo Mantenimiento</p>
                                <p className="text-xs text-gray-500">Si activas esto, solo los administradores podrán acceder.</p>
                            </div>
                            <button onClick={() => handleToggle("maintenanceMode")} className={clsx("transition-colors", config.maintenanceMode ? "text-primary-turquoise" : "text-gray-300")}>
                                {config.maintenanceMode ? <ToggleRight size={40} className="fill-current" /> : <ToggleLeft size={40} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PESTAÑA: ACADÉMICO */}
            {activeTab === "academic" && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
                     <div>
                        <h3 className="text-lg font-bold text-text-darkBlue mb-4 border-b border-gray-100 pb-2">Reglas de Aprobación</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Nota mínima para aprobar (0-100)</label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="number" 
                                        value={config.minPassingGrade}
                                        onChange={(e) => handleChange("minPassingGrade", parseInt(e.target.value))}
                                        className="w-24 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-turquoise text-center font-bold"
                                    />
                                    <span className="text-sm text-gray-500">puntos</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">Generación Automática de Certificados</p>
                                    <p className="text-xs text-gray-500">Emitir diploma PDF al completar el curso con nota aprobatoria.</p>
                                </div>
                                <button onClick={() => handleToggle("enableCertificates")} className={clsx("transition-colors", config.enableCertificates ? "text-primary-turquoise" : "text-gray-300")}>
                                    {config.enableCertificates ? <ToggleRight size={40} className="fill-current" /> : <ToggleLeft size={40} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PESTAÑA: SEGURIDAD */}
            {activeTab === "security" && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-text-darkBlue mb-4 border-b border-gray-100 pb-2">Control de Acceso</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">Autenticación de Dos Factores (2FA)</p>
                                    <p className="text-xs text-gray-500">Forzar 2FA para todos los usuarios con rol Administrador.</p>
                                </div>
                                <button onClick={() => handleToggle("twoFactorAuth")} className={clsx("transition-colors", config.twoFactorAuth ? "text-primary-turquoise" : "text-gray-300")}>
                                    {config.twoFactorAuth ? <ToggleRight size={40} className="fill-current" /> : <ToggleLeft size={40} />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">Permitir Acceso de Invitados</p>
                                    <p className="text-xs text-gray-500">Los usuarios no registrados pueden ver el catálogo de cursos.</p>
                                </div>
                                <button onClick={() => handleToggle("allowGuestAccess")} className={clsx("transition-colors", config.allowGuestAccess ? "text-primary-turquoise" : "text-gray-300")}>
                                    {config.allowGuestAccess ? <ToggleRight size={40} className="fill-current" /> : <ToggleLeft size={40} />}
                                </button>
                            </div>
                        </div>
                    </div>
                 </div>
            )}

            {/* PESTAÑA: FACTURACIÓN */}
            {activeTab === "billing" && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <CreditCard size={32} className="text-gray-400"/>
                        </div>
                        <h3 className="text-lg font-bold text-text-darkBlue">Pasarelas de Pago</h3>
                        <p className="text-sm text-gray-500 max-w-md mt-2 mb-6">
                            Aquí podrás configurar Stripe, PayPal o transferencias bancarias directas para el cobro de matrículas.
                        </p>
                        <button className="px-6 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-primary-turquoise hover:text-primary-turquoise transition-colors">
                            + Conectar Stripe (Próximamente)
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}
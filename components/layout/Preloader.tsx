"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // La pantalla de carga dura 2 segundos (2000 ms) antes de iniciar el fade-out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="logicube-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-signal-white flex flex-col items-center justify-center p-6"
        >
          {/* Contenedor centralizado para mantener el layout solicitado */}
          <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            
            {/* 1. Isotipo Girando */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="relative w-24 h-24 sm:w-28 sm:h-28"
            >
              <Image 
                src="/Isotipo.png" 
                alt="Isotipo Logicube"
                fill
                className="object-contain drop-shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* 2. Barra de Carga Dinámica */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                // Duración de 2s para que coincida exactamente con el timer
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-luminous-orange rounded-full shadow-[0_0_10px_#EC672A]"
              />
            </div>

            {/* 3. Imagotipo en "Grande" debajo de la barra */}
            <motion.div
               initial={{ opacity: 0, scale: 1 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative w-300 h-90 sm:w-300 sm:h-90 mt-4"
            >
              <Image 
                src="/Imagotipo.png" 
                alt="Imagotipo Logicube"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

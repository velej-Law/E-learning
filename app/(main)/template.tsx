"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        // Agregamos un leve delay visual para sincronizar bien con navegaciones de NextJS
        delay: 0.1 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

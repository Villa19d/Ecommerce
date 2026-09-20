import React, { useEffect, useState } from 'react';

export default function InteractiveBackground({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // Base adaptativa con transición fluida entre Modo Claro (blanco perlado/slate-50) y Modo Oscuro (grafito profundo)
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:via-[#0B0F19] dark:to-[#070A12] dark:text-slate-100 overflow-x-hidden transition-colors duration-300 selection:bg-indigo-500/20 selection:text-indigo-700 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200">
      
      {/* ================= CAPA DE FONDO AMBIENTAL ================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 1. Malla técnica (Grid):
            - Modo Claro: líneas pizarra ultra limpias al 3%
            - Modo Oscuro: líneas slate luminosas al 3.5% */}
        <div 
          className="absolute inset-0 block dark:hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 60% at 50% 20%, black 40%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 20%, black 40%, transparent 95%)',
          }}
        />
        <div 
          className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#94a3b80a_1px,transparent_1px),linear-gradient(to_bottom,#94a3b80a_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 60% at 50% 20%, black 40%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 20%, black 40%, transparent 95%)',
          }}
        />

        {/* 2. Resplandor "Aurora Horizon" superior:
            - Modo Claro: iluminación de estudio perlada (índigo/celeste sutil)
            - Modo Oscuro: halo etéreo índigo/cian tenue */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[350px] rounded-[100%] bg-gradient-to-r from-indigo-300/25 via-sky-300/20 to-indigo-200/20 dark:from-indigo-500/10 dark:via-sky-400/8 dark:to-indigo-600/10 blur-[130px] pointer-events-none transition-all duration-300" />

        {/* 3. Luz ambiental lateral (balance sutil en ambos modos) */}
        <div className="absolute top-1/2 -right-36 w-[450px] h-[450px] rounded-full bg-sky-300/20 dark:bg-sky-500/5 blur-[150px] pointer-events-none transition-all duration-300" />

        {/* 4. Spotlight interactivo (sigue el cursor):
            - En Modo Claro: aura luminiscente elegante que resalta el paso del mouse
            - En Modo Oscuro: luz de estudio difusa */}
        <div
          className="absolute block dark:hidden w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.09) 0%, rgba(56, 189, 248, 0.04) 38%, transparent 68%)',
          }}
        />
        <div
          className="absolute hidden dark:block w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.075) 0%, rgba(56, 189, 248, 0.03) 38%, transparent 68%)',
          }}
        />

        {/* 5. Viñeta perimetral suave:
            - Modo Claro: difuminado suave a slate-100 en los bordes
            - Modo Oscuro: viñeta oscura al grafito exterior */}
        <div 
          className="absolute inset-0 block dark:hidden pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(circle at center, transparent 65%, rgba(241, 245, 249, 0.8) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 hidden dark:block pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at center, transparent 60%, #070A12 100%)',
          }}
        />
      </div>

      {/* ================= CONTENIDO DE LA APLICACIÓN ================= */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}

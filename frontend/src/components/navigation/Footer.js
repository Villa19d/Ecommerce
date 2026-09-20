import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
           {/* Logo & Description */}
           <div className="flex flex-col items-center md:items-start max-w-sm">
               <Link to="/" className="flex items-center focus:outline-none">
                  <Logo className="h-7 w-auto" />
               </Link>
               <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
                 Tu tienda de tecnología favorita, desarrollada con estándares modernos.
               </p>
           </div>
           
           {/* Links rápidos */}
           <div className="flex space-x-6 text-sm items-center mt-2 md:mt-0">
               <Link to="/shop" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium transition-colors">Tienda</Link>
               <Link to="/dashboard" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium transition-colors">Mi Cuenta</Link>
               <span className="text-slate-500 dark:text-slate-400 cursor-default select-none">Términos</span>
           </div>

           {/* Redes Sociales */}
           <div className="flex space-x-4 items-center mt-2 md:mt-0">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com/Villa19d" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="GitHub">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:luisrodrigo1005@gmail.com" className="text-slate-400 hover:text-rose-500 transition-colors" title="Email">
                <span className="sr-only">Email</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
           </div>
        </div>
        
        {/* Inferior: Derechos y Métodos de Pago */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[11px] text-slate-500 dark:text-slate-400">
             &copy; 2026 E-Commerce Demo by Rodrigo.
           </p>
           <div className="flex space-x-2 items-center">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 select-none shadow-sm">VISA</span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 select-none shadow-sm">MASTERCARD</span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 select-none shadow-sm">PAYPAL</span>
           </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
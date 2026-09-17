import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 1. Sobre el Proyecto */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-15 w-auto"
                src={logo}
                alt="Logo"
              />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tu tienda de tecnología y estilo favorita, desarrollada con altos estándares de rendimiento y seguridad.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              Portfolio Project
            </span>
          </div>

          {/* 2. Navegación de la Tienda */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">
              Tienda
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Catálogo</Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Ofertas</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Mi Cuenta</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Carrito de Compras</Link>
              </li>
            </ul>
          </div>

          {/* 3. Soporte / Ficha Técnica */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">
              Soporte & Tech
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-slate-500 dark:text-slate-400 cursor-default">Envíos & Pagos</span>
              </li>
              <li>
                <span className="text-sm text-slate-500 dark:text-slate-400 cursor-default">FAQ / Términos</span>
              </li>
              <li className="pt-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Built with:</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">React • Redux • Tailwind CSS</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Django REST • PostgreSQL</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">JWT Auth • Stripe API</p>
              </li>
            </ul>
          </div>

          {/* 4. Desarrollador */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">
              Desarrollador
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-900 dark:text-white font-medium">Rodrigo</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Full Stack Developer</p>
              <div className="flex space-x-4 pt-2">
                {/* LinkedIn */}
                <a href="www.linkedin.com/in/luis-rodrigo-del-villar-morales-720810325" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* GitHub */}
                <a href="https://github.com/Villa19d" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* Email */}
                <a href="luisrodrigo1005@gmail.com" className="text-slate-400 hover:text-rose-500 transition-colors">
                  <span className="sr-only">Email</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer (Copyright & Payments) */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            &copy; 2026 E-Commerce. Proyecto con fines de demostración técnica. Desarrollado por Rodrigo.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-3 items-center">
            {/* Visa Fake Badge */}
            <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 select-none">VISA</span>
            {/* Mastercard Fake Badge */}
            <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 select-none">MASTERCARD</span>
            {/* PayPal Fake Badge */}
            <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 select-none">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
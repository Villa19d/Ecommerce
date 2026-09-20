import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, Menu, Transition } from '@headlessui/react'
import {
  MenuAlt2Icon,
  XIcon,
} from '@heroicons/react/outline'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardLink from './DashboardLink';
import { get_user_profile } from '../../Redux/Actions/profile';
import { logout } from '../../Redux/Actions/auth';
import Logo from '../navigation/Logo';
import Footer from '../navigation/Footer';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardLayout = ({ isAuthenticated, user, profile, get_user_profile, logout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    get_user_profile()
  }, [get_user_profile])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const userNavigation = [
    { name: 'Tu Perfil', href: '/dashboard/profile' },
    { name: 'Cerrar Sesión', href: '#', onClick: () => { logout(); window.location.reload(); } }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      {/* Sidebar para móviles */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-colors">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-slate-900"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Cerrar menú</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link to="/" className="flex items-center">
                    <Logo className="h-10 w-auto" />
                </Link>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <DashboardLink />
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Elemento falso para encoger la barra en móvil */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Contenedor Flex para Sidebar y Contenido Principal */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Sidebar estático para escritorio */}
        <div className="hidden md:flex md:w-64 md:flex-col flex-shrink-0">
          <div className="flex flex-col flex-grow border-r border-slate-200 dark:border-slate-800 pt-5 bg-white dark:bg-slate-900 transition-colors sticky top-0 h-screen overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mt-2">
              <Link to="/" className="flex items-center focus:outline-none">
                  <Logo className="h-10 w-auto" />
              </Link>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-4 pb-4 space-y-2">
                <DashboardLink />
              </nav>
            </div>
          </div>
        </div>

        {/* Main Column */}
        <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <button
            type="button"
            className="px-4 border-r border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            {/* Espaciador para centrar el perfil a la derecha (quitamos la barra de búsqueda inútil) */}
            <div className="flex-1 flex"></div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              
              {/* Botón Dark Mode */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
                className="p-2 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full transition-colors"
              >
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white dark:bg-slate-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900">
                    <span className="sr-only">Abrir menú de usuario</span>
                    {profile && profile.photo ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={profile.photo.startsWith('http') ? profile.photo : `${process.env.REACT_APP_API_URL}${profile.photo}`}
                        alt=""
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline-block'; }}
                      />
                    ) : null}
                    <span 
                        className="inline-block h-8 w-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700"
                        style={{ display: profile?.photo ? 'none' : 'inline-block' }}
                    >
                      <svg className="h-full w-full text-slate-300 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 border border-slate-100 dark:border-slate-700 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          item.onClick ? (
                            <button
                                onClick={item.onClick}
                                className={classNames(
                                    active ? 'bg-slate-100 dark:bg-slate-700' : '',
                                    'w-full text-left block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 transition-colors'
                                )}
                            >
                                {item.name}
                            </button>
                          ) : (
                            <Link
                                to={item.href}
                                className={classNames(
                                    active ? 'bg-slate-100 dark:bg-slate-700' : '',
                                    'block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 transition-colors'
                                )}
                            >
                                {item.name}
                            </Link>
                          )
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 pb-8 flex flex-col">
          <div className="mt-8 flex-grow">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
      </div>
      
      {/* FOOTER */}
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  profile: state.Profile.profile
});

export default connect(mapStateToProps, {
  get_user_profile,
  logout
})(DashboardLayout);

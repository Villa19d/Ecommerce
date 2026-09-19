import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link, NavLink } from 'react-router-dom'
import { Navigate } from 'react-router';
import Alert from '../alert.js'
import { get_categories } from '../../Redux/Actions/categories.js';
import { get_search_products } from '../../Redux/Actions/products';
import { get_user_profile } from '../../Redux/Actions/profile';
import SearchBox from './SearchBox'
import { ShoppingCartIcon, MoonIcon, SunIcon, MenuIcon, XIcon } from '@heroicons/react/solid'
import Logo from './Logo'

import { connect } from 'react-redux';
import { logout } from '../../Redux/Actions/auth';

function Navbar({
  isAuthenticated,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items,
  profile,
  get_user_profile
}) {
  const [redirect, setRedirect] = useState(false);
  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: ''
  });
  const { category_id, search } = formData;

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
    get_categories()
    get_user_profile()
  }, [get_user_profile, get_categories])

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    get_search_products(search, category_id);
    setRender(!render);
  }

  if (render) {
    return <Navigate to='/search' />;
  }

  const logoutHandler = () => {
    logout()
    setRedirect(true);
  }

  if (redirect) {
    window.location.reload(false)
    return <Navigate to='/' />;
  }

  const authLinks = (
    <Link to="/dashboard" className="ml-4 inline-flex justify-center rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-indigo-500">
      {profile && profile.photo ? (
        <img
          className="h-14 w-14 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}${profile.photo}`}
          alt=""
        />
      ) : (
        <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          <svg className="h-full w-full text-slate-300 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </Link>
  )

  const guestLinks = (
    <Fragment>
      <Link to="/login" className="text-xl md:text-2xl font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 ml-6">
        Sign in
      </Link>
      <Link
        to="/signup"
        className="ml-6 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-xl md:text-2xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Sign up
      </Link>
    </Fragment>
  )

  return (
    <>
      <Popover className="relative bg-white dark:bg-slate-900 shadow-sm dark:border-b dark:border-slate-800 transition-colors duration-300 z-40">
        <div className="absolute inset-0 z-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5 md:py-6 md:space-x-10">

            {/* Logo Section */}
            <div className="flex justify-start flex-shrink-0">
              <Link to="/" className="flex">
                <span className="sr-only">NitroStore</span>
                <Logo className="h-10 w-auto" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 -my-2 md:hidden flex items-center space-x-2">
              <Link to="/cart" className="bg-white dark:bg-slate-800 rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 relative">
                <span className="sr-only">Cart</span>
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-[10px] absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white font-semibold rounded-full px-[6px] py-[2px] text-center">{total_items}</span>
              </Link>
              <Popover.Button className="bg-white dark:bg-slate-800 rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            {/* Desktop Center: Search Box & Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center px-2 lg:ml-8">
              <div className="w-full max-w-[700px] px-4 flex items-center space-x-10">
                <NavLink to="/shop" className={window.location.pathname === '/search' ? 'text-lg font-medium text-slate-900 dark:text-white' : 'text-base font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}>
                  Shop
                </NavLink>
                <div className="flex-1 w-full relative">
                  {window.location.pathname === '/search' ? null : (
                    <SearchBox
                      search={search}
                      onChange={onChange}
                      onSubmit={onSubmit}
                      categories={categories}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Right: Actions */}
            <div className="hidden md:flex items-center justify-end flex-shrink-0 space-x-8">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
              >
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              <Link to="/cart" className="relative group">
                <ShoppingCartIcon className="h-7 w-7 cursor-pointer text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors" />
                <span className="text-sm absolute -top-1 -right-2 bg-indigo-600 text-white font-bold rounded-full px-2 py-0.5 text-center">{total_items}</span>
              </Link>

              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-40 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-slate-800 divide-y-2 divide-slate-50 dark:divide-slate-700">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <Logo className="h-10 w-auto sm:h-12" />
                  </div>
                  <div className="-mr-2 flex items-center space-x-2">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                    >
                      {isDarkMode ? (
                        <SunIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </button>
                    <Popover.Button className="bg-white dark:bg-slate-800 rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav className="grid gap-6">
                    <NavLink to="/shop" className="text-base font-medium text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                      Shop Products
                    </NavLink>
                    {/* Mobile SearchBox */}
                    {window.location.pathname === '/search' ? null : (
                      <div className="w-full">
                        <SearchBox
                          search={search}
                          onChange={onChange}
                          onSubmit={onSubmit}
                          categories={categories}
                        />
                      </div>
                    )}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="mt-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard/profile"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Perfil
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </Link>
                      <p className="mt-6 text-center text-base font-medium text-slate-500 dark:text-slate-400">
                        Existing customer?{' '}
                        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                          Sign in
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Alert />
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items,
  profile: state.Profile.profile
})

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
  get_user_profile
})(Navbar)
import { Link, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Actions/auth'
import {
    HomeIcon,
    LogoutIcon,
    CreditCardIcon,
    UserIcon
} from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DashboardLink = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Historial de Pagos', href: '/dashboard/payments', icon: CreditCardIcon },
        { name: 'Perfil', href: '/dashboard/profile', icon: UserIcon },
    ]

    return (
        <div className="flex flex-col space-y-2 w-full">
            {navItems.map((item) => {
                const isActive = location.pathname === item.href
                return (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                            isActive 
                                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200',
                            'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200'
                        )}
                    >
                        <item.icon
                            className={classNames(
                                isActive 
                                    ? 'text-indigo-700 dark:text-indigo-300' 
                                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300',
                                'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </Link>
                )
            })}

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => {
                        dispatch(logout())
                        window.location.reload()
                    }}
                    className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 w-full text-left transition-all duration-200"
                >
                    <LogoutIcon
                        className="mr-3 flex-shrink-0 h-5 w-5 text-red-400 dark:text-red-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
                        aria-hidden="true"
                    />
                    Cerrar sesión
                </button>
            </div>
        </div>
    )
}

export default DashboardLink
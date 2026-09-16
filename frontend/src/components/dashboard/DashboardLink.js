import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Actions/auth'
import {
    CalendarIcon,
    LogoutIcon
  } from '@heroicons/react/outline'
  import { CreditCardIcon, UserIcon } from '@heroicons/react/solid'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const DashboardLink =()=>{
    const dispatch = useDispatch()

    return(
        <>
            <Link
            to="/dashboard"
            className={classNames('text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors'
            )}
            >
            <CalendarIcon
                className={classNames(
                'mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors',
                )}
                aria-hidden="true"
            />
            Dashboard
            </Link>
            
            <Link
            to="/dashboard/payments"
            className={classNames('text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors'
            )}
            >
            <CreditCardIcon
                className={classNames(
                'mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors',
                )}
                aria-hidden="true"
            />
            Payment History
            </Link>
            
            <Link
            to="/dashboard/profile"
            className={classNames('text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors'
            )}
            >
            <UserIcon
                className={classNames(
                'mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors',
                )}
                aria-hidden="true"
            />
            Profile
            </Link>

            <button
            onClick={() => {
                dispatch(logout())
                window.location.reload()
            }}
            className={classNames('text-red-600 hover:bg-red-50 hover:text-red-900 w-full text-left mt-4',
                'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors'
            )}
            >
            <LogoutIcon
                className={classNames(
                'mr-4 flex-shrink-0 h-6 w-6 text-red-400 group-hover:text-red-500 transition-colors',
                )}
                aria-hidden="true"
            />
            Sign out
            </button>
        </>
    )
}

export default DashboardLink
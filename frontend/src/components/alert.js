import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from '@headlessui/react';
import { 
    CheckCircleIcon, 
    ExclamationCircleIcon, 
    InformationCircleIcon, 
    XIcon 
} from '@heroicons/react/solid';

function Alert({ alert }) {
    const [show, setShow] = useState(false);
    const [currentAlert, setCurrentAlert] = useState(null);

    useEffect(() => {
        if (alert && alert.msj) {
            // When a new alert comes in, update state and show
            setCurrentAlert(alert);
            setShow(true);
            
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000); // Windows 11 default duration is around 5s
            
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [alert]);

    // Don't render anything if we haven't received an alert yet
    if (!currentAlert) return null;

    const getIcon = () => {
        switch (currentAlert.type) {
            case 'green':
            case 'success':
                return <CheckCircleIcon className="w-6 h-6 text-emerald-500" aria-hidden="true" />;
            case 'red':
            case 'danger':
            case 'error':
                return <ExclamationCircleIcon className="w-6 h-6 text-rose-500" aria-hidden="true" />;
            case 'blue':
            default:
                return <InformationCircleIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />;
        }
    };

    const getTitle = () => {
        switch (currentAlert.type) {
            case 'green':
            case 'success':
                return 'Éxito';
            case 'red':
            case 'danger':
            case 'error':
                return 'Atención';
            case 'blue':
            default:
                return 'Notificación';
        }
    };

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end z-[9999]"
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {/* Windows 11 style animation: Slide up and fade in */}
                <Transition
                    show={show}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-10 opacity-0 sm:translate-y-0 sm:translate-x-10"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100 scale-100 sm:translate-x-0"
                    leaveTo="opacity-0 scale-95 sm:translate-x-10"
                >
                    <div className="max-w-sm w-full bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-2xl shadow-2xl rounded-xl pointer-events-auto border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-0.5">
                                    {getIcon()}
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {getTitle()}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                        {currentAlert.msj}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        type="button"
                                        className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#1c1c1c] transition-colors"
                                        onClick={() => setShow(false)}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <XIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
});

export default connect(mapStateToProps)(Alert);
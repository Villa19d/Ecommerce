import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { list_orders } from '../../Redux/Actions/orders';
import {
    get_items,
    get_total,
    get_item_total
} from "../../Redux/Actions/cart";
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Dashboard = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    user,
    profile
}) => {

    useEffect(() => {
        get_items();
        get_total();
        get_item_total();
        list_orders();
    }, [get_items, list_orders, get_total, get_item_total]);

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg overflow-hidden transition-colors">
                <div className="px-4 py-5 sm:px-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl leading-6 font-bold text-slate-900 dark:text-slate-100">Resumen de Usuario</h3>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Un vistazo rápido a los detalles de tu cuenta.</p>
                </div>
                <div className="px-4 py-5 sm:p-0">
                    <dl className="divide-y divide-slate-200 dark:divide-slate-700">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Nombre completo</dt>
                            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                {profile?.first_name || user?.first_name || ''} {' '}
                                {profile?.last_name || user?.last_name || ''}
                            </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Correo electrónico</dt>
                            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                {profile?.email || user?.email || ''}
                            </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Total de pedidos</dt>
                            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2 flex justify-between">
                                <span>{orders ? orders.length : 0} pedidos realizados</span>
                                <Link to="/dashboard/payments" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
                                    Ver historial
                                </Link>
                            </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Acciones del perfil</dt>
                            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2 flex justify-between">
                                <span>Mantén tu información actualizada.</span>
                                <Link to="/dashboard/profile" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
                                    Actualizar perfil
                                </Link>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </DashboardLayout>
    );
};

const mapStateToProps = state => ({
    orders: state.Orders.orders,
    user: state.Auth.user,
    profile: state.Profile.profile
});

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total
})(Dashboard);
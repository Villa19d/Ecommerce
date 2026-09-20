import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { list_orders } from '../../Redux/Actions/orders';
import {
    get_items,
    get_total,
    get_item_total
} from "../../Redux/Actions/cart";
import { Link } from 'react-router-dom';
import moment from 'moment';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const DashboardPayments = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders
}) => {

    useEffect(() => {
        get_items();
        get_total();
        get_item_total();
        list_orders();
    }, [get_items, list_orders, get_total, get_item_total]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-8">Historial de Pagos</h1>
                
                {orders && orders.length > 0 ? (
                    <div className="space-y-8 relative">
                        {orders.map((product) => (
                            <div key={product.transaction_id} className="bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                                        <dl className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                                            <div className="flex flex-col">
                                                <dt className="text-slate-500 dark:text-slate-400 font-medium">ID de Transacción</dt>
                                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">{product.transaction_id}</dd>
                                            </div>
                                            <div className="flex flex-col">
                                                <dt className="text-slate-500 dark:text-slate-400 font-medium">Fecha</dt>
                                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">
                                                    <time dateTime={product.date_issued}>{moment(product.date_issued).format('LL')}</time>
                                                </dd>
                                            </div>
                                            <div className="flex flex-col">
                                                <dt className="text-slate-500 dark:text-slate-400 font-medium">Total</dt>
                                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">
                                                    ${product.amount}
                                                </dd>
                                            </div>
                                        </dl>
                                        <div className="mt-4 sm:mt-0">
                                            <Link 
                                                to={`/dashboard/payment/${product.transaction_id}`} 
                                                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-colors"
                                            >
                                                Ver detalle
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                <svg className="h-6 w-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                                            {product.order_items ? product.order_items.length : 0} artículos en este pedido
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                        <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">No hay pedidos</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">No has realizado ninguna compra todavía.</p>
                        <div className="mt-6">
                            <Link to="/shop" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Ir a la tienda
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const mapStateToProps = state => ({
    orders: state.Orders.orders
});

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total
})(DashboardPayments);
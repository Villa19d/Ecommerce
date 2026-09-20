import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { list_orders, get_order_detail } from '../../Redux/Actions/orders';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
    get_items,
    get_total,
    get_item_total
} from "../../Redux/Actions/cart";
import moment from 'moment';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardPaymentDetail = ({
    get_items,
    get_total,
    get_item_total,
    order,
    get_order_detail
}) => {

    const params = useParams();
    const transaction_id = params.transaction_id;
    
    useEffect(() => {
        get_order_detail(transaction_id);
    }, [transaction_id, get_order_detail]);

    if (!order) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-slate-500 dark:text-slate-400">Cargando detalle de la orden...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Detalles de la Orden</h1>
                    <Link to="/dashboard/payments" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                        &larr; Volver a pagos
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 transition-colors">
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 sm:flex sm:justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                        <dl className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                            <div className="flex flex-col">
                                <dt className="text-slate-500 dark:text-slate-400 font-medium">ID de Transacción</dt>
                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">{order.transaction_id}</dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="text-slate-500 dark:text-slate-400 font-medium">Fecha de Emisión</dt>
                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">
                                    <time dateTime={order.date_issued}>{moment(order.date_issued).format('LL')}</time>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="text-slate-500 dark:text-slate-400 font-medium">Estado General</dt>
                                <dd className="font-semibold text-slate-900 dark:text-slate-200 mt-1">
                                    {order.status || 'Completado'}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Artículos Comprados</h2>
                        <div className="space-y-12">
                            {order.order_items && order.order_items.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col md:flex-row gap-8"
                                >
                                    <div className="md:w-1/3">
                                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                                            <Link to={`/product/${product.id}`} className="hover:text-indigo-500 transition-colors">{product.name}</Link>
                                        </h3>
                                        <p className="font-medium text-slate-500 dark:text-slate-400 mt-1 text-sm">Transacción del artículo: {product.transaction_id}</p>
                                        <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm">{product.description || 'Sin descripción'}</p>
                                    </div>

                                    <div className="md:w-2/3">
                                        <dl className="grid grid-cols-1 gap-y-8 border-b border-slate-200 dark:border-slate-700 pb-8 sm:grid-cols-2 sm:gap-x-6">
                                            <div>
                                                <dt className="font-medium text-slate-900 dark:text-slate-200">Dirección de Envío</dt>
                                                <dd className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="block">{product.address_line_1}</span>
                                                    <span className="block">{product.address_line_2}</span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-slate-900 dark:text-slate-200">Costos</dt>
                                                <dd className="mt-3 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                                                    <p className="flex justify-between"><span>Envío:</span> <span className="font-medium text-slate-900 dark:text-slate-200">${product.shipping_price}</span></p>
                                                    <p className="flex justify-between"><span>Costo Total:</span> <span className="font-medium text-slate-900 dark:text-slate-200">${product.amount}</span></p>
                                                </dd>
                                            </div>
                                        </dl>
                                        
                                        <p className="font-medium text-slate-900 dark:text-slate-200 mt-6 text-sm">
                                            Estado de Entrega: <span className="text-indigo-600 dark:text-indigo-400">{product.status}</span>
                                        </p>
                                        
                                        <div className="mt-6">
                                            <div className="bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
                                                    style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
                                                />
                                            </div>
                                            <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">
                                                <div className="text-indigo-600 dark:text-indigo-400">Pedido realizado</div>
                                                <div className={classNames(product.step > 0 ? 'text-indigo-600 dark:text-indigo-400' : '', 'text-center transition-colors')}>
                                                    Procesando
                                                </div>
                                                <div className={classNames(product.step > 1 ? 'text-indigo-600 dark:text-indigo-400' : '', 'text-center transition-colors')}>
                                                    Enviado
                                                </div>
                                                <div className={classNames(product.step > 2 ? 'text-indigo-600 dark:text-indigo-400' : '', 'text-right transition-colors')}>
                                                    Entregado
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const mapStateToProps = state => ({
    order: state.Orders.order
});

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total,
    get_order_detail
})(DashboardPaymentDetail);
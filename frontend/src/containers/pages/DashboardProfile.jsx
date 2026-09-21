import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { list_orders } from '../../Redux/Actions/orders';
import {
    get_items,
    get_total,
    get_item_total
} from "../../Redux/Actions/cart";
import { update_user_profile, get_user_profile } from '../../Redux/Actions/profile';
import { Oval } from 'react-loader-spinner';
import { CalendarIcon } from '@heroicons/react/outline';
import { countries } from '../../helpers/Countries';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const DashboardProfile = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    update_user_profile,
    get_user_profile,
    profile
}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        get_user_profile();
        get_items();
        get_total();
        get_item_total();
        list_orders();
    }, [get_items, list_orders, get_user_profile, get_total, get_item_total]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state_province_region: '',
        zipcode: '',
        phone: '',
        country_region: 'Canada',
        birthdate: '',
        photo: null
    });

    const {
        first_name, last_name, address_line_1, address_line_2,
        city, state_province_region, zipcode, phone, country_region, birthdate
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        await update_user_profile(
            first_name, last_name, address_line_1, address_line_2,
            city, state_province_region, zipcode, phone, country_region, formData.photo, birthdate
        );
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-12">
                <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 shadow-sm sm:rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                    <div className="px-4 py-5 sm:px-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <h3 className="text-xl leading-6 font-bold text-slate-900 dark:text-slate-100">Perfil de Usuario</h3>
                        <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Actualiza tus datos personales y dirección de envío.</p>
                    </div>

                    <div className="px-4 py-6 sm:p-8 space-y-8">
                        {/* Photo */}
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <label htmlFor="photo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 sm:w-1/3">
                                Foto de Perfil
                            </label>
                            <div className="mt-2 sm:mt-0 sm:w-2/3 flex items-center">
                                <span className="h-16 w-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 ring-2 ring-slate-200 dark:ring-slate-600 shrink-0">
                                    {profile && profile.photo ? (
                                        <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-full w-full text-slate-300 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                </span>
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    className="ml-5 bg-white dark:bg-slate-800 py-2 px-3 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors"
                                />
                            </div>
                        </div>

                        {/* Personal Data */}
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
                                <input
                                    type="text"
                                    name='first_name'
                                    placeholder={profile?.first_name || ''}
                                    onChange={onChange}
                                    value={first_name}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Apellidos</label>
                                <input
                                    type="text"
                                    name='last_name'
                                    placeholder={profile?.last_name || ''}
                                    onChange={onChange}
                                    value={last_name}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email (Sólo lectura)</label>
                                <input
                                    type="email"
                                    name='email'
                                    disabled
                                    value={profile?.email || ''}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm cursor-not-allowed sm:text-sm transition-colors"
                                />
                            </div>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-700" />

                        {/* Address */}
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div className="sm:col-span-2">
                                <label htmlFor="address_line_1" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Dirección Línea 1</label>
                                <input
                                    type="text"
                                    name='address_line_1'
                                    placeholder={profile?.address_line_1 || ''}
                                    onChange={onChange}
                                    value={address_line_1}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address_line_2" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Dirección Línea 2</label>
                                <input
                                    type="text"
                                    name='address_line_2'
                                    placeholder={profile?.address_line_2 || ''}
                                    onChange={onChange}
                                    value={address_line_2}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ciudad</label>
                                <input
                                    type="text"
                                    name='city'
                                    placeholder={profile?.city || ''}
                                    onChange={onChange}
                                    value={city}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="state_province_region" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Estado / Provincia</label>
                                <input
                                    type="text"
                                    name='state_province_region'
                                    placeholder={profile?.state_province_region || ''}
                                    onChange={onChange}
                                    value={state_province_region}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="zipcode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Código Postal</label>
                                <input
                                    type="text"
                                    name='zipcode'
                                    placeholder={profile?.zipcode || ''}
                                    onChange={onChange}
                                    value={zipcode}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="country_region" className="block text-sm font-medium text-slate-700 dark:text-slate-300">País</label>
                                <select
                                    name='country_region'
                                    onChange={onChange}
                                    value={country_region}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                >
                                    <option value={country_region}>{profile?.country_region || 'Canada'}</option>
                                    {countries && countries.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Teléfono</label>
                                <input
                                    type="text"
                                    name='phone'
                                    placeholder={profile?.phone || ''}
                                    onChange={onChange}
                                    value={phone}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="birthdate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name='birthdate'
                                    onChange={onChange}
                                    value={birthdate || profile?.birthdate || ''}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                        </div>

                        <div className="pt-5 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 dark:focus:ring-offset-slate-900 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <Oval color="#FFF" height={20} width={20} /> : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Resumen Ordenes (Optional Mini-View) */}
                <div className="bg-white dark:bg-slate-800 shadow-sm sm:rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                    <div className="px-4 py-5 border-b border-slate-200 dark:border-slate-700 sm:px-6 bg-slate-50 dark:bg-slate-800/50">
                        <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-100">Resumen de Pedidos Recientes</h3>
                    </div>
                    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                        {orders && orders.length > 0 ? orders.slice(0, 3).map((order, index) => (
                            <li key={index} className="px-4 py-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                        Pedido #{order.transaction_id}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-400">
                                            {order.status || 'Procesado'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between items-center">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                                            ${order.amount} - {order.address_line_1}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-slate-500 dark:text-slate-400 sm:mt-0">
                                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                                        <p>
                                            {new Date(order.date_issued).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )) : (
                            <li className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">No tienes pedidos recientes.</li>
                        )}
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
};

const mapStateToProps = state => ({
    orders: state.Orders?.orders || [],
    profile: state.Profile.profile,
});

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total,
    update_user_profile,
    get_user_profile
})(DashboardProfile);
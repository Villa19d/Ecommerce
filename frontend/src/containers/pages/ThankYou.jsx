import Layout from '../../hocs/layout'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { reset } from '../../Redux/Actions/payment';
import { useEffect } from 'react';
const ThankYou = ({
    isAuthenticated,
    reset
}) => {

    useEffect(() => {
        reset()
    }, [reset])

    if(isAuthenticated === false)
        return <Navigate to='/' />;

    return(
        <Layout>
            <div className="bg-transparent transition-colors duration-300 min-h-screen flex items-center justify-center">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    ¡Gracias por tu compra!
                </p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-slate-300">
                    Esperamos que hayas disfrutado comprando en NitroStore.
                </p>
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
                    >
                        Volver a la Tienda
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}
const mapStateToProps =state => ({
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps,{
    reset
}) (ThankYou)
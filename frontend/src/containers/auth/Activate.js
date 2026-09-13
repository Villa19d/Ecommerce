import { useParams } from 'react-router-dom';
import Layout from '../../hocs/layout.js';
import { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import {activate} from '../../Redux/Actions/auth.js';
import { Navigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';


const Activate =({
    activate,
    loading
})=>{
    
    useEffect(() => {
        // Código que se ejecuta al cargar la página
        
        activate_account();

        return () => {
            // console.log("ACtivando...");
        };
    }, [activate_account]); /* El array vacío [] asegura que esto se ejecute solo una vez*/

    console.log(useParams())
    console.log(useParams().uid+'- - - -', useParams().token)
    

    const { uid, token } = useParams(); // Desestructurar los parámetros de useParams una vez
    const [activated, setActivated] = useState(false);
    const [navigate, setNavigate] = useState(false);


    const activate_account = () => {
        activate(uid, token);
        setActivated(true);
        // console.log('Activado')
    };

    const ok = ()=>{
        console.log("Activación completada, volviendo a Home");
        setNavigate(true);    
    }

    if (navigate) {
        return <Navigate to="/" />;
    }   
    return(
        <Layout>
        <div className='m-10'>
            <div className="text-center text-xl font-semibold mb-4">
                Your Account Has Been Activated Successfully
            </div>
            <div  className="flex justify-center">
                {loading ? <button 
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                     <Oval color="#00BFFF" height={80} width={80} />
                </button>:
                <button 
                /*onClick={activate_account}*/
                onClick={ok}
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                      Ok
                </button>
                }
                
            </div>
        </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})
export default connect(mapStateToProps,{
    activate
})(Activate)
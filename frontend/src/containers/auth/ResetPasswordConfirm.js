import Layout from '../../hocs/layout.js';

import {Link, useParams} from 'react-router-dom'
import { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import {reset_password_confirm} from '../../Redux/Actions/auth.js'

const ResetPasswordConfirm =({reset_password_confirm
    ,loading})=>{
  const [formData,setFormData]=useState({
    new_password:'',
    re_new_password:''
  });

  const params = useParams();

  const {
    new_password,
    re_new_password
  }=formData;

  useEffect(()=>{window.scrollTo(0,0)},[])

  const [requestSent, setRequestSent] = useState(false);

  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
  
  const onSubmit = e =>{
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;

    reset_password_confirm(uid, token, new_password, re_new_password)

    if(new_password === re_new_password){
      setRequestSent(true);
    }
  }

  if(requestSent && !loading) return <Navigate to="/login"/>;

    return(
        <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Set new password</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100 dark:border-slate-700">
            <form onSubmit={e=>onSubmit(e)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="new_password"
                    value={new_password}
                    onChange={e=>onChange(e)}
                    type="password"
                    placeholder="New Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    name="re_new_password"
                    value={re_new_password}
                    onChange={e=>onChange(e)}
                    type="password"
                    placeholder="Repeat New Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                {loading ? 
                <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Oval color="#00BFFF" height={80} width={80} />  
              </button>:
              <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
    )
}

const mapStateToProps= state=>({
    loading:state.Auth.loading
})

export default connect(mapStateToProps,{
  reset_password_confirm
})(ResetPasswordConfirm)
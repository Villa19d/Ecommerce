import Layout from '../../hocs/layout.js';

import {login, continue_with_google, continue_with_github, social_authenticate} from '../../Redux/Actions/auth.js'
import {Link, useLocation, Navigate} from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { faPassport } from '@fortawesome/free-solid-svg-icons';


const Login =({login, continue_with_google, continue_with_github, social_authenticate, loading, isAuthenticated})=>{
  const location = useLocation();
  const [formData,setFormData]=useState({
    email:'',
    password:''
  });

  const {
    email,
    password
  }=formData;

  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
  
  const onSubmit = e =>{
    e.preventDefault();
    login(email,password)
  }

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    
    const values = new URLSearchParams(location.search);
    const state = values.get('state') ? values.get('state') : '';
    const code = values.get('code');
    const provider = localStorage.getItem('social_provider');

    if (code && provider) {
      effectRan.current = true;
      social_authenticate(state, code, provider);
      localStorage.removeItem('social_provider'); 
    }
  }, [location, social_authenticate]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

    return(
        <Layout>    
       <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form 
    onSubmit={e=>onSubmit(e)}
    class="space-y-6" 
    action="#"
    >
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Email address</label>
        <div class="mt-2">
          <input 
          id="email"
           name="email" 
           value={email}
           type="email"
           autoComplete="email" 
           onChange={e=>onChange(e)}
           required 
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Password</label>
          <div class="text-sm">
            <Link to="/reset_password" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</Link>
          </div>
        </div>
        <div class="mt-2">
          <input 
          id="password" 
          name="password"
          value={password} 
          type="password" 
          autoComplete="current-password" 
          onChange={e=>onChange(e)}
          required 
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        {
          loading ? 
        <button 
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >                    
           <Oval color="#00BFFF" height={80} width={80} />  
        </button> :
        <button 
        type="submit" 
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >                    
           Sign in  
        </button> 
        
        }
      </div>
      
    </form>

    <div class="mt-10">
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-200 dark:border-slate-700"></div>
        </div>
        <div class="relative flex justify-center text-sm font-medium leading-6">
          <span class="bg-white dark:bg-slate-900 px-6 text-gray-900 dark:text-gray-300">Or continue with</span>
        </div>
      </div>

      <div class="mt-6 flex gap-4">
        <button onClick={continue_with_google} type="button" class="flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 focus-visible:ring-transparent">
          <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
            <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
          </svg>
          <span class="text-sm font-semibold leading-6">Google</span>
        </button>
        <button onClick={continue_with_github} type="button" class="flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 focus-visible:ring-transparent">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          <span class="text-sm font-semibold leading-6">GitHub</span>
        </button>
      </div>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Start a 14 day free trial</a>
    </p>
  </div>
</div> 
</Layout>
    )
}

const mapStateToProps= state=>({
    isAuthenticated: state.Auth.isAuthenticated,
    loading:state.Auth.loading
})

export default connect(mapStateToProps,{
  login,
  continue_with_google,
  continue_with_github,
  social_authenticate
})(Login)
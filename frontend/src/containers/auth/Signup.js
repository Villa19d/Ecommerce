import Layout from '../../hocs/layout.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import {connect} from 'react-redux';
import {signup, continue_with_google, continue_with_github, social_authenticate} from '../../Redux/Actions/auth.js';
import { useLocation, Navigate, Link } from 'react-router-dom';

 const Signup=({
    signup,
    continue_with_google,
    continue_with_github,
    social_authenticate,
    isAuthenticated
 })=>{
const location = useLocation();

const [accountCreated, setAccountCreated]=useState(false);    
    
const [formData , setFormData] = useState ({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    re_password:''
})

useEffect(()=>{
   window.scrollTo(0,0)
},[])

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


const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    
} = formData;

const onChange = e => {
    
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
}

const onSubmit = e=>{
    e.preventDefault();
    signup(
        first_name,
        last_name,
        email,
        password,
        re_password,
        )
        setAccountCreated(true);
}

  if (accountCreated) {
    return <Navigate to="/login" />
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

    return(
        <Layout>
     <section class="bg-transparent">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form 
        onSubmit={e=>onSubmit(e)}
        class="w-full max-w-md">
            
            <div class="flex items-center justify-center mt-6 ">

                <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                    sign up
                </a>
            </div>

            
                

               
            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={e=>onChange(e)}
                />
            </div>

            <div class="relative flex items-center mt-8">
                <span class="absolute flex items-center">
                   <FontAwesomeIcon class="w-6 h-6 mx-3" icon="fa-solid fa-id-card" style={{color: "#6b7280",}} />
                </span>

                <input type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={e=>onChange(e)}
                />
            </div>

            <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                 placeholder="Email address"
                 name="email"
                 value={email}
                 onChange={e=>onChange(e)}
                 />
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e=>onChange(e)}
                />
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                name="re_password"
                value={re_password}
                onChange={e=>onChange(e)}
                />
            </div>

            <div class="mt-6">
                <button 
                type="submit"
                class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                    Sign Up
                </button>

                <div class="mt-6 text-center ">
                    <Link to="/login" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                        Already have an account?
                    </Link>
                </div>
            </div>
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
        </form>

    </div>
</section>
<script src="https://kit.fontawesome.com/c4a768dde6.js" crossOrigin="anonymous"></script>
</Layout>
    )
}

const mapStateToProps = state=>({
    isAuthenticated: state.Auth.isAuthenticated,
    loading: state.Auth.loading
})

export default connect(mapStateToProps,{
  signup,
  continue_with_google,
  continue_with_github,
  social_authenticate
}) (Signup)


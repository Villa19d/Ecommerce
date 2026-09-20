import Layout from '../../hocs/layout.js';

import {login} from '../../Redux/Actions/auth.js'
import {Link} from 'react-router-dom'
import { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { faPassport } from '@fortawesome/free-solid-svg-icons';


const Login =({login,loading})=>{
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
           autocomplete="email" 
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
          autocomplete="current-password" 
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
    loading:state.Auth.loading
})

export default connect(mapStateToProps,{
  login
})(Login)
import Layout from '../../hocs/layout.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState,useEffect} from 'react'
import {connect} from 'react-redux';
import {signup} from '../../Redux/Actions/auth.js';


 const Signup=({
    signup
 })=>{

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
    return(
        <Layout>
     <section class="bg-white dark:bg-gray-900">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form 
        onSubmit={e=>onSubmit(e)}
        class="w-full max-w-md">
            <div class="flex justify-center mx-auto">
                <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>
            
            <div class="flex items-center justify-center mt-6 ">

                <a href="#" class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                    sign up
                </a>
            </div>

            
                

               
            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
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

                <input type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={e=>onChange(e)}
                />
            </div>

            <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                 placeholder="Email address"
                 name="email"
                 value={email}
                 onChange={e=>onChange(e)}
                 />
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
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

                <input type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
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
                    <a href="#" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                        Already have an account?
                    </a>
                </div>
            </div>
        </form>
    </div>
</section>
<script src="https://kit.fontawesome.com/c4a768dde6.js" crossorigin="anonymous"></script>
</Layout>
    )
}

const mapStateToProps = state=>({

})

export default connect(mapStateToProps,{
  signup
}) (Signup)


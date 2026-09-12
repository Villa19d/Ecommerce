import { ToastContainer }  from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from "../components/navigation/Navbar";
import {connect} from 'react-redux';
import  Footer  from "../components/navigation/Footer";
import { useEffect } from "react";

import {check_authenticated,load_user,refresh}from '../Redux/Actions/auth'

const Layout = (props)=>{
  useEffect(()=>{
    props.refresh();
    props.check_authenticated();
    props.load_user();
  },[]);
    return(
        <div>
          <Navbar/>
          <ToastContainer autoClose={5000}/>
          {props.children}
          <Footer/>
        </div>
    )
}

export default connect(null,{
  check_authenticated,
  load_user,
  refresh
})(Layout) 



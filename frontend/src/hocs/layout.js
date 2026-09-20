import { ToastContainer }  from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from "../components/navigation/Navbar";
import {connect} from 'react-redux';
import  Footer  from "../components/navigation/Footer";
import { useEffect } from "react";
import InteractiveBackground from "../components/animations/InteractiveBackground";

import {check_authenticated,load_user,refresh}from '../Redux/Actions/auth'
import {get_items, get_total, get_item_total} from '../Redux/Actions/cart'
import {get_wishlist_items, get_wishlist_item_total} from '../Redux/Actions/wishlist'

const Layout = (props)=>{
  useEffect(()=>{
    props.refresh();
    props.check_authenticated();
    props.load_user();
    props.get_items();
    props.get_total();
    props.get_item_total();
    props.get_wishlist_items();
    props.get_wishlist_item_total();
  },[]);
    return(
        <InteractiveBackground>
          <Navbar/>
          <ToastContainer autoClose={5000}/>
          {props.children}
          <Footer/>
        </InteractiveBackground>
    )
}

export default connect(null,{
  check_authenticated,
  load_user,
  refresh,
  get_items,
  get_total,
  get_item_total,
  get_wishlist_items,
  get_wishlist_item_total
})(Layout) 



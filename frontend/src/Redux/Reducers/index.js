import {combineReducers} from 'redux'
import Auth from './auth';
import Alert from './Alert';
import Categories from './categories';
import Products from './products';
import Wishlist from  './whishlist';
import Reviews from './reviews';
import Cart from './cart';
import Shipping from './shipping';
import Orders from './orders';
import Payment from './payment';
import Coupons from './coupons';
import Profile from './profile';

export default combineReducers({
    Auth,
    Alert,
    Categories,
    Products,
    Wishlist,
    Reviews,
    Cart,
    Orders,
    Shipping,
    Payment,
    Coupons,
    Profile
})


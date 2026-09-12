import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './containers/home/home'
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword'
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'          // Íconos sólidos gratuitos
import { fab } from '@fortawesome/free-brands-svg-icons'         // Íconos de marcas gratuitos
import { far } from '@fortawesome/free-regular-svg-icons'        // Íconos regulares gratuitosimport

import Shop from './containers/pages/Shop.jsx'
import ProductDetails from './containers/pages/ProductDetails.jsx';


import Search from './containers/pages/Search.jsx';
import Cart from './containers/pages/Cart.jsx';
import Checkout from './containers/pages/Checkout.jsx';
import ThankYou from './containers/pages/ThankYou.jsx';
import Dashboard from './containers/pages/Dashboard.jsx';
import DashboardPayments from './containers/pages/DashboardPayments.jsx';
import DashboardPaymentDetail from './containers/pages/DashboardPaymentDetail.jsx';
import DashboardProfile from './containers/pages/DashboardProfile.jsx';


// Añadir los íconos específicos que quieras usar
library.add(fas, fab, far)



function App() {
  return (

      <Provider store={store}>
        <Router>
          <Routes>
            {/*Error Display */}
            <Route path="*" element={<Error404/>}/>

            <Route exact path="/" element={<Home/>}/>
            
            {/*Authentication*/}
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
            <Route exact path='/reset_password' element={<ResetPassword/>}/>
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>

            <Route exact path="/shop" element={<Shop/>}/>
            <Route exact path="/product/:productId" element={<ProductDetails/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="/checkout" element={<Checkout/>}/>
             <Route exact path='/thankyou' element={<ThankYou/>}/>
          
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/dashboard/payments' element={<DashboardPayments/>}/>
          <Route exact path='/dashboard/payment/:transaction_id' element={<DashboardPaymentDetail/>}/>
          <Route exact path='/dashboard/profile' element={<DashboardProfile/>}/>

          </Routes>
        </Router>
      </Provider>
    
  );
}

export default App;

import axios from 'axios';

import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from './types.js'

export const get_categories = ()=> async dispatch => {
    const config = {
        headers : {
            'Accept' : 'application/json'
        }
    };

    try{
        console.log('obtenemos categorias');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/categories`,config);
        console.log(res)
        if(res.status === 200){
            dispatch({
                type:GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
           dispatch({
            type:GET_CATEGORIES_FAIL
           }); 
        }
    } catch(e){
        console.log(e, 'error en categories');
      console.error(e.response?.data);
        dispatch({
            type:GET_CATEGORIES_FAIL
           }); 
    }
}
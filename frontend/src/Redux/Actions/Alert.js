import {SET_ALERT,REMOVE_ALERT} from './types'

export const setAlert = (msj, type, timeout = 5000)=>dispatch=>{
    // console.log(msj)
    dispatch({
        type:SET_ALERT,
        payload:{msj, type}
    });

    setTimeout(()=>dispatch({type:REMOVE_ALERT}),timeout);
}
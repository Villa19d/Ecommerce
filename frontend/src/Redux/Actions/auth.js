//Todas las funciones que se van a llamar en los componentes
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_CONFIRM_SUCCESS,

} from './types.js';

import {setAlert} from './Alert.js'
import axios from 'axios';

//Acá añadimos los datos que usamos en postman para los usuarios 
/*Esta función signup es una acción de Redux. 
   Se encarga de gestionar el proceso de registro de un usuario.*/
export const signup = (first_name,last_name,email,password,re_password)=> async dispatch => {
      // Configura los headers para la solicitud HTTP

      dispatch({
        type:SET_AUTH_LOADING
      });
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
   const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password
   });
   let res;
   try{
         // Envía la solicitud POST a la API para registrar al usuario
      res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,body,config);
     // Si la respuesta tiene un estado 201 (creado exitosamente)
     if(res.status === 201){
        dispatch({  //despacha una acción a la tienda de Redux. Una acción es simplemente un objeto que describe algo que sucedió, y dispatch es el mecanismo para actualizar el estado en el store de Redux con base en esa acción.
            type:SIGNUP_SUCCESS,
            payload: res.data  // La información del usuario recién registrado
        });
        dispatch(setAlert('Te enviamos un correo, porfavor activa tu cuenta. Revisa el correo', 'green'))
        }

     else{
       // Si no es un estado 201, despacha la acción SIGNUP_FAIL
        dispatch({
            type:SIGNUP_FAIL
        });
        dispatch(setAlert('Error al crear la cuenta', 'red'))
     }
     dispatch({
      type:REMOVE_AUTH_LOADING
    })
   
   }catch(e){
    console.error(e.response?.data); // Esto ayudará a ver detalles del error
    // Si ocurre un error durante la solicitud, despacha la acción SIGNUP_FAIL
    dispatch({
        type:SIGNUP_FAIL
    });
    dispatch({
      type:REMOVE_AUTH_LOADING
    })
    dispatch(setAlert(`Error al conectar con el servidor`, 'red'))
   }
}

export const activate = (uid,token)=> async dispatch => {
  dispatch({
    type:SET_AUTH_LOADING
  }); 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
   };

   const body = JSON.stringify({
    uid,
    token
   })

   try{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`,body,config);
    if(res.status  === 204){
      dispatch({
        type:ACTIVATION_SUCCESS
      });
      dispatch(setAlert('Cuenta Activada Correctamente', 'green'))
    }else{
      dispatch({
        type:ACTIVATION_FAIL
      });
      dispatch(setAlert('Error al activar la cuenta', 'red'))
    }
    dispatch({
      type:REMOVE_AUTH_LOADING
    })
  }catch(e){
    console.error(e.response?.data); // Esto ayudará a ver detalles del error
     dispatch({
      type:ACTIVATION_FAIL
     });
     dispatch({
      type:REMOVE_AUTH_LOADING
    });
    dispatch(setAlert('Error al conectar con el servidor', 'red'))
   }
};

export const login = (email,password) => async dispatch =>{
  dispatch({
    type:SET_AUTH_LOADING
  });
  
  const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

  
  const body = JSON.stringify({
    email,
    password
  })

  try{
     const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body,config);
     if(res.status === 200){
      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      });
      dispatch(load_user());
      dispatch({
        type:REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Inicio de sesión exitoso', 'green'))
     }else{
      dispatch({
        type: LOGIN_FAIL
      }); 
      dispatch({
        type: REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Error al inciar sesion', 'red'))
     } 
  }catch(e){
    console.error(e.response?.data); // Esto ayudará a ver detalles del error
      dispatch({
        type:LOGIN_FAIL
      });
      dispatch({
        type:REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Error al inciar sesion. Intenta mas tarde', 'red'))
  }
}

export const load_user = ()=> async dispatch => {
  if(localStorage.getItem('access')){
    const config = {
      headers:{
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept':'application/json'
      }

    }
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`,config);

      if(res.status === 200){
        dispatch({
          type:USER_LOADED_SUCCESS,
          payload: res.data
        })
      }else{
        dispatch({
          type:USER_LOADED_FAIL,
        })
      };
    }catch(e){
      dispatch({
          type:USER_LOADED_FAIL,
        })
    }
  }else{
    dispatch({
      type:USER_LOADED_FAIL,
    })
  }
}

export const check_authenticated =()=> async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
          headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          }
        };
        const body = JSON.stringify({
          token: localStorage.getItem('access')
        })
        try{
          const res =  await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body,config);
          if(res.status === 200){
            dispatch({
              type:AUTHENTICATED_SUCCESS
            })
          }else{
            dispatch({
              type:AUTHENTICATED_FAIL
            })
          }
        }catch(e){
          dispatch({
            type:AUTHENTICATED_FAIL
          })
        }
    }else{
      dispatch({
        type:AUTHENTICATED_FAIL
      })
    }
}

export const refresh = ()=> async dispatch =>{
  if(localStorage.getItem('refresh')){
    const config = {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({
      refresh:localStorage.getItem('refresh')
    });
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,body,config);
      if(res.status === 200){
        dispatch({
          type:REFRESH_SUCCESS,
          payload: res.data
        });
      }else{
        dispatch({
          type: REFRESH_FAIL
        });
      }
    }catch(e){
      dispatch({
              type: REFRESH_FAIL
            });
    }
  }else{

  }
}

export const logout = ()=> async dispatch =>{
    dispatch ({
      type: LOGOUT
    });
    dispatch(setAlert('Ha salido exitosamente', 'green'));
}

export const reset_password = (email)=> async dispatch => { 
  dispatch({
    type: SET_AUTH_LOADING
  });

  const config = {
    headers : {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({email});

  try{
     const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body,config)
     if(res.status === 204){
      dispatch({
        type:RESET_PASSWORD_SUCCESS
      }); 
      dispatch({
        type:REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Password reset email sent', 'green'));
     }else{
       dispatch({
        type:RESET_PASSWORD_FAIL
       });
       dispatch({
        type:REMOVE_AUTH_LOADING
       });
       dispatch(setAlert('Error sending password reset email', 'red'));
     }
    }catch(e){
      dispatch({
        type:RESET_PASSWORD_FAIL
      });
      dispatch({
        type:REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Error sending password reset email', 'red'));
  }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
   dispatch ({
    type: SET_AUTH_LOADING
   });

   const config = {
    headers: {
      'Content-Type': 'application/json'
    }
   };

   const body = JSON.stringify({
    uid,
    token,
    new_password,
    re_new_password
   });

   if(new_password !== re_new_password){
       dispatch({
        type:RESET_PASSWORD_CONFIRM_FAIL
       });
       dispatch({
        type:REMOVE_AUTH_LOADING
       });
       dispatch(setAlert('Passwords do not match', 'red'))
   }else{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body,config)

      if(res.status === 204){
        dispatch({
          type:RESET_PASSWORD_CONFIRM_SUCCESS
        }); 
        dispatch({
          type:REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Password has been reset successfully', 'green'));
       }else{
         dispatch({
          type:RESET_PASSWORD_CONFIRM_FAIL
         });
         dispatch({
          type:REMOVE_AUTH_LOADING
         });
         dispatch(setAlert('Error resetting your password', 'red'));
       }
    }catch(e){
      console.error(e.response?.data); // Esto ayudará a ver detalles del error
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL
      });
      dispatch({
        type: REMOVE_AUTH_LOADING
      });
      dispatch(setAlert('Error resetting your password', 'red'))
    }
   }
}


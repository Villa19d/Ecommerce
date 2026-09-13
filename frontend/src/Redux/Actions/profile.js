import axios from 'axios';
import { setAlert } from './Alert';
import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types';

export const get_user_profile = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_USER_PROFILE_FAIL
            });
        }
    }
}


export const update_user_profile = (
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    zipcode,
    phone,
    country_region,
    photo,
    birthdate
) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('address_line_1', address_line_1);
        formData.append('address_line_2', address_line_2);
        formData.append('city', city);
        formData.append('state_province_region', state_province_region);
        formData.append('zipcode', zipcode);
        formData.append('phone', phone);
        formData.append('country_region', country_region);
        if (birthdate) formData.append('birthdate', birthdate);
        if (photo) formData.append('photo', photo);

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/update`, formData, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('Profile updated successfully', 'green'));
            } else {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(setAlert('Failed to update profile', 'red'));
            }
        } catch(err) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
            dispatch(setAlert('Failed to update profile', 'red'));
        }
    }
}
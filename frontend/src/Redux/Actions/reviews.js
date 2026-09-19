import axios from 'axios';
import {
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    FILTER_REVIEWS_SUCCESS,
    FILTER_REVIEWS_FAIL,
} from './types';


export const get_reviews = (product_id, page = 1, sort = 'recent') => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    if (localStorage.getItem('access')) {
        config.headers['Authorization'] = `JWT ${localStorage.getItem('access')}`;
    }

    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/reviews/get-reviews/${product_id}?page=${page}&sort=${sort}`, 
            config
        );

        if (res.status === 200) {
            dispatch({
                type: GET_REVIEWS_SUCCESS,
                payload: { ...res.data, page, sort } // Pasamos page y sort al reducer
            });
        } else {
            dispatch({
                type: GET_REVIEWS_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_REVIEWS_FAIL
        });
    }
}

export const get_replies = (review_id, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    if (localStorage.getItem('access')) {
        config.headers['Authorization'] = `JWT ${localStorage.getItem('access')}`;
    }

    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/reviews/get-replies/${review_id}?page=${page}`, 
            config
        );

        if (res.status === 200) {
            dispatch({
                type: 'GET_REPLIES_SUCCESS',
                payload: { ...res.data, review_id, page }
            });
        } else {
            dispatch({
                type: 'GET_REPLIES_FAIL'
            });
        }
    } catch(err) {
        dispatch({
            type: 'GET_REPLIES_FAIL'
        });
    }
}


export const get_review = product_id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/get-review/${product_id}`, 
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: GET_REVIEW_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_REVIEW_FAIL
            });
        }
    }
}

export const create_review = (product_id, rating, comment, parent_id = null) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({
            rating,
            comment,
            parent_id
        });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reviews/create-review/${product_id}`,
                body,
                config
            );

            if (res.status === 201) {
                dispatch({
                    type: CREATE_REVIEW_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: CREATE_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: CREATE_REVIEW_FAIL
            });
        }
    }
}

export const update_review = (review_id, rating, comment) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({
            rating,
            comment
        });

        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/reviews/update-review/${review_id}`,
                body,
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: UPDATE_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: UPDATE_REVIEW_FAIL
            });
        }
    }
}

export const delete_review = review_id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            },
            data: {}
        };

        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/reviews/delete-review/${review_id}`,
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: DELETE_REVIEW_SUCCESS,
                    payload: review_id // Pass the review_id to remove it from state
                });
            } else {
                dispatch({
                    type: DELETE_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: DELETE_REVIEW_FAIL
            });
        }
    }
}

export const like_review = review_id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reviews/like/${review_id}`,
                {},
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: 'LIKE_REVIEW_SUCCESS',
                    payload: { review_id, liked: res.data.liked, likes_count: res.data.likes_count }
                });
            } else {
                dispatch({
                    type: 'LIKE_REVIEW_FAIL'
                });
            }
        } catch(err) {
            dispatch({
                type: 'LIKE_REVIEW_FAIL'
            });
        }
    }
}

export const filter_reviews = (product_id, rating) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    let myRating;

    if (rating === 0.5)
        myRating = '0.5';
    else if (rating === 1 || rating === 1.0)
        myRating = '1.0';
    else if (rating === 1.5)
        myRating = '1.5';
    else if (rating === 2 || rating === 2.0)
        myRating = '2.0';
    else if (rating === 2.5)
        myRating = '2.5';
    else if (rating === 3 || rating === 3.0)
        myRating = '3.0';
    else if (rating === 3.5)
        myRating = '3.5';
    else if (rating === 4 || rating === 4.0)
        myRating = '4.0';
    else if (rating === 4.5)
        myRating = '4.5';
    else
        myRating = '5.0';

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/filter-reviews/${product_id}?rating=${myRating}`,
                config
            );
    
            if (res.status === 200) {
                dispatch({
                    type: FILTER_REVIEWS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: FILTER_REVIEWS_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: FILTER_REVIEWS_FAIL
            });
        }
}
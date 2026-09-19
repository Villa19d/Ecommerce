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
} from '../Actions/types';

const initialState = {
    review: null,
    reviews: [],
    total_reviews: 0,
    has_more: false,
    current_page: 1,
    current_sort: 'recent'
};

// Función auxiliar para actualizar un comentario o una de sus respuestas
const updateCommentInTree = (reviews, updatedReview) => {
    return reviews.map(r => {
        if (r.id === updatedReview.id) {
            return { ...r, ...updatedReview };
        }
        if (r.replies && r.replies.length > 0) {
            return { ...r, replies: updateCommentInTree(r.replies, updatedReview) };
        }
        return r;
    });
};

const deleteCommentInTree = (reviews, reviewId) => {
    return reviews.filter(r => r.id !== reviewId).map(r => {
        if (r.replies) {
            return { ...r, replies: deleteCommentInTree(r.replies, reviewId) };
        }
        return r;
    });
};

const addReplyInTree = (reviews, newReply) => {
    return reviews.map(r => {
        if (r.id === newReply.parent) {
            return { 
                ...r, 
                replies_count: r.replies_count + 1,
                replies: [...(r.replies || []), newReply] 
            };
        }
        if (r.replies && r.replies.length > 0) {
            return { ...r, replies: addReplyInTree(r.replies, newReply) };
        }
        return r;
    });
};

const appendRepliesInTree = (reviews, payload) => {
    return reviews.map(r => {
        if (r.id === payload.review_id) {
            const newReplies = payload.page === 1 ? payload.replies : [...(r.replies || []), ...payload.replies];
            return {
                ...r,
                replies: newReplies,
                replies_has_more: payload.has_more,
                replies_total: payload.total_replies,
                replies_page: payload.page
            };
        }
        if (r.replies && r.replies.length > 0) {
            return { ...r, replies: appendRepliesInTree(r.replies, payload) };
        }
        return r;
    });
};

export default function Reviews(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_REVIEWS_SUCCESS:
            const { reviews, total_reviews, has_more, page, sort } = payload;
            return {
                ...state,
                reviews: page === 1 ? reviews : [...state.reviews, ...reviews],
                total_reviews,
                has_more,
                current_page: page,
                current_sort: sort
            }
        case GET_REVIEWS_FAIL:
            return {
                ...state,
                reviews: [],
                total_reviews: 0,
                has_more: false
            }
        case GET_REVIEW_SUCCESS:
            return {
                ...state,
                review: payload.review
            }
        case GET_REVIEW_FAIL:
            return {
                ...state,
                review: {}
            }
        case CREATE_REVIEW_SUCCESS:
            let newReviews = state.reviews;
            if (payload.review.parent) {
                // Es una respuesta
                newReviews = addReplyInTree(state.reviews, payload.review);
            } else {
                // Es un comentario principal
                newReviews = [payload.review, ...state.reviews];
            }
            return {
                ...state,
                review: payload.review,
                reviews: newReviews,
                total_reviews: state.total_reviews + (payload.review.parent ? 0 : 1)
            }
        case CREATE_REVIEW_FAIL:
            return {
                ...state,
                review: {}
            }
        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                review: payload.review,
                reviews: updateCommentInTree(state.reviews, payload.review)
            }
        case UPDATE_REVIEW_FAIL:
            return {
                ...state
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                review: {},
                reviews: deleteCommentInTree(state.reviews, payload)
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state
            }
        case 'LIKE_REVIEW_SUCCESS':
            return {
                ...state,
                reviews: updateCommentInTree(state.reviews, {
                    id: payload.review_id,
                    has_liked: payload.liked,
                    likes_count: payload.likes_count
                })
            }
        case 'GET_REPLIES_SUCCESS':
            return {
                ...state,
                reviews: appendRepliesInTree(state.reviews, payload)
            }
        case 'GET_REPLIES_FAIL':
            return {
                ...state
            }
        case FILTER_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: payload.reviews
            }
        case FILTER_REVIEWS_FAIL:
            return {
                ...state
            }
        default:
            return state
    }


}
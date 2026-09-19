import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { 
    get_reviews, 
    create_review, 
    update_review, 
    delete_review, 
    like_review,
    get_replies
} from '../../Redux/Actions/reviews';
import CommentItem from './CommentItem';
import InteractiveStars from './InteractiveStars';

const CommentSection = ({ 
    productId, 
    reviews, 
    total_reviews, 
    has_more, 
    current_page, 
    current_sort,
    isAuthenticated,
    user,
    get_reviews,
    create_review,
    update_review,
    delete_review,
    like_review,
    get_replies
}) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5.0);

    // Initial load
    useEffect(() => {
        get_reviews(productId, 1, 'recent');
    }, [productId, get_reviews]);

    const handleSortChange = (e) => {
        get_reviews(productId, 1, e.target.value);
    };

    const loadMore = () => {
        if (has_more) {
            get_reviews(productId, current_page + 1, current_sort);
        }
    };

    const submitNewComment = (e) => {
        e.preventDefault();
        if (newComment.trim() && rating) {
            create_review(productId, rating, newComment, null); // null as parent_id
            setNewComment('');
            setRating(5.0);
        }
    };

    const getInitial = (name) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    const displayInitial = getInitial(user?.first_name || user?.email);

    return (
        <div className="mt-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Comentarios ({total_reviews})
            </h3>

            {/* Input principal */}
            {isAuthenticated ? (
                <form onSubmit={submitNewComment} className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tu calificación:</span>
                            <InteractiveStars rating={rating} setRating={setRating} />
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                                {user?.photo ? (
                                    <img 
                                        src={user.photo.startsWith('http') ? user.photo : `${process.env.REACT_APP_API_URL}${user.photo}`} 
                                        alt={user.first_name || user.email} 
                                        className="h-10 w-10 rounded-full object-cover"
                                        onError={(e) => { 
                                            e.target.style.display = 'none'; 
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; 
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="h-10 w-10 rounded-full bg-blue-600 items-center justify-center text-white font-bold"
                                    style={{ display: user?.photo ? 'none' : 'flex' }}
                                >
                                    {displayInitial}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <textarea
                                    className="w-full border-gray-300 rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                    rows="3"
                                    placeholder="Escribe tu comentario aquí..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                type="submit"
                                disabled={!newComment.trim()}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Comentar
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-gray-600 dark:text-gray-300">Inicia sesión para dejar un comentario.</p>
                </div>
            )}

            {/* Sort & List */}
            {reviews && reviews.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-gray-500 font-medium">Ordenar por:</span>
                        <select 
                            value={current_sort} 
                            onChange={handleSortChange}
                            className="border-none text-sm font-medium text-gray-700 bg-transparent focus:ring-0 cursor-pointer dark:text-gray-300"
                        >
                            <option value="recent">Más recientes</option>
                            <option value="top">Más populares</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        {reviews.map(review => (
                            <CommentItem 
                                key={review.id} 
                                review={review} 
                                productId={productId}
                                isAuthenticated={isAuthenticated}
                                handleLike={like_review}
                                handleReply={create_review}
                                handleDelete={delete_review}
                                handleUpdate={update_review}
                                handleGetReplies={get_replies}
                                currentUser={user}
                            />
                        ))}
                    </div>

                    {has_more && (
                        <div className="mt-8 text-center">
                            <button 
                                onClick={loadMore}
                                className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cargar más comentarios
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500 mt-10">Aún no hay comentarios para este producto. ¡Sé el primero!</p>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    reviews: state.Reviews.reviews,
    total_reviews: state.Reviews.total_reviews,
    has_more: state.Reviews.has_more,
    current_page: state.Reviews.current_page,
    current_sort: state.Reviews.current_sort,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps, {
    get_reviews,
    create_review,
    update_review,
    delete_review,
    like_review,
    get_replies
})(CommentSection);

import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { ThumbUpIcon as ThumbUpSolid } from '@heroicons/react/solid';
import { ThumbUpIcon as ThumbUpOutline, ChatAltIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import Stars from '../product/Stars';

moment.locale('es');

const getInitial = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
};

const CommentItem = ({ 
    review, 
    productId, 
    isAuthenticated,
    handleLike,
    handleReply,
    handleDelete,
    handleUpdate,
    handleGetReplies,
    currentUser
}) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(review.comment);
    
    const [showReplies, setShowReplies] = useState(false);

    // Utilizamos el ID para mayor seguridad y evitar problemas de coincidencia de strings (parseamos a Number)
    const isOwner = currentUser && (Number(review.user_id) === Number(currentUser.id) || review.user_name === currentUser.first_name);
    
    // Evitar que pequeñas diferencias marquen como "editado" al momento de crear
    const isEdited = React.useMemo(() => {
        return moment(review.date_updated).diff(moment(review.date_created), 'seconds') > 5;
    }, [review.date_updated, review.date_created]);

    const submitReply = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            handleReply(productId, null, replyText, review.id);
            setReplyText('');
            setShowReplyForm(false);
            setShowReplies(true);
        }
    };

    const submitEdit = (e) => {
        e.preventDefault();
        if (editText.trim()) {
            handleUpdate(review.id, review.rating, editText);
            setIsEditing(false);
        }
    };

    const displayInitial = getInitial(currentUser?.first_name || currentUser?.email);

    return (
        <div className="flex flex-col mt-4">
            <div className="flex space-x-3">
                <div className="flex-shrink-0">
                    {review.user_photo ? (
                        <img 
                            src={review.user_photo.startsWith('http') ? review.user_photo : `${process.env.REACT_APP_API_URL}${review.user_photo}`} 
                            alt={review.user_name} 
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; 
                            }}
                        />
                    ) : null}
                    <div 
                        className="h-10 w-10 rounded-full bg-blue-600 items-center justify-center text-white font-bold" 
                        style={{ display: review.user_photo ? 'none' : 'flex' }}
                    >
                        {getInitial(review.user_name)}
                    </div>
                </div>
                
                <div className="flex-grow min-w-0">
                    <div className="flex items-center space-x-2 relative">
                        <span className="font-semibold text-gray-900 dark:text-white">
                            @{review.user_name}
                        </span>
                        <span className="text-sm text-gray-500">
                            {moment(review.date_created).fromNow()}
                        </span>
                        {isEdited && (
                            <span className="text-xs text-gray-400 italic">(editado)</span>
                        )}

                        {isOwner && !isEditing && (
                            <div className="flex space-x-2 ml-auto">
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                    title="Editar comentario"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                    title="Eliminar comentario"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {!isEditing && review.rating && (
                        <div className="mt-1">
                            <Stars rating={review.rating} />
                        </div>
                    )}

                    <div className="mt-1 text-gray-800 dark:text-gray-200">
                        {isEditing ? (
                            <form onSubmit={submitEdit} className="mt-2">
                                <textarea
                                    className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    rows="2"
                                    maxLength={500}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {editText.length}/500 caracteres
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsEditing(false); setEditText(review.comment); }}
                                        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={!editText.trim()}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-full disabled:opacity-50"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-sm whitespace-pre-wrap break-all">{review.comment}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 mt-2">
                        <button 
                            onClick={() => handleLike(review.id)}
                            className="flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
                            title={isAuthenticated ? "Me gusta" : "Inicia sesión para votar"}
                        >
                            {review.has_liked ? (
                                <ThumbUpSolid className="h-5 w-5 text-blue-600" />
                            ) : (
                                <ThumbUpOutline className="h-5 w-5" />
                            )}
                            <span className="ml-1 text-xs font-medium">{review.likes_count > 0 ? review.likes_count : ''}</span>
                        </button>
                        
                        {isAuthenticated && (
                            <button 
                                onClick={() => {
                                    if (!showReplyForm) {
                                        setReplyText(`@${review.user_name} `);
                                    }
                                    setShowReplyForm(!showReplyForm);
                                }}
                                className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                            >
                                Responder
                            </button>
                        )}
                    </div>

                    {showReplyForm && (
                        <div className="mt-3 flex space-x-3">
                            <div className="flex-shrink-0">
                                {currentUser?.photo ? (
                                    <img 
                                        src={currentUser.photo.startsWith('http') ? currentUser.photo : `${process.env.REACT_APP_API_URL}${currentUser.photo}`} 
                                        alt={currentUser.first_name || currentUser.email} 
                                        className="h-8 w-8 rounded-full object-cover"
                                        onError={(e) => { 
                                            e.target.style.display = 'none'; 
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; 
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="h-8 w-8 rounded-full bg-blue-600 items-center justify-center text-white font-bold"
                                    style={{ display: currentUser?.photo ? 'none' : 'flex' }}
                                >
                                    {displayInitial}
                                </div>
                            </div>
                            <form onSubmit={submitReply} className="flex-grow flex flex-col">
                                <input
                                    type="text"
                                    className="w-full text-sm border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 bg-transparent px-0 py-1 dark:text-white"
                                    placeholder="Añade una respuesta..."
                                    maxLength={500}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    autoFocus
                                />
                                <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {replyText.length}/500 caracteres
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowReplyForm(false)}
                                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-full dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className="px-3 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded-full disabled:opacity-50"
                                    >
                                        Responder
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {review.replies_count > 0 && (
                        <div className="mt-2">
                            {!showReplies ? (
                                <button 
                                    onClick={() => {
                                        setShowReplies(true);
                                        if (!review.replies || review.replies.length === 0) {
                                            handleGetReplies(review.id, 1);
                                        }
                                    }}
                                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    <ChatAltIcon className="h-4 w-4 mr-1" />
                                    {review.replies_count} respuestas
                                </button>
                            ) : (
                                <div className="flex flex-col">
                                    <button 
                                        onClick={() => setShowReplies(false)}
                                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-2"
                                    >
                                        Ocultar respuestas
                                    </button>
                                    <div className="pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                                        {review.replies && review.replies.map(reply => (
                                            <CommentItem 
                                                key={reply.id} 
                                                review={reply} 
                                                productId={productId}
                                                isAuthenticated={isAuthenticated}
                                                handleLike={handleLike}
                                                handleReply={handleReply}
                                                handleDelete={handleDelete}
                                                handleUpdate={handleUpdate}
                                                handleGetReplies={handleGetReplies}
                                                currentUser={currentUser}
                                            />
                                        ))}
                                        {review.replies_has_more && (
                                            <button 
                                                onClick={() => handleGetReplies(review.id, review.replies_page + 1)}
                                                className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                Cargar más respuestas
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;

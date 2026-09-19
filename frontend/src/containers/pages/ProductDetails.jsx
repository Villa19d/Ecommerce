import Layout from "../../hocs/layout"
import {useParams} from 'react-router'
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { 
  add_wishlist_item, 
  get_wishlist_items, 
  get_wishlist_item_total ,
  remove_wishlist_item
} from '../../Redux/Actions/wishlist';
import { 
    get_product,
    get_related_products 
} from "../../Redux/Actions/products";
import {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews
} from '../../Redux/Actions/reviews';
import { Oval } from 'react-loader-spinner';

import { 
    get_items,
    add_item,
    get_total,
    get_item_total
} from "../../Redux/Actions/cart";
import { useEffect, useState } from "react";
import ImageGallery from "../../components/product/ImageGallery";
import WishlistHeart from "../../components/product/WhishListHeart";
import { Navigate } from "react-router";

import Stars from '../../components/product/Stars'

const ProductDetails =({
    get_product,
    get_related_products,
    product,
    get_items,
    add_item,
    get_total,
    get_item_total,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total,
    isAuthenticated,
    remove_wishlist_item,
    wishlist,
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews,
    review,
    reviews
})=>{

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addToCart = async () => {
      if (product && product !== null && product !== undefined && product.quantity > 0) {
          setLoading(true)
          await add_item(product);
          await get_items();
          await get_total();
          await get_item_total();
          setLoading(false)
          navigate('/cart')
      }
    }

    const addToWishlist = async () => {
      console.log("[CHECKPOINT 1] addToWishlist triggered!");
      if (isAuthenticated) {
        let isPresent = false;
        console.log("[CHECKPOINT 2] User is authenticated. Checking if product is in wishlist...");
        console.log("[CHECKPOINT 3] Current wishlist from Redux:", wishlist);
        console.log("[CHECKPOINT 4] Current product to check:", product);
        
        if (wishlist && wishlist.length > 0) {
          wishlist.forEach((item) => {
            if (item.product && item.product.id && product && product.id) {
              if (item.product.id.toString() === product.id.toString()) {
                console.log("[CHECKPOINT 5] Product found in wishlist! isPresent = true");
                isPresent = true;
              }
            }
          });
        }
        
        try {
          if (isPresent) {
            console.log("[CHECKPOINT 6] Calling remove_wishlist_item for id:", product.id);
            await remove_wishlist_item(product.id);
            console.log("[CHECKPOINT 7] Calling get_wishlist_items after removal...");
            await get_wishlist_items();
            await get_wishlist_item_total();
            console.log("[CHECKPOINT 8] Removal workflow completed.");
          } else {
            console.log("[CHECKPOINT 6] Calling add_wishlist_item for id:", product.id);
            await add_wishlist_item(product.id);
            console.log("[CHECKPOINT 7] Calling get_wishlist_items after addition...");
            await get_wishlist_items();
            await get_wishlist_item_total();
            console.log("[CHECKPOINT 8] Addition workflow completed.");
          }
        } catch (error) {
          console.error("[ERROR] Failed during wishlist operation:", error);
        }
          
      } else {
        console.log("[CHECKPOINT 2] User not authenticated. Redirecting...");
        return navigate('/cart');
      }
    };

    
    const params = useParams()
    const productId = params.productId

    useEffect(() => {
      window.scrollTo(0,0)
        get_product(productId)
        get_related_products(productId)
        get_wishlist_items()
        get_wishlist_item_total()
    }, [get_wishlist_items, get_product, get_related_products, get_wishlist_item_total])

    useEffect(() => {
        get_reviews(productId);
    }, [productId]);

    useEffect(() => {
        get_review(productId);
    }, [productId]);

    // const [rating, setRating] = useState(5.0);

    const [formData, setFormData] = useState({
      comment:'',
      rating:'',
    })

    const { comment,rating } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const leaveReview = e => {
      e.preventDefault()
      if (rating !== null)
        create_review(productId, rating, comment);
    }
    
    const updateReview = e => {
      e.preventDefault()
      if (rating !== null)
        update_review(productId, rating, comment);
    }

    const deleteReview = () => {
      const fetchData = async () => {
          await delete_review(productId);
          await get_review(productId);
          // setRating(5.0);
          setFormData({
              comment: ''
          });
      };
      fetchData();
    };

    const filterReviews = numStars => {
        filter_reviews(productId, numStars);
    };

    const getReviews = () => {
        get_reviews(productId);
    };

    return(
        <Layout>
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 transition-colors duration-300">
                {/* Contenedor Principal */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                            
                            {/* Galería de Imágenes */}
                            <div className="p-8 lg:p-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                                <ImageGallery photo={product && product.photo}/>
                            </div>

                            {/* Información del Producto */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">{product && product.name}</h1>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
                                        ${product && product.price}
                                    </p>
                                    <div className="flex items-center relative z-50">
                                        <WishlistHeart 
                                            product={product}
                                            wishlist={wishlist}
                                            addToWishlist={addToWishlist}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center">
                                    {product && product.quantity > 0 ? (
                                        <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'>
                                            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
                                            Disponible en Stock
                                        </span>
                                    ) : (
                                        <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'>
                                            <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                                            Agotado temporalmente
                                        </span>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Características principales</h3>
                                    <div
                                        className="prose prose-sm sm:prose text-gray-600 dark:text-slate-300 font-sofiapro-light"
                                        dangerouslySetInnerHTML={{ __html: product && product.description }}
                                    />
                                </div>

                                <div className="mt-10 flex gap-4">
                                    {loading ? (
                                        <button disabled className="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-lg font-bold text-white opacity-70 cursor-not-allowed transition-all shadow-lg">
                                            <Oval color="#fff" width={24} height={24}/>
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={addToCart}
                                            className="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-lg font-bold text-white hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform active:scale-95 shadow-lg dark:focus:ring-offset-slate-900"
                                        >
                                            Añadir al Carrito
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Reseñas */}
                    <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-6 mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Reseñas de Clientes</h2>
                            <button
                                className='px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-lg transition-colors'
                                onClick={getReviews}
                            >
                                Mostrar todas
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Formulario de Reseña */}
                            <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700 h-fit">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    {review && isAuthenticated ? "Actualiza tu reseña" : "Escribe una reseña"}
                                </h3>
                                
                                <form onSubmit={review && isAuthenticated ? updateReview : leaveReview} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                            Tu calificación
                                        </label>
                                        <select
                                            name="rating"
                                            required
                                            value={rating}
                                            onChange={e=>onChange(e)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        >
                                            <option value="">Selecciona estrellas</option>
                                            <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                                            <option value="4">⭐⭐⭐⭐ (Muy Bueno)</option>
                                            <option value="3">⭐⭐⭐ (Bueno)</option>
                                            <option value="2">⭐⭐ (Regular)</option>
                                            <option value="1">⭐ (Malo)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                            Tu opinión
                                        </label>
                                        <textarea
                                            rows={4}
                                            name="comment"
                                            id="comment"
                                            required
                                            value={comment}
                                            onChange={e=>onChange(e)}
                                            placeholder={review && isAuthenticated ? review.comment : "¿Qué te pareció este producto?"}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none shadow-inner"
                                        />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
                                    >
                                        {review && isAuthenticated ? "Actualizar Reseña" : "Publicar Reseña"}
                                    </button>
                                </form>
                            </div>

                            {/* Lista de Reseñas */}
                            <div className="lg:col-span-2 space-y-6">
                                {reviews && reviews.length > 0 ? reviews.map((review,index)=>(
                                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                                    {review.user ? review.user.charAt(0).toUpperCase() : "U"}
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{review.user}</h4>
                                                    <Stars rating={review.rating}/>
                                                </div>
                                                <p className="mt-3 text-gray-600 dark:text-slate-300 text-base leading-relaxed">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                        <p className="text-slate-500 dark:text-slate-400 text-lg">Aún no hay reseñas para este producto.</p>
                                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">¡Sé el primero en dejar tu opinión!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    isAuthenticated: state.Auth.isAuthenticated,
    wishlist: state.Wishlist.items,
    review: state.Reviews.review,
    reviews: state.Reviews.reviews
})

export default connect(mapStateToProps, {
    get_product,
    get_related_products,
    get_items,
    add_item,
    get_total,
    get_item_total,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total,
    remove_wishlist_item,
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews
}) (ProductDetails)
// Cache bust 1

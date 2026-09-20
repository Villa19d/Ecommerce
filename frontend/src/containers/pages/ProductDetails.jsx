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
import CommentSection from "../../components/reviews/CommentSection";

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
            <div className="bg-transparent min-h-screen pb-20 transition-colors duration-300">
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
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">{product && product.name}</h1>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
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
                                        <button disabled className="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white opacity-70 cursor-not-allowed transition-all shadow-lg">
                                            <Oval color="#fff" width={24} height={24}/>
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={addToCart}
                                            className="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform active:scale-95 shadow-lg dark:focus:ring-offset-slate-900"
                                        >
                                            Añadir al Carrito
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Reseñas (Estilo YouTube) */}
                    <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 sm:p-8 border border-slate-100 dark:border-slate-700">
                        <CommentSection productId={productId} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
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

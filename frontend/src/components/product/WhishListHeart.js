const WishlistHeart =({

    addToWishlist,
    product,
    wishlist
})=>{
    

    const renderWishlistHeart = () => {
        let selected = false;

        if (
            wishlist &&
            wishlist !== null &&
            wishlist !== undefined &&
            product &&
            product !== null && 
            product !== undefined
        ) {
            wishlist.map(item => {
                if (item.product.id.toString() === product.id.toString()) {
                    selected = true;
                }
            });
        }
    
            if (selected) {
                return (
                    <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(); }}
                    className="relative z-50 pointer-events-auto ml-4 py-3 px-3 rounded-full flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-300 transform active:scale-90 shadow-sm border border-red-100">
                        <svg className="h-7 w-7 flex-shrink-0 fill-current animate-[pulse_1s_ease-in-out_1] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="sr-only">Remove from favorites</span>
                    </button>
                )
            } else {
                return (
                    <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(); }}
                    className="relative z-50 pointer-events-auto ml-4 py-3 px-3 rounded-full flex items-center justify-center text-gray-400 bg-gray-50 hover:bg-red-50 hover:text-red-400 transition-all duration-300 transform active:scale-90 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
                        <svg className="h-7 w-7 flex-shrink-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="sr-only">Add to favorites</span>
                    </button>
                )
            }
    }

    return(
        <>
        {renderWishlistHeart()}
        </>
    )
}

export default WishlistHeart
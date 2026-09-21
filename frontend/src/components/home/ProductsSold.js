import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
const products = [
    {
      id: 1,
      name: 'Black Basic Tee',
      price: '$32',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
      imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    // More products...
  ]
  
  export default function ProductsSold({data}) {
    const scrollRef = useRef(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)

    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -350 : 350
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }

    const handleScroll = (e) => {
      if (e.target.scrollLeft > 10) {
        setShowLeftArrow(true)
      } else {
        setShowLeftArrow(false)
      }
    }
    return (
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Los mas vendidos</h2>
            <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
              Browse all favorites<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
  
          <div className="relative mt-6">
            {showLeftArrow && (
              <button 
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-0 inset-y-0 z-20 w-12 sm:w-16 items-center justify-center bg-white/40 hover:bg-white/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 text-slate-800 dark:text-slate-200 backdrop-blur-sm transition-all cursor-pointer"
              >
                <ChevronLeftIcon className="h-10 w-10 hover:scale-110 transition-transform" />
              </button>
            )}

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-x-6 pb-6 px-4 snap-x snap-mandatory scroll-smooth hide-scroll-bar fade-edges"
            >
            {data && 
            data !== null &&
            data !== undefined &&
            data.map((product) => {
              console.log("[CHECKPOINT ProductsSold] rendering product:", product.name, "photo:", product.photo);
              return (
              <div key={product.id} className="group relative min-w-[280px] sm:min-w-[300px] snap-center shrink-0 px-2 py-4">
                <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] ring-1 ring-slate-200 dark:ring-slate-700 hover:z-10">
                  <div className="w-full h-96 rounded-t-xl overflow-hidden sm:h-[400px] relative">
                    <img
                      src={product.photo && product.photo.startsWith('http') ? product.photo : `${process.env.REACT_APP_API_URL}${product.photo || product.get_thumbnail}`}
                      alt=""
                      className="w-full h-full object-center object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => console.error("[CHECKPOINT ERROR ProductsSold] Failed to load image:", product.photo)}
                    />
                  </div>
                  <div className="p-4 rounded-b-xl">
                    <h3 className="text-base font-bold text-gray-900 dark:text-slate-100">
                      <Link to={`/product/${product.id}`}>
                        <span className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">${product.price}</p>
                  </div>
                </div>
              </div>
            )})}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 inset-y-0 z-20 w-12 sm:w-16 items-center justify-center bg-white/40 hover:bg-white/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 text-slate-800 dark:text-slate-200 backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRightIcon className="h-10 w-10 hover:scale-110 transition-transform" />
            </button>
          </div>
  
          <div className="mt-6 sm:hidden">
            <Link to="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Ver mas productos<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
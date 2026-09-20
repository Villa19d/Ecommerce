import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

  
export default function ProductsArrival({
      data
  }) {
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

    console.log("LA dataaaa es:",data)
    return (
      <div className="bg-transparent">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Lo mas reciente</h2>
  
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
             data.map((product) => (
              <div key={product.id} className="group relative min-w-[280px] sm:min-w-[300px] snap-center shrink-0 px-2 py-4">
                <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] ring-1 ring-slate-200 dark:ring-slate-700 hover:z-10">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-xl overflow-hidden lg:h-80 lg:aspect-none relative">
                    <img
                      src={product.get_thumbnail}
                      alt=""
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 rounded-b-xl">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                          <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">${product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

            <button 
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 inset-y-0 z-20 w-12 sm:w-16 items-center justify-center bg-white/40 hover:bg-white/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 text-slate-800 dark:text-slate-200 backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRightIcon className="h-10 w-10 hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    )
  }
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] ring-1 ring-slate-200 dark:ring-slate-700 hover:z-10 h-full">
      
      {/* Imagen */}
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-t-xl overflow-hidden relative">
        <img
          src={product.photo || product.get_thumbnail}
          alt={product.name}
          className="w-full h-full object-center object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {product.quantity > 0 ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 backdrop-blur-sm shadow-sm">
              En Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 backdrop-blur-sm shadow-sm">
              Agotado
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 rounded-b-xl flex flex-col flex-grow">
        
        {/* Título */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            <Link to={`/product/${product.id}`}>
              {/* This makes the whole card clickable except for z-10 elements */}
              <span aria-hidden="true" className="absolute inset-0 z-0" />
              {product.name}
            </Link>
          </h3>
          
          {/* Descripción Corta */}
          {product.description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Precios y Botón */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price}
            </p>
            {product.compare_price > product.price && (
              <p className="text-sm font-medium text-gray-400 line-through">
                ${product.compare_price}
              </p>
            )}
          </div>
          
          {/* Botón Ver Producto */}
          <div className="relative z-10">
            <button className="px-4 py-2 bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-sm font-bold rounded-lg group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer">
              Ver Producto
            </button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProductCard
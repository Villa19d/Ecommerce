import { Link } from "react-router-dom"
const ProductCard =({product})=>{
    return(
        
            <div key={product.id} className="group relative mx-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-slate-100 dark:border-slate-700">
              <div className="w-full aspect-w-1 aspect-h-1 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${product.price}</p>
                </div>
              </div>
            </div>
    )
}

export default ProductCard
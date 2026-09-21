import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SearchBox = ({
    categories,
    search,
    onChange,
    onSubmit,
}) => {
    const [suggestions, setSuggestions] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Debounced search for suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (search.trim().length === 0) {
                setSuggestions([])
                setIsDropdownOpen(false)
                return
            }

            try {
                const config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                const body = JSON.stringify({
                    search: search,
                    category_id: 0 // fetch from all categories for suggestions
                });

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/search`, body, config);
                if (res.status === 200 && res.data.search_products) {
                    setSuggestions(res.data.search_products)
                    setIsDropdownOpen(true)
                }
            } catch (err) {
                console.error("Error fetching suggestions", err)
            }
        }

        const debounceTimer = setTimeout(() => {
            fetchSuggestions()
        }, 300) // 300ms debounce

        return () => clearTimeout(debounceTimer)
    }, [search])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={dropdownRef} className="relative w-full">
            <form onSubmit={e => {
                setIsDropdownOpen(false);
                onSubmit(e);
            }} className="w-full text-base font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                <div className="flex rounded-md shadow-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">

                    <div className="px-2 py-1 flex items-center bg-slate-50 dark:bg-slate-700 rounded-l-md border-r border-slate-300 dark:border-slate-600"
                    >
                        <select
                            onChange={e => onChange(e)}
                            name='category_id'
                            className=" flex items-center bg-transparent border-transparent text-slate-500 dark:text-slate-300 focus:ring-0 text-sm py-1 md:w-32 cursor-pointer truncate"
                            style={{ width: "130px" }}

                        >
                            <option value={0}>All</option>
                            {
                                categories &&
                                categories !== null &&
                                categories !== undefined &&
                                categories.map((category, index) => (
                                    <option key={index} value={category.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="relative flex items-stretch flex-grow focus-within:z-10" style={{ width: "50px" }}>
                        <input
                            type="search"
                            name="search"
                            onChange={e => {
                                onChange(e)
                                if (!isDropdownOpen) setIsDropdownOpen(true)
                            }}
                            onFocus={() => {
                                if (search.trim().length > 0) setIsDropdownOpen(true)
                            }}
                            value={search}
                            required
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none px-4 sm:text-sm border-transparent bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                            placeholder="¿Qué buscas hoy?"
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border-l border-transparent text-sm font-medium rounded-r-md text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <SearchIcon className="h-5 w-5 text-slate-400 dark:text-slate-300" aria-hidden="true" />
                    </button>
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isDropdownOpen && suggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <ul className="max-h-80 overflow-y-auto py-1">
                        {suggestions.slice(0, 6).map((product) => (
                            <li key={product.id}>
                                <Link
                                    to={`/product/${product.id}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex-shrink-0 h-10 w-10 bg-slate-100 dark:bg-slate-900 rounded overflow-hidden">
                                        <img
                                            src={product.photo && product.photo.startsWith('http') ? product.photo : `${process.env.REACT_APP_API_URL}${product.photo}`}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1 overflow-hidden">
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {product.category.name}
                                        </p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                        ${product.price}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {suggestions.length > 6 && (
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-700/50 text-center border-t border-slate-200 dark:border-slate-700">
                            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer" onClick={(e) => {
                                setIsDropdownOpen(false);
                                document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                            }}>
                                Ver {suggestions.length} resultados completos...
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* No Results Fallback */}
            {isDropdownOpen && search.trim().length > 0 && suggestions.length === 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    No se encontraron productos para "{search}"
                </div>
            )}
        </div>
    )
}

export default SearchBox
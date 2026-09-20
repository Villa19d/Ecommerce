import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadIcon, XIcon, CheckIcon, ClockIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
const WishlistItem = ({
    item,
    count,
    update_item,
    remove_wishlist_item,
    add_item,
    render,
    setRender,
    setAlert
}) => {
    const [formData, setFormData] = useState({
        item_count: 1
    });

    const { item_count } = formData;

    useEffect(() => {
        if (count)
            setFormData({ ...formData, item_count: count });
    }, [count]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        const fetchData = async () => {
            try {
                if (item.product.quantity >= item_count) {
                    await update_item(item, item_count);
                }
                else {
                    setAlert('Not enough in stock', 'danger');
                }
                setRender(!render);
            } catch (err) {

            }
        };

        fetchData();
    }

    const removeItemHandler = async () => {
        await remove_wishlist_item(item.product.id);
        setRender(!render);
    };

    const addToCartHandler = async () => {
        if (item.product && item.product.quantity > 0) {
            await add_item(item.product);
            setRender(!render);
            setAlert('Artículo agregado al carrito', 'success');
        } else {
            setAlert('El artículo está agotado', 'danger');
        }
    };

    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <Link to={`/product/${item.product.id}`}>
                    <img
                        src={item.product.photo}
                        alt=""
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                </Link>
            </div>

            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <Link to={`/product/${item.product.id}`} className="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                                    {item.product.name}
                                </Link>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 dark:text-gray-400">Color</p>
                            {/* {product.size ? (
                    <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.size}</p>
                    ) : null} */}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">$ {item.product.price}</p>
                        <div className="mt-4 flex items-center justify-start ">
                            <button
                                onClick={addToCartHandler}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Agregar a carrito
                            </button>
                        </div>
                    </div>


                    <div className="absolute top-0 right-0 mt-2 sm:mt-0">
                        <button
                            onClick={removeItemHandler}
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors">
                            <span className="sr-only">Remove</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <p className="mt-4 flex text-sm text-gray-700 dark:text-gray-300 space-x-2">
                    {
                        item.product &&
                            item.product !== null &&
                            item.product !== undefined &&
                            item.product.quantity > 0 ?
                            (
                                <>
                                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                    <span>In Stock</span>
                                </>
                            )
                            : (
                                <>
                                    <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-gray-500" aria-hidden="true" />
                                    <span>Out of Stock</span>
                                </>
                            )}
                </p>
            </div>
        </li>
    )
}
export default WishlistItem
import axios from "axios";
import { Loader2, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../context/Context";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function DetailPage() {
    let { loading, error, cartProduct, addToCart, increaseQty, decreaseQty } = useFetch();
    let { id } = useParams();
    let [productsInfo, setProductsInfo] = useState(null);

    // 1. Check quantity for this specific product
    const productInCart = cartProduct.find((p) => p.id === Number(id));
    const quantity = productInCart ? (productInCart.quantity || 1) : 0;

    async function getProducts() {
        try {
            let response = await axios.get(`https://dummyjson.com/products/${id}`);
            setProductsInfo(response.data);
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    }

    useEffect(() => {
        getProducts();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className='flex items-center justify-center h-screen'><Loader2 className="animate-spin" size={40} /></div>;
    if (error) return <div className='flex items-center justify-center h-screen text-xl font-bold text-red-500'>{error}</div>;
    if (!productsInfo) return null;

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-6">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link to="/" className="hover:text-indigo-600 capitalize">{productsInfo.category}</Link>
                        </li>
                        <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" className="h-5 w-4 text-gray-300">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                        <li className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
                            {productsInfo.title}
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8">
                    {/* LEFT: Image Gallery */}
                    <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-center aspect-square">
                            <img
                                alt={productsInfo.title}
                                src={productsInfo.thumbnail}
                                className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="mt-8 lg:mt-0">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">{productsInfo.title}</h1>

                        <div className="mt-4 flex items-center justify-between lg:justify-start lg:gap-8">
                            <p className="text-3xl font-bold text-gray-900">${productsInfo.price}</p>
                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-bold text-yellow-700">{productsInfo.rating}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-md uppercase">
                                Brand: {productsInfo.brand || "Generic"}
                            </span>
                            <span className={classNames(
                                productsInfo.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
                                "text-xs font-bold px-3 py-1 rounded-md uppercase"
                            )}>
                                {productsInfo.availabilityStatus} ({productsInfo.stock})
                            </span>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Description</h3>
                            <p className="mt-3 text-base text-gray-600 leading-relaxed">{productsInfo.description}</p>
                        </div>

                        {/* Updated Action Button / Quantity Controls */}
                        <div className="mt-10">
                            {quantity === 0 ? (
                                <button
                                    onClick={() => addToCart(productsInfo)}
                                    className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100"
                                >
                                    <ShoppingCart size={20} /> Add to Cart
                                </button>
                            ) : (
                                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-xl border-2 border-indigo-600">
                                    <button
                                        onClick={() => decreaseQty(productsInfo.id)}
                                        className="p-3 bg-white rounded-lg shadow-sm hover:text-red-600 transition-colors"
                                    >
                                        <Minus size={24} strokeWidth={3} />
                                    </button>

                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-indigo-600">{quantity}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">In Cart</span>
                                    </div>

                                    <button
                                        onClick={() => increaseQty(productsInfo.id)}
                                        className="p-3 bg-white rounded-lg shadow-sm hover:text-green-600 transition-colors"
                                    >
                                        <Plus size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 border-t border-gray-100 pt-8 grid grid-cols-2 gap-y-8 gap-x-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase">Return Policy</h3>
                                <p className="mt-2 text-sm text-gray-900">{productsInfo.returnPolicy}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase">Shipping</h3>
                                <p className="mt-2 text-sm text-gray-900">{productsInfo.shippingInformation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
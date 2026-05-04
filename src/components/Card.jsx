import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useFetch } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Card({ item, isCart }) {
    let { title, category, price, rating, thumbnail, discountPercentage, id } = item || {}
    let { cartProduct, setCartProduct, addToCart, increaseQty, decreaseQty } = useFetch()

    const productInCart = cartProduct.find((p) => p.id === id);
    const quantity = productInCart ? (productInCart.quantity || 0) : 0;

    const navigate = useNavigate();

    function goToDetail() {
        navigate(`/product/${id}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-70 w-full hover:-translate-y-2 hover:shadow-2xl duration-300 mt-10">
            <div onClick={goToDetail} className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36 h-32 object-contain" src={thumbnail} alt={title} />
            </div>

            <div className="text-gray-500/60 text-sm mt-2">
                <p>{category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{title}</p>

                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill={Math.round(rating) > i ? "#615fff" : "#615fff5a"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                        </svg>
                    ))}
                    <p className="ml-1 text-xs">({rating})</p>
                </div>

                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        ${discountPercentage} <span className="text-gray-500/60 md:text-sm text-xs line-through">${price}</span>
                    </p>

                    <div>
                        {isCart ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg border">
                                    <button onClick={() => decreaseQty(id)} className="hover:text-red-500"><Minus size={14} /></button>
                                    <span className="font-bold text-sm min-w-[15px] text-center">{quantity}</span>
                                    <button onClick={() => increaseQty(id)} className="hover:text-green-600"><Plus size={14} /></button>
                                </div>
                                <button onClick={() => setCartProduct(cartProduct.filter((p) => p.id !== id))}>
                                    <Trash2 size={26} className="text-red-600 cursor-pointer hover:scale-110 transition" />
                                </button>
                            </div>
                        ) : (
                            quantity === 0 ? (
                                <button onClick={() => addToCart(item)} className="hover:scale-110 transition p-2 bg-gray-50 rounded-full">
                                    <ShoppingCart size={24} className="text-blue-700 cursor-pointer" />
                                </button>
                            ) : (
                                <div className="flex items-center gap-3 bg-blue-700 text-white px-3 py-1 rounded-full shadow-md">
                                    <button onClick={() => decreaseQty(id)} className="font-bold cursor-pointer"><Minus size={16} /></button>
                                    <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                                    <button onClick={() => increaseQty(id)} className="font-bold cursor-pointer"><Plus size={16} /></button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
import axios from "axios"
import { Loader2, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useFetch } from "../context/Context"

// Helper for Tailwind classes
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailPage() {

    let { loading, error } = useFetch()
    if (loading) {
        return <div className='flex items-center justify-center h-screen animate-spin'><Loader2 size={30} /></div>
    } if (error) {
        return <div className='flex items-center justify-center h-screen text-4xl font-bold'>{error}</div>
    }

    let { id } = useParams()
    // Changed to null initially since API returns an Object
    let [productsInfo, setProductsInfo] = useState(null)

    let { cartProduct, setCartProduct } = useFetch()

    const handleAddToBag = (e) => {
        e.preventDefault();
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...currentCart, productsInfo];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartProduct([...cartProduct, productsInfo])
        // alert("Product added!");
    };


    async function getProducts() {
        try {
            let response = await axios.get(`https://dummyjson.com/products/${id}`)
            setProductsInfo(response.data)
        } catch (error) {
            console.error("Error fetching product:", error)

        }
    }


    useEffect(() => {
        getProducts();
    }, [id])

    if (!productsInfo) return <div className="text-center py-20">Loading...</div>

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            <Link to={"/"} className="font-medium text-gray-500 hover:text-gray-600">
                                {productsInfo.category}
                            </Link>
                        </li>
                        <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" className="h-5 w-4 text-gray-300">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                        <li className="text-sm">
                            <span className="font-medium text-gray-900">{productsInfo.title}</span>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery - Dynamically using productsInfo.images */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
                    <img
                        alt="Primary"
                        src={productsInfo.images[0]}
                        className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
                    />
                    {productsInfo.images[1] && (
                        <img
                            alt="Secondary"
                            src={productsInfo.images[1]}
                            className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                        />
                    )}
                    <img
                        alt="Thumbnail"
                        src={productsInfo.thumbnail}
                        className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                    />
                    <img
                        alt="Last"
                        src={productsInfo.images[productsInfo.images.length - 1]}
                        className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
                    />
                </div>

                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productsInfo.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">${productsInfo.price}</p>

                        {/* Dynamic Reviews/Rating */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(
                                                productsInfo.rating > rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200',
                                                'size-5 shrink-0',
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-gray-600">({productsInfo.rating})</p>
                                <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {productsInfo.reviews?.length} reviews
                                </span>
                            </div>
                        </div>

                        <form className="mt-10">
                            <button
                                onClick={handleAddToBag}
                                type="button"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
                            >
                                Add to cart
                            </button>
                        </form>

                        <div className="mt-6 border-t pt-4">
                            <p className="text-sm text-gray-500">Stock: {productsInfo.availabilityStatus} ({productsInfo.stock} units)</p>
                            <p className="text-sm text-gray-500">Brand: {productsInfo.brand}</p>
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 underline">Description</h3>
                            <div className="mt-4 space-y-6">
                                <p className="text-base text-gray-900">{productsInfo.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Return Policy</h3>
                            <p className="mt-4 text-sm text-gray-600">{productsInfo.returnPolicy}</p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
                            <p className="mt-4 text-sm text-gray-600">{productsInfo.shippingInformation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
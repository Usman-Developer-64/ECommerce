import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

let context_store = createContext()

function Context({ children }) {


    let [cartProduct, setCartProduct] = useState(() => {
        const savedCart = localStorage.getItem("my_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // let [cartProduct, setCartProduct] = useState([])
    let [filterProduct, setFilterProduct] = useState([])
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let [selectTab, setSelectTab] = useState("All")
    let [category, setCategory] = useState([])
    let [search, setSearch] = useState("")

    async function fetchCategory() {
        try {
            setError(null)
            setLoading(true)
            let result = await axios.get("https://dummyjson.com/products/categories")
            // console.log(result);
            setCategory(result.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    async function fetchProducts() {
        try {
            setError(null)
            setLoading(true)
            let result = await axios.get("https://dummyjson.com/products?limit=0")
            // console.log(result);

            setProducts(result.data.products)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
        fetchProducts()
    }, [])

    useEffect(() => {
        let product_copy = [...(products || [])]
        if (selectTab !== "All") {
            product_copy = product_copy.filter((item) => item.category === selectTab)
        }

        if (search.trim()) {
            product_copy = product_copy.filter((item) => item.title.toLowerCase().includes(search.trim().toLowerCase()))
        }
        setFilterProduct(product_copy)
    }, [selectTab, search, products])


    useEffect(() => {
        localStorage.setItem("my_cart", JSON.stringify(cartProduct));
    }, [cartProduct]);
    // let values = { products, search, setSearch, context_store, setProducts, filterProduct, category, selectTab, setSelectTab, loading, error, setFilterProduct }
    return (
        <context_store.Provider value={{
            products,
            search,
            setSearch,
            setProducts,
            filterProduct,
            category,
            selectTab,
            setSelectTab,
            loading,
            error,
            setFilterProduct,
            cartProduct,
            setCartProduct,
            setCategory

        }}>{children}</context_store.Provider>
    )
}

function useFetch() {
    return useContext(context_store)
}

export {
    Context,
    useFetch
}
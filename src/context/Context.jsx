import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

let context_store = createContext()

function Context({ children }) {
    let [cartProduct, setCartProduct] = useState(() => {
        const savedCart = localStorage.getItem("my_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    let [filterProduct, setFilterProduct] = useState([])
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let [selectTab, setSelectTab] = useState("All")
    let [category, setCategory] = useState([])
    let [search, setSearch] = useState("")

    const increaseQty = (id) => {
        setCartProduct((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartProduct((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const addToCart = (item) => {
        setCartProduct((prev) => {
            const isExist = prev.find((p) => p.id === item.id);
            if (isExist) return prev; // Agar pehle se hai to kuch mat karo
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    async function fetchCategory() {
        try {
            setError(null)
            setLoading(true)
            let result = await axios.get("https://dummyjson.com/products/categories")
            setCategory(result.data)
            setLoading(false)
        } catch (error) {
            setError(error.message); setLoading(false)
        }
    }

    async function fetchProducts() {
        try {
            setError(null)
            setLoading(true)
            let result = await axios.get("https://dummyjson.com/products?limit=0")
            setProducts(result.data.products)
            setLoading(false)
        } catch (error) {
            setError(error.message); setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory(); fetchProducts()
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

    return (
        <context_store.Provider value={{
            products, search, setSearch, setProducts, filterProduct,
            category, selectTab, setSelectTab, loading, error,
            setFilterProduct, cartProduct, setCartProduct, setCategory,
            increaseQty, decreaseQty, addToCart
        }}>
            {children}
        </context_store.Provider>
    )
}

const useFetch = () => useContext(context_store);
export { Context, useFetch };
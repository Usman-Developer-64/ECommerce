import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import DetailPage from "../pages/DetailPage"
import Contact from "../pages/Contact"
import Private from "../components/Private"

const Router = () => {
    return (
        <Routes>
            {/* Public Page */}
            <Route path="/login" element={<Login />} />

            {/* Private Pages (Managed by Private.jsx) */}
            <Route element={<Private />}>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<DetailPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default Router
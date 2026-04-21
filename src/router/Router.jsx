import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import { useUser } from "@clerk/react"
import DetailPage from "../pages/DetailPage"
import Contact from "../pages/Contact"
import Layout from "../pages/Layout"
import Private from "../components/Private"

const Router = () => {
    const { user, isLoaded } = useUser()

    if (!isLoaded) return null

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

            <Route element={<Private />}>
                {/* <Route element={<Layout />}> */}
                <Route path="/" element={<Home />} />
                <Route path="collection" element={<Collection />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="product/:id" element={<DetailPage />} />
                {/* </Route> */}
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default Router
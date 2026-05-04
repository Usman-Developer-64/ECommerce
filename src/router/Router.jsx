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
            {/* Public Page: Sirf login page bahar rahega */}
            <Route path="/login" element={<Login />} />

            {/* Private Routes: Jo bhi naya banda aayega, usay ye pages nahi dikhenge */}
            <Route element={<Private />}>
                {/* MAINE HOME KO ANDAR KAR DIYA HAI ✅ */}
                <Route path="/" element={<Home />} /> 
                <Route path="/collection" element={<Collection />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<DetailPage />} />
            </Route>

            {/* Agar koi galat URL dale toh "/" pe bhej do, 
                kyunki "/" ab private hai toh wo automatically login pe phenk dega */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
export default Router
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import { RedirectToSignIn } from "@clerk/react"
import DetailPage from "../pages/DetailPage"
import Contact from "../pages/Contact"
// import Private from "../components/Private"

const Router = () => {
    // let { user } = useUser()
    // console.log(user);

    return (
        <Routes>
            {/* <Route element={<Private />}> */}
            <Route index element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<DetailPage />} />
            {/* </Route> */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={
                <RedirectToSignIn />

            } />
        </Routes>

    )
}

export default Router
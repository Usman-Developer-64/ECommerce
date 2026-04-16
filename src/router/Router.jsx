import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import { RedirectToSignIn } from "@clerk/react"
import DetailPage from "../pages/DetailPage"
import Contact from "../pages/Contact"

const Router = () => {
    // let { user } = useUser()
    // console.log(user);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route index element={<>
                <SignedIn> <Home /> </SignedIn>
                <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>} />

            <Route path="/collection" element={<>
                <SignedIn> <Collection /> </SignedIn>
                <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>} />

            <Route path="/contact" element={<>
                <SignedIn> <Contact /> </SignedIn>
                <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>} />

            <Route path="/cart" element={<>
                <SignedIn> <Cart /> </SignedIn>
                <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>} />

            <Route path="/product/:id" element={<>
                <SignedIn> <DetailPage /> </SignedIn>
                <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>} />
            <Route path="*" element={
                <RedirectToSignIn />
            } />
        </Routes>

    )
}

export default Router
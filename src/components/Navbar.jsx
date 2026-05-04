import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LogOut, ShoppingCart, Menu, X, Search } from "lucide-react";
import { useFetch } from "../context/Context";
// SignedIn aur SignedOut add kiye hain niche
import { SignedIn, SignedOut, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();
    let navigate = useNavigate()
    let { cartProduct, search, setSearch } = useFetch()
    const { signOut } = useClerk();
    const { isLoaded, isSignedIn } = useUser(); // User status check karne ke liye
    const [isOpen, setIsOpen] = useState(false);

    // Sahi Logout function
    async function logout() {
        await signOut();
        // Clerk khud redirect handle kar lega agar aap dashboard mein set karein, 
        // warna ye line zaroori hai:
        navigate("/login");
    }

    if (location.pathname === "/login") return null;

    let navbar_items = [
        { name: "Home", url: "/" },
        { name: "Collection", url: "/collection" },
        { name: "Contact", url: "/contact" }
    ]

    return (
        <nav className='h-20 shadow-2xl px-6 sticky top-0 left-0 right-0 z-[100] md:px-20 lg:px-30 items-center flex flex-row justify-between bg-white'>
            <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>E-commerce</h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-center items-center gap-6">
                {navbar_items.map((item, index) => (
                    <NavLink
                        to={item.url}
                        key={index}
                        className={({ isActive }) => isActive ? "bg-blue-600 px-4 py-1.5 text-white rounded-full" : "text-black hover:text-blue-600 transition-colors"}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Search products"
                />
                <Search className="cursor-pointer" size={18} />
            </div>

            <div className="flex items-center gap-4">
                {/* Cart Icon */}
                <div className="flex relative cursor-pointer items-center" onClick={() => navigate("/cart")}>
                    <ShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                        {cartProduct.length}
                    </span>
                </div>

                {/* Clerk User Button - Ye tabhi dikhega jab user login ho */}
                <div className="flex items-center">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/login" />
                    </SignedIn>

                    <SignedOut>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm"
                        >
                            Login
                        </button>
                    </SignedOut>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-20 left-0 w-full bg-white shadow-xl flex flex-col items-center gap-6 py-10 transition-all duration-300 md:hidden z-50 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
                {navbar_items.map((item, index) => (
                    <NavLink
                        to={item.url}
                        key={index}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => isActive ? "text-blue-600 font-bold text-lg" : "text-black text-lg"}
                    >
                        {item.name}
                    </NavLink>
                ))}

                {/* Mobile Logout - Sirf login user ko dikhao */}
                <SignedIn>
                    <div onClick={() => { logout(); setIsOpen(false); }} className="flex gap-2 bg-red-600 px-6 py-3 rounded-xl items-center cursor-pointer">
                        <LogOut className="text-white" size={20} />
                        <span className="text-white font-medium">Logout</span>
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar;
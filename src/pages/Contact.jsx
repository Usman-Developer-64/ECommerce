import Footer from "./Footer";

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-screen"> {/* Footer fix ke liye wrapper */}
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>

            {/* flex-grow is liye taake footer neechay rahay */}
            <main className="grow flex items-center justify-center py-10 md:py-20 px-4">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-20 max-w-7xl w-full items-stretch">

                    {/* Left side: Form */}
                    <div className="p-2 md:p-5">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-start mb-4 tracking-tight">
                            Get in touch
                        </h1>
                        <p className="text-base text-gray-600 text-center md:text-start mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
                            Have a question or idea? Our approachable team would love to connect and support you.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                                    <input type="text" placeholder="David" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                                    <input type="text" placeholder="Andrew" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email id</label>
                                <input type="email" placeholder="david@company.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                                <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <select className="px-3 py-3 text-sm outline-none cursor-pointer text-gray-600 bg-gray-50 border-r border-gray-300">
                                        <option>US</option>
                                        <option>PK</option>
                                        <option>IN</option>
                                    </select>
                                    <input type="tel" placeholder="+1 342 123-456" className="flex-1 px-4 py-3 text-sm outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows="4" placeholder="How can we help?" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                            </div>

                            <div className="flex items-start gap-3">
                                <input type="checkbox" id="terms" className="w-5 h-5 mt-0.5 cursor-pointer accent-indigo-600 rounded" />
                                <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer">
                                    You agree to our <span className="text-indigo-600 font-medium underline">terms</span> and <span className="text-indigo-600 font-medium underline">privacy policy</span>.
                                </label>
                            </div>

                            <button type="submit" className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-sm cursor-pointer shadow-lg hover:shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-[0.98]">
                                Send message
                            </button>
                        </form>
                    </div>

                    {/* Right side: Image (Hidden on Mobile) */}
                    <div className="hidden md:flex rounded-3xl p-10 relative overflow-hidden flex-col justify-end min-h-125">
                        <img
                            src="https://assets.prebuiltui.com/images/components/form/form-rightside-image.png"
                            alt="3D shapes"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                        <div className="relative z-10">
                            <p className="text-lg text-white mb-4 leading-relaxed italic">
                                "Stop spending hours recreating layouts - with PrebuiltUI you can copy, customize and launch stunning UIs in minutes."
                            </p>
                            <p className="text-white font-medium">━ Emily Rodriguez</p>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
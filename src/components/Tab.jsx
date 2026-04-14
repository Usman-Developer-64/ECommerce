import { Loader2 } from "lucide-react";
import { useFetch } from "../context/Context";

export default function Tab() {
    const { category, setSelectTab, selectTab, error, loading } = useFetch();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-4">
                <Loader2 size={24} className="animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-xs p-2">{error}</p>;
    }

    return (
        <div className="w-full">
            {/* Desktop Heading - Sirf baray screens par dikhegi */}
            <h3 className="font-bold text-gray-700 px-2 mb-4 hidden md:block text-lg border-b pb-2">
                Categories
            </h3>

            {/* Main Container Changes:
                1. flex-row (Mobile par line mein) | md:flex-col (Desktop par niche ki taraf)
                2. overflow-x-auto (Mobile par swipe scroll) | md:overflow-visible
                3. no-scrollbar (Scrollbar hide karne ke liye)
            */}
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0 px-2 md:px-0">

                {/* All Button */}
                <button
                    onClick={() => setSelectTab("All")}
                    className={`px-5 py-2 md:py-2.5 rounded-full md:rounded-xl border text-sm md:text-base whitespace-nowrap transition-all ${selectTab === "All"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                >
                    All Products
                </button>

                {/* Category Buttons */}
                {category?.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectTab(item.slug)}
                        className={`px-5 py-2 md:py-2.5 rounded-full md:rounded-xl border text-sm md:text-base whitespace-nowrap capitalize transition-all ${selectTab === item.slug
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
import { Loader2 } from "lucide-react";
import { useFetch } from "../context/Context";

export default function Tab() {
    const { category, setSelectTab, selectTab, error, loading } = useFetch();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 size={30} className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <h1 className="h-screen flex items-center justify-center text-4xl font-bold">
                {error}
            </h1>
        );
    }
    return (
        <div className="flex gap-3 my-4 px-4 overflow-x-auto no-scrollbar">
            {/* All Button */}
            <button
                onClick={() => setSelectTab("All")}
                className={`px-6 py-2 rounded-full border whitespace-nowrap ${selectTab === "All" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
                    }`}
            >
                All
            </button>

            {/* Category Buttons */}
            {category?.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setSelectTab(item.slug)} // Slug use karein
                    className={`px-6 py-2 rounded-full border whitespace-nowrap capitalize ${selectTab === item.slug ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
                        }`}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}
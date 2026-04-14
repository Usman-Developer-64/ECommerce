import { Loader2 } from "lucide-react";
import Card from "../components/Card";
import { useFetch } from "../context/Context";
import Footer from "./Footer";

const Cart = () => {
  const { cartProduct, loading, error } = useFetch();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl md:text-4xl font-bold text-red-500 px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-12 py-20 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 px-2">
          Your Shopping Cart ({cartProduct?.length || 0})
        </h1>

        {cartProduct?.length > 0 ? (
          /* Grid System: Mobile par 1, Tablet par 2, Desktop par 3 ya 4 */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {cartProduct.map((item, index) => (
              <Card key={item.id || index} item={item} isCart={true} index={index} />
            ))}
          </div>
        ) : (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500 mb-5">Your cart is empty!</p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go Shopping
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
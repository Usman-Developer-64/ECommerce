import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { useFetch } from '../context/Context'

const Collections = () => {
  const { products, category, loading, error } = useFetch()

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='animate-spin text-blue-500' size={40} />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen text-2xl text-red-500 font-bold'>
        {error}
      </div>
    )
  }

  return (
    // Container ko center padding dein
    <div className='max-w-350 mx-auto px-4 pb-20'>
      {category && category.map((cat, index) => {

        const categoryProducts = products.filter((item) => {
          const pCatRaw = item.category?._id || item.category;
          const pCat = pCatRaw?.toString().toLowerCase().trim();
          const cName = cat.name?.toString().toLowerCase().trim();
          const cId = cat._id?.toString();
          const cSlug = cat.slug?.toString().toLowerCase().trim();

          return (pCat === cName || pCat === cId || pCat === cSlug);
        });

        return (
          <div key={cat._id || index} className="mb-12">
            {/* Heading ko center karne ke liye w-full text-center add kiya */}
            <div className='w-full mb-8 mt-10'>
              <h1 className='text-4xl uppercase font-black inline-block border-b-4 border-black pb-2'>
                {cat.name}
              </h1>
            </div>

            {/* Grid layout cards ko center aur barabar rakhne ke liye */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
              {categoryProducts.length > 0 ? (
                categoryProducts.map((value) => (
                  <Card key={value._id || value.id} item={value} />
                ))
              ) : (
                <div className="col-span-full w-full py-4 text-gray-400 italic bg-gray-50 pl-4 rounded">
                  No products found matching "{cat.name}".
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Collections
import { Loader2 } from 'lucide-react'
import { useFetch } from '../context/Context'
import Tab from '../components/Tab'
import Card from '../components/Card'
import Footer from './Footer'

const Home = () => {
  let { filterProduct, loading, error } = useFetch()

  if (loading) {
    return <div className='flex items-center justify-center h-screen'><Loader2 className='animate-spin' size={40} /></div>
  }

  if (error) {
    return <div className='flex items-center justify-center h-screen text-2xl md:text-4xl font-bold text-red-500 text-center px-4'>{error}</div>
  }

  return (
    /* md:h-screen desktop par height fix rakhega, mobile par auto rahega */
    <div className='flex flex-col md:h-screen md:overflow-hidden'>

      {/* MOBILE TAB SECTION: Yeh sirf mobile (sm) par nazar aayega */}
      <div className='md:hidden bg-white border-b sticky top-0 z-20 p-2'>
        <Tab />
      </div>

      <div className='flex flex-col md:flex-row flex-grow md:overflow-hidden'>

        {/* DESKTOP SIDEBAR: Yeh mobile par hidden rahega */}
        <aside className='hidden md:block w-[20%] border-r border-gray-200 h-full overflow-y-auto no-scrollbar bg-white'>
          <div className='p-6'>
            <h2 className='font-bold mb-4 text-gray-800 text-lg border-b pb-2'>Filters</h2>
            <Tab />
          </div>
        </aside>

        {/* MAIN PRODUCT AREA */}
        <main className='flex-grow h-full overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 md:py-10'>

          {/* Grid Layout Adjustment */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center'>
            {
              filterProduct?.length > 0 ? (
                filterProduct.map((item, index) => (
                  <Card key={item.id || index} item={item} />
                ))
              ) : (
                <div className='col-span-full text-center py-20 text-gray-500'>
                  No products found.
                </div>
              )
            }
          </div>

          <Footer />
        </main>

      </div>
    </div>
  )
}

export default Home
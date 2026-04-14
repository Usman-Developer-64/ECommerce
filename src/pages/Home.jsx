import { Loader2 } from 'lucide-react'
import { useFetch } from '../context/Context'
import Tab from '../components/Tab'
import Card from '../components/Card'

const Home = () => {
  let { filterProduct, loading, error } = useFetch()
  if (loading) {
    return <div className='flex items-center justify-center h-screen animate-spin'><Loader2 size={30} /></div>
  } if (error) {
    return <div className='flex items-center justify-center h-screen text-4xl font-bold'>{error}</div>
  }


  return (
    <>
      <Tab />
      <div className='flex flex-wrap gap-10 justify-evenly px-25'>
        {
          filterProduct?.map((item, index) => (
            <Card key={index || item} item={item} />
          ))
        }
      </div>
    </>
  )
}

export default Home

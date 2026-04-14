import { Loader2 } from "lucide-react";
import Card from "../components/Card"
import { useFetch } from "../context/Context";

const Cart = () => {
  let { loading, error } = useFetch()
  if (loading) {
    return <div className='flex items-center justify-center h-screen animate-spin'><Loader2 size={30} /></div>
  } if (error) {
    return <div className='flex items-center justify-center h-screen text-4xl font-bold'>{error}</div>
  }

  const { cartProduct } = useFetch();
  return (
    <div className='flex flex-wrap gap-10 justify-evenly px-25 mt-20'>
      {
        cartProduct?.map((item, index) => (
          <Card key={index} item={item} isCart={true} index={index} />
        ))
      }
    </div>
  )
}

export default Cart

import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Router from './router/Router'
import Navbar from './components/Navbar'
import Footer from './pages/Footer'

const App = () => {

  return (
    <div>
      <Toaster />
      <Navbar />
      <Router />
      <Footer />
    </div>
  )
}

export default App
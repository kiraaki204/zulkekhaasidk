import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import BagProvider from './hooks/BagProvider'
import Home from './pages/Home'
import Product from './pages/Product'
import BotanicalBook from './pages/BotanicalBook'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BagProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/botanical-book" element={<Navigate to="/botanical-book/vintage" replace />} />
            <Route path="/botanical-book/:concept" element={<BotanicalBook />} />
            <Route path="/botanical-garden" element={<Navigate to="/botanical-book" replace />} />
            <Route path="/journal/*" element={<Navigate to="/botanical-book" replace />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BagProvider>
  )
}

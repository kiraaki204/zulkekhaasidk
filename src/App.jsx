import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import BagProvider from './hooks/BagProvider'
import { BrandLoader } from './components/common/BrandLoader'
import Home from './pages/Home'

const Product = lazy(() => import('./pages/Product'))
const BotanicalGarden = lazy(() => import('./pages/BotanicalGarden'))
const Journal = lazy(() => import('./pages/Journal'))
const Reviews = lazy(() => import('./pages/Reviews'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BagProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/product"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Product />
                </Suspense>
              }
            />
            <Route
              path="/botanical-garden"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <BotanicalGarden />
                </Suspense>
              }
            />
            <Route
              path="/journal/*"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Journal />
                </Suspense>
              }
            />
            <Route
              path="/reviews"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Reviews />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="/order-success"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <OrderSuccess />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <Admin />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<BrandLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </BagProvider>
  )
}

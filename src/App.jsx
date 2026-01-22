import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductPage from "./pages/ProductPage"

const App = () => {
  return (
    <>
     <Navbar />
     <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/products" element={<ProductPage />} />
     </Routes>
     <Footer />
    </>
  )
}
export default App
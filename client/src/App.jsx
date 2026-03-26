import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import MainDashboard from "./pages/admin/MainDashboard";
import ProductList from "./pages/admin/ProductList";
import CategoryList from "./pages/admin/CategoryList";
import UserList from "./pages/admin/UserList";
import OrderList from "./pages/admin/OrderList";
import { Toaster } from 'react-hot-toast'
import CheckOutForm from "./pages/CheckOutForm";
import UserOrderList from "./pages/UserOrderList";
import EsewaForm from "./pages/EsewaForm";
import EsewaSuccesPage from "./pages/EsewaSuccesPage";
import { useUserProfile } from "./api/authServices";
import { useEffect } from "react";
import useAuthStore from "./zustand/useAuth";

const App = () => {
//   const {setUser,fetchCurrentUser} = useAuthStore()
//   // const {data} = useUserProfile()

//   // console.log(data)

//  useEffect(() => {
//   fetchCurrentUser()
// }, []);

  return (
    <>
      <Toaster />
      <Routes>
        {/* main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutForm />} />
          <Route path="/orders" element={<UserOrderList />} />
        </Route>

        <Route path="/esewa/form" element={<EsewaForm />} />
        <Route path="/esewa/success/:orderId" element={<EsewaSuccesPage />} />

        {/* admin layout */}
        <Route path="/dashboard" element={<AdminLayout />}>
            <Route path="main" element={<MainDashboard />} />
            <Route path="product/list" element={<ProductList />} />
            <Route path="category/list" element={<CategoryList />} />
            <Route path="user/list" element={<UserList />} />
            <Route path="order/list" element={<OrderList />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;

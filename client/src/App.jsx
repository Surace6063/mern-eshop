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

const App = () => {
  return (
    <>
      <Routes>
        {/* main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

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

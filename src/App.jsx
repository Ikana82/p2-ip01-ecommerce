import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AddProductPage from "./pages/AddProductPage";
import HomePublicPage from "./pages/HomePublicPage";
import DetailProduct from "./components/DetailProduct";
import MenPublicPage from "./pages/MenPublicPage";
import WomenPublicPage from "./pages/WomenPublicPage";
import ProductPublicPage from "./pages/ProductPublicPage";
import PublicLayout from "./layout/PublicLayout";
import CartPublicPage from "./components/CartPublicPage";
import AddCategoryOption from "./pages/AddCategoryOption";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthContextProvider from "./contexts/AuthContext";
import CheckOutPage from "./components/CheckOutPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePublicPage />} />
            <Route path="/products" element={<ProductPublicPage />} />
            <Route path="/men" element={<MenPublicPage />} />
            <Route path="/woman" element={<WomenPublicPage />} />
            <Route path="/product/:id" element={<DetailProduct />} />
            <Route path="/cart" element={<CartPublicPage />} />
          </Route>

          {/* Routes di luar layout Public */}
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/add-new" element={<AddProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-category" element={<AddCategoryOption />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

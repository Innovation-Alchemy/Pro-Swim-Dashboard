import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import ProductLayout from "./layouts/ProductLaytout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import OrderLayout from "./layouts/OrderLayout";
import EditProduct from "./pages/EditProduct";
import Users from "./pages/Users";
import UsersLayout from "./layouts/UsersLayout";
import UserDetails from "./pages/UserDetails";
import UserDetailsOrders from "./pages/UserDetailsOrders";
import UserDetailsEmails from "./pages/UserDetailsEmails";
import LearnToSwimLayout from "./layouts/LearnToSwimLayout";
import BrandLayout from "./layouts/BrandLayout";
import CategoriesLayout from "./layouts/CategoriesLayout";
import Orders from "./pages/Orders";
import LearnToSwim from "./pages/LearnToSwim";
import AddLearnToSwim from "./pages/AddLearnToSwim";
import EmailDetail from "./components/EmailDetail";
import Signin from "./components/Signin";
import Brand from "./pages/Brand";
import AddBrand from "./pages/AddBrand";
import Categ from "./pages/Categ";
import AddCateg from "./pages/AddCateg";
import Login from "./pages/Login";
import EditBrand from "./pages/EditBrand";
import EditCateg from "./pages/EditCateg";
import PrivateRoute from "./components/PrivateRoute";
import "@mdxeditor/editor/style.css";

function App() {
  return (
    <Router>
      <div className="md:flex block min-h-screen bg-[#edf6ff]">
        <Sidebar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersLayout />}>
              <Route index element={<Users />} />
              <Route path="get/:id" element={<UserDetails />}>
                <Route path="orders" element={<UserDetailsOrders />} />
                <Route path="emails" element={<UserDetailsEmails />} />
              </Route>
              <Route path="email/:id/:category" element={<EmailDetail />} />
            </Route>
            <Route path="/learn-to-swim" element={<LearnToSwimLayout />}>
              <Route index element={<LearnToSwim />} />
              <Route path="add" element={<AddLearnToSwim />} />
            </Route>
            <Route path="/products" element={<ProductLayout />}>
              <Route index element={<Products />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
            </Route>
            <Route path="/brands" element={<BrandLayout />}>
              <Route index element={<Brand />} />
              <Route path="add" element={<AddBrand />} />
              <Route path="edit/:id" element={<EditBrand />} />
            </Route>
            <Route path="/categories" element={<CategoriesLayout />}>
              <Route index element={<Categ />} />
              <Route path="add" element={<AddCateg />} />
              <Route path="edit/:id" element={<EditCateg />} />
            </Route>
            <Route path="/orders" element={<OrderLayout />}>
              <Route index element={<Orders />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
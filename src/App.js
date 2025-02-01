import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import ProductList from "./components/Admin/ProductList";
import ProductDetails from "./components/User/ProductDetails"; 
import UserDashboard from "./components/User/UserDashboard";
import Cart from "./components/User/Cart";
import Checkout from "./components/User/Checkout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/allinoneplace" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/userdashboard/:id" element={<UserDashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
}

export default App;

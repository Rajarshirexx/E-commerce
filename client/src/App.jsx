import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Contact from "./Pages/contact";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./Pages/Verify";

export default function App() {
  return (
    <div className="px-4 sm:px-5vw md:px-7vw lg:px-9vw ">
      <ToastContainer />
      <Navbar />
      <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />}  />  
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>

      <Footer />
      
    </div>
  )
}


import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./homepage/Homepage";
import Shop from "./shopscreen/Shop";
import TeeDetail from "./components/product/TeeDetail";
import HatDetail from "./components/product/HatDetail";
import Checkout from "./shopscreen/Checkout";
import { Success, Cancel } from "./shopscreen/OrderResult";
import Contact from "./shopscreen/Contact";
import Shipping from "./shopscreen/Shipping";

function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <CartDrawer />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/tees/:slug" element={<TeeDetail />} />
        <Route path="/shop/hats/:slug" element={<HatDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="*" element={<Shop />} />
      </Routes>
    </>
  );
}

export default App;
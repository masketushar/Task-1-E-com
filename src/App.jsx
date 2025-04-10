import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ProductDetail from './components/pages/ProductDetail';
import Cart from './components/pages/Cart';
import Navbar from './components/Header/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
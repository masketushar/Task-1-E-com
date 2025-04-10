import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCart();
  
  // Calculate the total number of items in the cart
  return (
    <nav className="flex items-center justify-between p-4 md:px-8 lg:px-12 shadow-md bg-white sticky top-0 z-10 transition-all duration-300">
      <Link to="/" className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
        MiniShop
      </Link>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
          Home
        </Link>
        <Link to="/cart" className="relative flex flex-row text-gray-700 hover:text-blue-500 font-medium transition-colors">
       <span className='mt-1 mr-1'><FaShoppingCart />
       </span> Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>

            
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
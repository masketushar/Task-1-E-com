import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from "react-icons/fa"; 
import { AiOutlineEye } from "react-icons/ai";






const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
    <Link to={`/products/${product.id}`} className="flex-grow">
      <div className="relative pb-[100%]">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h2 className="font-medium text-gray-800 mb-2">{product.title}</h2>
        <div className="flex justify-center items-center space-x-2">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="text-gray-500 line-through text-sm">${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
    <div className="p-3 pt-0 flex items-center space-x-1">
      <Link 
        to={`/products/${product.id}`} 
        className="flex-1 text-blue-400  hover:text-blue-800 text-sm font-medium flex items-center justify-center py-1"
      ><div>
        <AiOutlineEye />
        </div>
        View Detail
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="flex-1 text-green-400 hover:text-green-800 text-sm font-medium flex items-center justify-center py-1"
      >
       <div><FaShoppingCart /></div>
        Add To Cart
      </button>
    </div>
  </div>
  );
};

export default ProductCard;
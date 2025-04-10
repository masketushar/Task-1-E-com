import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) return (
    <div className="text-center p-6 bg-red-50 rounded-lg shadow-md max-w-lg mx-auto mt-12">
      <h3 className="text-xl font-semibold mb-2 text-red-600">Product Not Found</h3>
      <p>Sorry, we couldn't find the product you're looking for.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-100">
          <div className="relative aspect-square">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Navigation Arrows */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.title}</h1>
          
          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 stroke-gray-400"}`}>
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.rating} Reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-green-600 font-medium">{product.discountPercentage}% off</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed my-4">{product.description}</p>

          {/* Sizes */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Sizes:</p>
            <div className="flex space-x-3">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${selectedSize === size ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  <span className="text-sm">{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Colors:</p>
            <div className="flex space-x-3">
              {['Black', 'White', 'Red', 'Blue', 'Green'].map(color => (
                <button 
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${selectedColor === color ? 'border-blue-500 p-0.5' : 'border-gray-300'}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase() }}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center space-x-4 mt-6">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={handleDecrement}
                className="px-3 py-1 text-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="px-3 py-1 text-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r"
              >
                +
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              Add To Cart
            </button>
          </div>

          {/* Social Share */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <p className="text-gray-700 mb-2">Share on:</p>
            <div className="flex space-x-3">
              <button className="text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </button>
              <button className="text-gray-600 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
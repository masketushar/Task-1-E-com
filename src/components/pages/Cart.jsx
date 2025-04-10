import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors duration-200">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-medium">
                <div className="col-span-6">Products</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-3">
                      <img src={item.thumbnail} alt={item.title} className="w-14 h-14 object-cover rounded" />
                      <span className="font-medium text-gray-800 line-clamp-2">{item.title}</span>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-center">${item.price}</div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center bg-rose-200 text-rose-700 rounded-l"
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center bg-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-rose-200 text-rose-700 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="col-span-1 text-center">${(item.price * item.quantity).toFixed(2)}</div>
                    
                    {/* Remove Button */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-rose-200 text-rose-700 rounded hover:bg-rose-300"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Coupon Code Section */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code" 
                className="flex-grow p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button className="bg-rose-300 hover:bg-rose-400 text-rose-800 py-2 px-6 rounded transition-colors duration-200">
                Apply Coupon
              </button>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-4 text-lg font-semibold text-gray-800">
                Cart Summary
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200 text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded transition-colors duration-200 font-medium">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Back to Top Button */}
      <div className="flex justify-end mt-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Cart;
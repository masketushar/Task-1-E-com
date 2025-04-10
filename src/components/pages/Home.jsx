import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Header/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center p-6 bg-red-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Oops!</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Our Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div key={product.id} className="transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
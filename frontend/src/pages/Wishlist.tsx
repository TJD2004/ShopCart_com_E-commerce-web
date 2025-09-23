import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to move to cart:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your wishlist</h1>
        <Link to="/auth" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save items you love for later</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product: any) => (
          <div key={product._id} className="card group overflow-hidden">
            <div className="relative">
              <Link to={`/products/${product._id}`}>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700"
              >
                <Heart className="h-5 w-5 fill-current" />
              </button>
            </div>
            
            <div className="p-4 space-y-2">
              <Link to={`/products/${product._id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-lg font-bold text-gray-900">${product.price}</p>
              
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full btn-primary mt-3 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
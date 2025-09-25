import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: { average: number; count: number };
  category: string;
  subcategory?: string;
  brand?: string;
  description?: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const [loading, setLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (wishlist) {
      setIsWishlisted(wishlist.some((item: any) => item._id === product._id));
    }
  }, [wishlist, product._id]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    setLoading(true);
    try {
      await addToCart(product._id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to={`/products/${product._id}`} className="flex-shrink-0 mx-auto sm:mx-0">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg"
            />
          </Link>
          
          <div className="flex-1 space-y-3">
            <div>
              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-primary-600 mb-1 text-center sm:text-left">
                  {product.name}
                </h3>
              </Link>
              
              {product.brand && (
                <p className="text-sm text-gray-500 mb-2 text-center sm:text-left">by {product.brand}</p>
              )}
              
              <p className="text-sm sm:text-base text-gray-600 line-clamp-2 text-center sm:text-left">{product.description}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-1 justify-center sm:justify-start">
                {renderStars(product.rating.average)}
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating.average} ({product.rating.count} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-green-600">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-base sm:text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2 justify-center sm:justify-end">
                {isAuthenticated && (
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                )}
                
                <button
                  onClick={handleAddToCart}
                  disabled={loading || !isAuthenticated || product.stock === 0}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 text-sm sm:text-base px-3 sm:px-4 py-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md">
            {discount}% OFF
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
            Out of Stock
          </div>
        )}
        
        {isAuthenticated && (
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
              isWishlisted 
                ? 'text-red-500 bg-white shadow-md scale-110' 
                : 'text-gray-400 bg-white shadow-md hover:text-red-500 hover:scale-110'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            to={`/products/${product._id}`}
            className="bg-white text-gray-900 px-3 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transform scale-95 group-hover:scale-100 transition-transform duration-200 text-sm sm:text-base"
          >
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium">Quick View</span>
          </Link>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div>
          {product.brand && (
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1 text-center sm:text-left">
              {product.brand}
            </p>
          )}
          <Link to={`/products/${product._id}`}>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-primary-600 line-clamp-2 leading-tight text-center sm:text-left">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 justify-center sm:justify-start">
          {renderStars(product.rating.average)}
          <span className="text-sm text-gray-600 ml-2">
            ({product.rating.count})
          </span>
        </div>
        
        <div className="flex items-center space-x-2 justify-center sm:justify-start">
          <span className="text-lg sm:text-xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <Package className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-600">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {product.subcategory && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-center">
              {product.subcategory.replace('-', ' ')}
            </span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={loading || !isAuthenticated || product.stock === 0}
          className="w-full btn-primary mt-2 sm:mt-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </>
          )}
        </button>
        
        {!isAuthenticated && (
          <p className="text-xs text-gray-500 text-center mt-1 sm:mt-2">
            <button 
              onClick={() => navigate('/auth')} 
              className="text-primary-600 hover:underline"
            >
              Sign in
            </button> to add to cart
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
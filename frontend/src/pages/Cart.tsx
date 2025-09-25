import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 sm:h-32 sm:w-32 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">Discover amazing products and start shopping today!</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 justify-center">
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Continue Shopping</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
            <Link to="/" className="btn-secondary inline-flex items-center space-x-2">
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex items-center space-x-4 mb-6 sm:mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="card p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={`/products/${item.product._id}`} className="flex-shrink-0 mx-auto sm:mx-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                  />
                </Link>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div>
                    <Link 
                      to={`/products/${item.product._id}`}
                      className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-primary-600 block text-center sm:text-left"
                    >
                      {item.product.name}
                    </Link>
                    
                    <div className="flex items-center space-x-2 mt-1 justify-center sm:justify-start">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        {item.product.stock > 0 ? 'In Stock' : 'Limited Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 justify-center sm:justify-start">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      ${item.product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      each
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 justify-center sm:justify-start">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="p-1.5 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-center sm:text-left">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Continue Shopping */}
          <div className="card p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Need something else?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Continue shopping to discover more amazing products</p>
            <Link to="/products" className="btn-secondary inline-flex items-center space-x-2">
              <span>Continue Shopping</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-4 sm:p-6 sticky top-20 sm:top-24 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Order Summary</h2>
            
            {/* Price Breakdown */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">Subtotal ({cart.length} items)</span>
                <span className="text-sm sm:text-base font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                <span className={`text-sm sm:text-base font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">Estimated Tax</span>
                <span className="text-sm sm:text-base font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {subtotal < 50 && subtotal > 0 && (
                <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button 
              onClick={() => navigate('/payment')}
              className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4 font-semibold"
            >
              Proceed to Checkout
            </button>
            
            {/* Security Features */}
            <div className="space-y-2 sm:space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure checkout with SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="h-4 w-4 text-purple-600" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
            
            {/* Continue Shopping Link */}
            <Link 
              to="/products" 
              className="block text-center text-primary-600 hover:text-primary-700 font-medium py-2 text-sm sm:text-base"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
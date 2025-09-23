import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  CheckCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Package,
  Truck,
  Calendar,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Payment: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review, 4: Success
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = 'ORD' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      setOrderPlaced(true);
      setStep(4);
      setLoading(false);
      clearCart();
    }, 3000);
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return shippingAddress.fullName && shippingAddress.email && 
               shippingAddress.phone && shippingAddress.street && 
               shippingAddress.city && shippingAddress.state && shippingAddress.zipCode;
      case 2:
        if (paymentMethod === 'credit_card') {
          return cardDetails.cardNumber && cardDetails.expiryDate && 
                 cardDetails.cvv && cardDetails.cardholderName;
        }
        return true;
      default:
        return true;
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart to proceed with checkout</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Start Shopping
        </button>
      </div>
    );
  }

  if (step === 4 && orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <CheckCircle className="h-32 w-32 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for your purchase!</p>
          <p className="text-lg text-gray-600 mb-8">
            Order ID: <span className="font-mono font-bold text-primary-600">{orderId}</span>
          </p>
          
          {/* Order Summary */}
          <div className="card p-6 max-w-md mx-auto mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              You'll receive a confirmation email shortly with tracking information.
            </p>
            <div className="space-x-4">
              <button onClick={() => navigate('/')} className="btn-primary">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/account')} className="btn-secondary">
                View Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={() => navigate('/cart')} className="p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase safely and securely</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[
            { number: 1, title: 'Shipping', icon: Truck },
            { number: 2, title: 'Payment', icon: CreditCard },
            { number: 3, title: 'Review', icon: Package }
          ].map((stepItem, index) => (
            <div key={stepItem.number} className="flex items-center">
              <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                step >= stepItem.number 
                  ? 'bg-primary-600 border-primary-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                <stepItem.icon className="h-5 w-5" />
                {step > stepItem.number && (
                  <CheckCircle className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 text-white rounded-full" />
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${step >= stepItem.number ? 'text-primary-600' : 'text-gray-500'}`}>
                  Step {stepItem.number}
                </p>
                <p className={`text-xs ${step >= stepItem.number ? 'text-primary-600' : 'text-gray-500'}`}>
                  {stepItem.title}
                </p>
              </div>
              {index < 2 && <div className="w-16 h-px bg-gray-300 mx-4 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-primary-600" />
                <span>Shipping Address</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                    className="input-field"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                    className="input-field"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                    className="input-field"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    className="input-field"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                    className="input-field"
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                    className="input-field"
                    placeholder="10001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                    className="input-field"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                disabled={!validateStep(1)}
                className="btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-primary-600" />
                <span>Payment Method</span>
              </h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <CreditCard className="h-6 w-6 text-primary-600" />
                  <div>
                    <span className="font-medium">Credit/Debit Card</span>
                    <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <div>
                    <span className="font-medium">PayPal</span>
                    <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900">Card Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      value={cardDetails.cardholderName}
                      onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                      className="input-field"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardDetails({...cardDetails, cardNumber: value});
                      }}
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                          setCardDetails({...cardDetails, expiryDate: value});
                        }}
                        className="input-field"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                        className="input-field"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  ← Back to Shipping
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!validateStep(2)}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary-600" />
                <span>Review Your Order</span>
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-900">Order Items ({cart.length})</h3>
                {cart.map((item) => (
                  <div key={item._id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-lg font-bold text-primary-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address Summary */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span>Shipping Address</span>
                </h3>
                <div className="text-gray-700">
                  <p className="font-medium">{shippingAddress.fullName}</p>
                  <p>{shippingAddress.street}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p>{shippingAddress.country}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <Mail className="h-4 w-4 inline mr-1" />
                    {shippingAddress.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <Phone className="h-4 w-4 inline mr-1" />
                    {shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Payment Method Summary */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Payment Method</span>
                </h3>
                <p className="text-gray-700">
                  {paymentMethod === 'credit_card' && `Credit Card ending in ${cardDetails.cardNumber.slice(-4)}`}
                  {paymentMethod === 'paypal' && 'PayPal'}
                  {paymentMethod === 'cod' && 'Cash on Delivery'}
                </p>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  ← Back to Payment
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Items Preview */}
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center space-x-2 text-sm">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security & Delivery Info */}
            <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  wishlist: any[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart`, {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart([]);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart/wishlist`, {
        withCredentials: true,
      });
      setWishlist(response.data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      setWishlist([]);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(response.data);
    } catch (error) {
      throw new Error('Failed to add item to cart');
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/update`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(response.data);
    } catch (error) {
      throw new Error('Failed to update cart item');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      throw new Error('Failed to remove item from cart');
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/wishlist/add`,
        { productId },
        { withCredentials: true }
      );
      setWishlist(response.data);
    } catch (error) {
      throw new Error('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/cart/wishlist/remove/${productId}`, {
        withCredentials: true,
      });
      setWishlist(response.data);
    } catch (error) {
      throw new Error('Failed to remove item from wishlist');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextType = {
    cart,
    cartCount,
    wishlist,
    addToCart,
    updateCartItem,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

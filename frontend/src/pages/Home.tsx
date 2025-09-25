import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/Product/ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: { average: number; count: number };
  category: string;
}

// Read backend base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const discountSlides = [
    {
      title: "Mega Sale - Up to 70% Off",
      subtitle: "Electronics & Gadgets",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Electronics",
      link: "/products?category=electronics"
    },
    {
      title: "Fashion Week Special",
      subtitle: "Trendy Clothing & Accessories",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Fashion",
      link: "/products?category=clothing"
    },
    {
      title: "Home Makeover Sale",
      subtitle: "Transform Your Living Space",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Home",
      link: "/products?category=home"
    }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    fetchProductsByCategory();
    seedProductsIfNeeded();

    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % discountSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const seedProductsIfNeeded = async () => {
    try {
      // Check if products exist
      const response = await axios.get(`${API_BASE_URL}/api/products?limit=1`);
      const products = response.data.products || response.data;

      if (!products || products.length === 0) {
        console.log('No products found, seeding database...');
        await axios.post(`${API_BASE_URL}/api/products/seed`);
        console.log('Products seeded successfully');
        // Refresh the page data
        fetchFeaturedProducts();
        fetchProductsByCategory();
      }
    } catch (error) {
      console.error('Error checking/seeding products:', error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products?featured=true&limit=8`);
      setFeaturedProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      setFeaturedProducts([]);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const categories = ['electronics', 'clothing', 'home', 'sports'];
      const categoryData: { [key: string]: Product[] } = {};

      await Promise.all(categories.map(async (category) => {
        const response = await axios.get(`${API_BASE_URL}/api/products?category=${category}&limit=4`);
        categoryData[category] = response.data.products || response.data;
      }));

      setProductsByCategory(categoryData);
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      setProductsByCategory({});
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % discountSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + discountSlides.length) % discountSlides.length);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with express delivery options'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and special offers'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Discount Slider */}
      <section className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <div className="relative h-full">
          {discountSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' :
                  index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative h-full flex items-center justify-center text-center text-white">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 animate-slide-up">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-lg text-sm sm:text-base md:text-lg transition-all duration-200 hover:scale-105 animate-bounce-subtle"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {discountSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 sm:p-6 card hover:scale-105 transform transition-transform duration-200">
              <div className="flex justify-center mb-4">
                <div className="p-2 sm:p-3 bg-primary-100 rounded-full">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Discover our most popular and trending items</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card p-4 animate-pulse">
                <div className="bg-gray-300 h-32 sm:h-40 md:h-48 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 rounded"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-300 h-6 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Products by Category */}
      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 capitalize">
              {category === 'electronics' ? 'Latest Electronics' :
                category === 'clothing' ? 'Fashion & Style' :
                  category === 'home' ? 'Home & Living' :
                    category === 'sports' ? 'Sports & Fitness' : category}
            </h2>
            <Link
              to={`/products?category=${category}`}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 text-sm sm:text-base"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      ))}

      {/* Categories Grid */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'electronics' },
              { name: 'Fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'clothing' },
              { name: 'Home & Garden', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'home' },
              { name: 'Sports & Fitness', image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'sports' },
              { name: 'Books', image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'books' },
              { name: 'Beauty', image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'beauty' },
              { name: 'Toys & Games', image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'toys' },
              { name: 'Automotive', image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'automotive' }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.category}`}
                className="group card overflow-hidden hover:scale-105 transform transition-transform duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated with Latest Deals</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8">Subscribe to our newsletter and never miss a great offer!</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
            />
            <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

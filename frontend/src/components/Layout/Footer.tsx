import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Logo from '../UI/Logo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface Category {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        // Fetch contact info from backend
        const contactRes = await fetch(`${API_BASE_URL}/api/contact-info`);
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          setContactInfo(contactData);
        }

        // Fetch categories from backend
        const categoriesRes = await fetch(`${API_BASE_URL}/api/categories`);
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Failed to load footer data:', error);
      }
    }
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="text-white" />
              <span className="text-xl font-bold">ShopCart.com</span>
            </div>
            <p className="text-gray-300">
              Your ultimate shopping destination for quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/account" className="text-gray-300 hover:text-white">My Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map(category => (
                  <li key={category.name}>
                    <Link to={category.path} className="text-gray-300 hover:text-white">
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {contactInfo?.email ?? 'support@shopcart.com'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {contactInfo?.phone ?? '+1 (555) 123-4567'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {contactInfo?.address ?? '123 Commerce St, City, State'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ShopCart.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

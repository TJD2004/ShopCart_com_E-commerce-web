import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Search, 
  Menu,
  ChevronDown,
  LogOut,
  Filter
} from 'lucide-react';
import { Badge, Menu as MuiMenu, MenuItem, Avatar, FormControl, Select } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Logo from '../UI/Logo';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'books', label: 'Books' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'toys', label: 'Toys' },
    { value: 'automotive', label: 'Automotive' },
  ];

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  // Enhanced search function with category filter
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    // Build the search URL with filters
    const searchParams = new URLSearchParams();
    if (trimmedQuery) {
      searchParams.set('search', trimmedQuery);
    }
    if (selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    }
    searchParams.set('page', '1');

    // Navigate to products page with search and filter parameters
    const queryString = searchParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
    
    // Clear search input after search
    setSearchQuery('');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 hidden xs:block">ShopCart.com</span>
            </Link>
          </div>

          {/* Center - Search Bar with Filter */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative flex">
              {/* Category Filter Dropdown */}
              <div className="flex-shrink-0">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{
                      borderRadius: '50px 0 0 50px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRight: 'none',
                        borderRadius: '50px 0 0 50px',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderRight: 'none',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderRight: 'none',
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        <span className="flex items-center space-x-2">
                          <Filter className="h-4 w-4" />
                          <span className="hidden lg:block">{category.label}</span>
                          <span className="lg:hidden">{category.label.split(' ')[0]}</span>
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-12 sm:pr-14 py-2 text-sm sm:text-base border border-l-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  style={{ borderRadius: '0' }}
                />
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                
                {/* Search Button */}
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-3 sm:px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-r-full transition-colors"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile search icon */}
            <button 
              onClick={() => navigate('/products')}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 md:hidden"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Navigation items */}
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 relative hidden sm:block">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                
                <Link to="/cart" className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 relative">
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Badge>
                </Link>

                <div>
                  <button
                    onClick={handleUserMenuClick}
                    className="flex items-center space-x-1 p-1.5 sm:p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Avatar sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, bgcolor: 'primary.main', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <ChevronDown className="h-4 w-4 hidden sm:block" />
                  </button>
                  
                  <MuiMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={() => { navigate('/account'); handleUserMenuClose(); }}>
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </MenuItem>
                  </MuiMenu>
                </div>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
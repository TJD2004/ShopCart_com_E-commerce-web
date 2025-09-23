import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Search, 
  Menu,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Badge, Menu as MuiMenu, MenuItem, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Logo from '../UI/Logo';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-2xl font-bold text-primary-600">ShopCart.com</span>
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900 md:hidden">
              <Search className="h-6 w-6" />
            </button>

            {/* Navigation items */}
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Heart className="h-6 w-6" />
                </Link>
                
                <Link to="/cart" className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCart className="h-6 w-6" />
                  </Badge>
                </Link>

                <div>
                  <button
                    onClick={handleUserMenuClick}
                    className="flex items-center space-x-1 p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
                className="btn-primary"
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
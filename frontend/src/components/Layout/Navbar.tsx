import React, { useState, useEffect } from 'react';
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
import {
  Badge,
  Menu as MuiMenu,
  MenuItem,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Logo from '../UI/Logo';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    setMobileSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(trimmedQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data?.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch search suggestions', err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Show sidebar toggle always, hidden on xl+ if you want */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Open sidebar menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link to="/" className="flex items-center space-x-3">
                <Logo />
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 hidden xs:block">
                  ShopCart.com
                </span>
              </Link>
            </div>

            {/* Center - Search Bar (desktop only) */}
            <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden md:block relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>

              {searchResults.length > 0 && (
                <Paper className="absolute w-full mt-1 rounded-md shadow z-50">
                  <List>
                    {searchResults.map((product: any) => (
                      <ListItem key={product._id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                        >
                          <ListItemText primary={product.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile search toggle */}
              <button
                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 md:hidden"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/wishlist"
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 relative hidden sm:block"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>

                  <Link
                    to="/cart"
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 relative"
                    aria-label="Shopping cart"
                  >
                    <Badge badgeContent={cartCount} color="primary">
                      <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Badge>
                  </Link>

                  <div>
                    <button
                      onClick={handleUserMenuClick}
                      className="flex items-center space-x-1 p-1.5 sm:p-2 text-gray-600 hover:text-gray-900"
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEl)}
                      aria-controls="user-menu"
                    >
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '1rem' }}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <ChevronDown className="h-4 w-4 hidden sm:block" />
                    </button>

                    <MuiMenu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleUserMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate('/account');
                          handleUserMenuClose();
                        }}
                      >
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

          {/* Mobile search input (toggleable) */}
          {mobileSearchOpen && (
            <div className="md:hidden px-4 pb-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>

              {searchResults.length > 0 && (
                <Paper className="mt-1 rounded-md shadow z-50">
                  <List>
                    {searchResults.map((product: any) => (
                      <ListItem key={product._id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                            setSearchQuery('');
                            setSearchResults([]);
                            setMobileSearchOpen(false);
                          }}
                        >
                          <ListItemText primary={product.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Home, 
  Package, 
  Smartphone, 
  Shirt, 
  Monitor,
  Gamepad2,
  Book,
  Sparkles,
  Car,
  Dumbbell
} from 'lucide-react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  { name: 'Electronics', icon: Smartphone, path: '/products?category=electronics' },
  { name: 'Clothing', icon: Shirt, path: '/products?category=clothing' },
  { name: 'Home & Garden', icon: Home, path: '/products?category=home' },
  { name: 'Sports', icon: Dumbbell, path: '/products?category=sports' },
  { name: 'Books', icon: Book, path: '/products?category=books' },
  { name: 'Beauty', icon: Sparkles, path: '/products?category=beauty' },
  { name: 'Toys', icon: Gamepad2, path: '/products?category=toys' },
  { name: 'Automotive', icon: Car, path: '/products?category=automotive' }
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="w-64 bg-white h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <List>
          <ListItem button component={Link} to="/" onClick={onClose}>
            <ListItemIcon>
              <Home className="h-5 w-5" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          
          <ListItem button component={Link} to="/products" onClick={onClose}>
            <ListItemIcon>
              <Package className="h-5 w-5" />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
          
          <Divider />
          
          {categories.map((category) => (
            <ListItem 
              key={category.name} 
              button 
              component={Link} 
              to={category.path} 
              onClick={onClose}
            >
              <ListItemIcon>
                <category.icon className="h-5 w-5" />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
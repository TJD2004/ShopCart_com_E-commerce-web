import React, { useState, useEffect } from 'react';
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

interface Category {
  name: string;
  iconName: string;
  path: string;
}

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Book,
  Sparkles,
  Gamepad2,
  Car,
  Monitor,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        setCategories([
          { name: 'Electronics', iconName: 'Smartphone', path: '/products?category=electronics' },
          { name: 'Clothing', iconName: 'Shirt', path: '/products?category=clothing' },
          { name: 'Home & Garden', iconName: 'Home', path: '/products?category=home' },
          { name: 'Sports', iconName: 'Dumbbell', path: '/products?category=sports' },
          { name: 'Books', iconName: 'Book', path: '/products?category=books' },
          { name: 'Beauty', iconName: 'Sparkles', path: '/products?category=beauty' },
          { name: 'Toys', iconName: 'Gamepad2', path: '/products?category=toys' },
          { name: 'Automotive', iconName: 'Car', path: '/products?category=automotive' },
        ]);
      }
    }

    fetchCategories();
  }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1301 }} // Make sure it's above the navbar
    >
      <div className="w-64 bg-white h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-600">
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

          {categories.map((category) => {
            const IconComponent = iconMap[category.iconName] || Package;
            return (
              <ListItem
                key={category.name}
                button
                component={Link}
                to={category.path}
                onClick={onClose}
              >
                <ListItemIcon>
                  <IconComponent className="h-5 w-5" />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;

import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg`}>
          <ShoppingBag className={`${size === 'lg' ? 'h-10 w-10' : size === 'md' ? 'h-6 w-6' : 'h-5 w-5'} text-white`} />
        </div>
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </div>
  );
};

export default Logo;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { FormControl, Select, MenuItem, Slider, Chip, Pagination } from '@mui/material';
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
  subcategory?: string;
  brand?: string;
  description?: string;
  stock: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [subcategory, setSubcategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'books', label: 'Books' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'automotive', label: 'Automotive' }
  ];

  const subcategories = {
    electronics: ['smartphones', 'laptops', 'tablets', 'audio', 'televisions', 'gaming', 'accessories'],
    clothing: ['shoes', 'jeans', 'shirts', 'outerwear', 'accessories'],
    home: ['kitchen', 'cleaning', 'lighting', 'smart-home', 'appliances'],
    sports: ['fitness', 'outdoor', 'equipment'],
    beauty: ['makeup', 'skincare', 'fragrance'],
    toys: ['building', 'board-games', 'educational'],
    automotive: ['accessories', 'electronics', 'maintenance']
  };

  const brands = [
    'Apple', 'Samsung', 'Google', 'Sony', 'Nike', 'Adidas', 'Dell', 'HP', 
    'LG', 'Bose', 'JBL', 'Fitbit', 'Levi\'s', 'Ray-Ban', 'Dyson', 'Instant Pot'
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'rating.average', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'rating.count', label: 'Most Reviewed' }
  ];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const pageParam = searchParams.get('page');
    
    if (categoryParam) setCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    if (pageParam) setCurrentPage(Number(pageParam));
    
    // Seed products if needed before fetching
    seedProductsIfNeeded().then(() => {
      fetchProducts();
    });
  }, [searchParams]);

  const seedProductsIfNeeded = async () => {
    try {
      const response = await axios.get('/api/products?limit=1');
      const products = response.data.products || response.data;
      
      if (!products || products.length === 0) {
        console.log('Seeding products...');
        await axios.post('/api/products/seed');
      }
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, subcategory, brand, sortBy, sortOrder, priceRange, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (category !== 'all') params.append('category', category);
      if (subcategory !== 'all') params.append('subcategory', subcategory);
      if (brand !== 'all') params.append('brand', brand);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      params.append('minPrice', priceRange[0].toString());
      params.append('maxPrice', priceRange[1].toString());
      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products || response.data);
      setPagination(response.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalProducts: response.data.products?.length || response.data?.length || 0,
        hasNext: false,
        hasPrev: false
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubcategory('all');
    setCurrentPage(1);
    updateSearchParams({ category: newCategory === 'all' ? null : newCategory, page: null });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    updateSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setCategory('all');
    setSubcategory('all');
    setBrand('all');
    setPriceRange([0, 2000]);
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (category !== 'all') count++;
    if (subcategory !== 'all') count++;
    if (brand !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 2000) count++;
    if (searchQuery) count++;
    return count;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             category !== 'all' ? categories.find(cat => cat.value === category)?.label : 'All Products'}
          </h1>
          <p className="text-gray-600 mt-1">
            {pagination.totalProducts} products found
            {getActiveFiltersCount() > 0 && ` with ${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} applied`}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden btn-primary flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-1">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </h3>
              <div className="flex items-center space-x-2">
                {getActiveFiltersCount() > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                )}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <FormControl fullWidth size="small">
                <Select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Subcategory Filter */}
            {category !== 'all' && subcategories[category as keyof typeof subcategories] && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Subcategory</label>
                <FormControl fullWidth size="small">
                  <Select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <MenuItem value="all">All Subcategories</MenuItem>
                    {subcategories[category as keyof typeof subcategories].map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        {sub.charAt(0).toUpperCase() + sub.slice(1).replace('-', ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Brand</label>
              <FormControl fullWidth size="small">
                <Select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <MenuItem value="all">All Brands</MenuItem>
                  {brands.map((brandName) => (
                    <MenuItem key={brandName} value={brandName}>
                      {brandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
                step={25}
                sx={{ color: 'primary.main' }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$2000+</span>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {category !== 'all' && (
                    <Chip 
                      label={categories.find(cat => cat.value === category)?.label}
                      onDelete={() => handleCategoryChange('all')}
                      color="primary"
                      size="small"
                    />
                  )}
                  {subcategory !== 'all' && (
                    <Chip 
                      label={subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('-', ' ')}
                      onDelete={() => setSubcategory('all')}
                      color="primary"
                      size="small"
                    />
                  )}
                  {brand !== 'all' && (
                    <Chip 
                      label={brand}
                      onDelete={() => setBrand('all')}
                      color="primary"
                      size="small"
                    />
                  )}
                  {searchQuery && (
                    <Chip 
                      label={`Search: ${searchQuery}`}
                      onDelete={() => {
                        setSearchQuery('');
                        updateSearchParams({ search: null });
                      }}
                      color="primary"
                      size="small"
                    />
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                    <Chip 
                      label={`$${priceRange[0]} - $${priceRange[1]}`}
                      onDelete={() => setPriceRange([0, 2000])}
                      color="primary"
                      size="small"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, pagination.totalProducts)} of {pagination.totalProducts} results
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                <FormControl size="small">
                  <Select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-');
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder as 'asc' | 'desc');
                    }}
                    displayEmpty
                  >
                    <MenuItem value="createdAt-desc">Newest First</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating.average-desc">Highest Rated</MenuItem>
                    <MenuItem value="rating.count-desc">Most Reviewed</MenuItem>
                    <MenuItem value="name-asc">Name: A to Z</MenuItem>
                    <MenuItem value="name-desc">Name: Z to A</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {[...Array(12)].map((_, index) => (
                <div key={index} className="card p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-300 h-4 rounded"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-6 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Package className="h-24 w-24 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button 
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {products.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <Pagination
                    count={pagination.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid as GridIcon, List as ListIcon, Filter as FilterIcon, X as XIcon } from 'lucide-react';
import { FormControl, Select, MenuItem, Slider, Chip, Pagination } from '@mui/material';
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

interface PaginationType {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [subcategory, setSubcategory] = useState('all');
  const [brand, setBrand] = useState(searchParams.get('brand') || 'all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1));

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'books', label: 'Books' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'automotive', label: 'Automotive' },
  ];

  const subcategories: Record<string, string[]> = {
    electronics: ['smartphones', 'laptops', 'tablets', 'audio', 'televisions', 'gaming', 'accessories'],
    clothing: ['shoes', 'jeans', 'shirts', 'outerwear', 'accessories'],
    home: ['kitchen', 'cleaning', 'lighting', 'smart-home', 'appliances'],
    sports: ['fitness', 'outdoor', 'equipment'],
    beauty: ['makeup', 'skincare', 'fragrance'],
    toys: ['building', 'board-games', 'educational'],
    automotive: ['accessories', 'electronics', 'maintenance'],
  };

  const brands = [
    'Apple','Samsung','Google','Sony','Nike','Adidas','Dell','HP',
    'LG','Bose','JBL','Fitbit','Levi\'s','Ray-Ban','Dyson','Instant Pot'
  ];

  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'rating.average-desc', label: 'Highest Rated' },
    { value: 'rating.count-desc', label: 'Most Reviewed' },
  ];

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    // Reset page if needed
    if (updates.page === null || updates.page === '1') {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubcategory('all');
    updateSearchParams({ category: newCategory === 'all' ? null : newCategory, page: '1' });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    updateSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setCategory('all');
    setSubcategory('all');
    setBrand('all');
    setSearchQuery('');
    setPriceRange([0, 2000]);
    setCurrentPage(1);
    setSortBy('createdAt');
    setSortOrder('desc');
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (category !== 'all') count++;
    if (subcategory !== 'all') count++;
    if (brand !== 'all') count++;
    if (searchQuery) count++;
    if (priceRange[0] > 0 || priceRange[1] < 2000) count++;
    return count;
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Construct params
      const params: Record<string, string | number> = {
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 12,
      };
      if (category !== 'all') params.category = category;
      if (subcategory !== 'all') params.subcategory = subcategory;
      if (brand !== 'all') params.brand = brand;
      if (searchQuery) params.search = searchQuery;
      if (priceRange[0] > 0) params.minPrice = priceRange[0];
      if (priceRange[1] < 2000) params.maxPrice = priceRange[1];

      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS, { params });
      const data = response.data;

      setProducts(data.products || []);
      if (data.pagination) {
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalProducts: data.pagination.totalProducts,
          hasNext: data.pagination.hasNext,
          hasPrev: data.pagination.hasPrev,
        });
      } else {
        // fallback
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalProducts: data.products?.length || 0,
          hasNext: false,
          hasPrev: false,
        });
      }
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
      setError(errorMessage);
      setProducts([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sync local state with URL params
    const cat = searchParams.get('category');
    const page = searchParams.get('page');
    const searchP = searchParams.get('search');
    const brandP = searchParams.get('brand');

    if (cat) setCategory(cat);
    if (page) setCurrentPage(Number(page));
    if (searchP) setSearchQuery(searchP);
    if (brandP) setBrand(brandP);

    fetchProducts();
  }, [searchParams, sortBy, sortOrder, priceRange]);

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to connect to backend</h2>
          <p className="text-gray-600 mb-4">Backend URL: {API_CONFIG.BASE_URL}</p>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Make sure your backend server is running and accessible at:</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{API_CONFIG.BASE_URL}/api/products</code>
          </div>
          <button onClick={fetchProducts} className="btn-primary">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {searchQuery
              ? `Search: "${searchQuery}"`
              : category !== 'all'
              ? categories.find(cat => cat.value === category)?.label
              : 'All Products'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {pagination.totalProducts} products found
            {getActiveFiltersCount() > 0 &&
              ` with ${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''}`}
          </p>
        </div>
        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden btn-primary flex items-center space-x-2 text-sm"
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-accent-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card p-4 sm:p-6 sticky top-20 sm:top-24 bg-white shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <FilterIcon className="h-5 w-5" />
                <span>Filters</span>
              </h3>
              <div className="flex items-center space-x-2">
                {getActiveFiltersCount() > 0 && (
                  <button onClick={clearFilters} className="text-xs sm:text-sm text-red-600 hover:text-red-700 flex items-center space-x-1">
                    <XIcon className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                )}
                <button onClick={() => setShowFilters(false)} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4 sm:mb-6">
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
            {category !== 'all' && subcategories[category] && (
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Subcategory</label>
                <FormControl fullWidth size="small">
                  <Select
                    value={subcategory}
                    onChange={(e) => {
                      setSubcategory(e.target.value);
                      updateSearchParams({ subcategory: e.target.value, page: '1' });
                    }}
                  >
                    <MenuItem value="all">All Subcategories</MenuItem>
                    {subcategories[category].map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {/* Brand Filter */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Brand</label>
              <FormControl fullWidth size="small">
                <Select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    updateSearchParams({ brand: e.target.value, page: '1' });
                  }}
                >
                  <MenuItem value="all">All Brands</MenuItem>
                  {brands.map((b) => (
                    <MenuItem key={b} value={b}>
                      {b}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                min={0}
                max={2000}
                step={25}
                onChange={(_, newValue) => {
                  setPriceRange(newValue as number[]);
                }}
                onChangeCommitted={(_, newValue) => {
                  updateSearchParams({
                    minPrice: (newValue as number[])[0].toString(),
                    maxPrice: (newValue as number[])[1].toString(),
                    page: '1',
                  });
                }}
                valueLabelDisplay="auto"
              />
            </div>

          </div>
        </div>

        {/* Products Area */}
        <div className="flex-1">
          {/* Toolbar: Sorting & ViewToggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-xs sm:text-sm text-gray-600">
                Showing {((currentPage - 1) * 12) + 1} - {Math.min(currentPage * 12, pagination.totalProducts)} of {pagination.totalProducts} results
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <FormControl size="small">
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = (e.target.value as string).split('-');
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder as 'asc' | 'desc');
                    updateSearchParams({ sortBy: newSortBy, sortOrder: newSortOrder, page: '1' });
                  }}
                >
                  {sortOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <GridIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          {loading ? (
            <div className={viewMode === 'grid' ? 'grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'space-y-4'}>
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="card p-4 animate-pulse">
                  <div className="bg-gray-300 h-32 sm:h-40 md:h-48 rounded-md mb-4"></div>
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No products found</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' ? 'grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'space-y-4'}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <Pagination
                    count={pagination.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
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
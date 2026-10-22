import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL', color: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'blazer', label: 'Áo Khoác & Blazer' },
    { id: 'shirt', label: 'Áo Sơ Mi & Lụa' },
    { id: 'trousers', label: 'Quần Âu & Dáng Rộng' },
    { id: 'dress', label: 'Đầm & Set Phối' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.fabric.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="san-pham" className="py-14 border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
              <span>Nội Dung 2</span>
              <span aria-hidden="true">·</span>
              <span>Danh Mục Tuyển Chọn</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
              Bộ Sưu Tập Thời Trang Đương Đại
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-stone-200 px-3 py-1.5 rounded-md text-xs text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <label htmlFor="sort-select" className="text-stone-500 hidden sm:inline">Sắp xếp:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none text-stone-900 font-medium cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs (Buttons/Segmented controls permitted by design guidelines) */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-3 mb-8 border-b border-stone-200 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-950 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-stone-500 whitespace-nowrap tabular-nums">
            {filteredProducts.length} sản phẩm
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-stone-200 rounded-lg">
            <SlidersHorizontal className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Không có sản phẩm nào khớp với từ khóa "{searchQuery}". Vui lòng thử từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-md hover:bg-stone-800 transition-colors"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

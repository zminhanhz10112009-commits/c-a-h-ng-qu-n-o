import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL', color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="group flex flex-col bg-white border border-stone-200/80 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Minimal text tag (Zero-pill discipline, quiet text) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Xoá khỏi yêu thích' : 'Thêm vào yêu thích'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all backdrop-blur-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 text-stone-700" />
          Xem Nhanh
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="uppercase tracking-wider text-[11px] font-medium">{product.categoryLabel}</span>
          <span className="font-mono tabular-nums text-stone-600">★ {product.rating.toFixed(1)} ({product.reviewsCount})</span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-medium text-stone-900 text-sm leading-snug hover:text-stone-700 cursor-pointer line-clamp-1 mb-2"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-serif font-bold text-base text-stone-950 tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Size Selection Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span>Size:</span>
            <span className="font-medium text-stone-800">{selectedSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`w-7 h-7 text-xs font-medium rounded border transition-colors ${
                  selectedSize === sz
                    ? 'border-stone-950 bg-stone-950 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[11px] text-stone-500 mr-1">Màu:</span>
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c.name);
              }}
              title={c.name}
              className={`w-4 h-4 rounded-full border transition-transform ${
                selectedColor === c.name ? 'ring-2 ring-stone-900 ring-offset-1 scale-110' : 'border-stone-300 hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[11px] text-stone-600 truncate ml-1">{selectedColor}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`mt-auto w-full py-2.5 px-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
            isAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.98]'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Đã Thêm Vào Giỏ
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-stone-300" />
              Thêm Vào Giỏ Hàng
            </>
          )}
        </button>
      </div>
    </div>
  );
};

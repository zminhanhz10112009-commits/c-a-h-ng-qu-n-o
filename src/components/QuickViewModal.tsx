import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Shield, Sparkles, Scissors } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL', color: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Đóng xem chi tiết"
          className="absolute top-4 right-4 z-10 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Media */}
          <div className="bg-stone-100 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[320px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-stone-900 text-stone-100 text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider font-semibold">{product.categoryLabel}</span>
                <span className="font-mono text-stone-700">★ {product.rating.toFixed(1)} ({product.reviewsCount} đánh giá)</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-serif font-bold text-stone-950 mb-3">{product.name}</h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif font-bold text-2xl text-stone-950 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed mb-5">{product.description}</p>

              {/* Material Specs */}
              <div className="p-3 bg-[#FAF8F5] rounded border border-stone-200/80 mb-5 space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-stone-700 shrink-0 mt-0.5" />
                  <span className="text-stone-700"><strong className="text-stone-900">Chất liệu:</strong> {product.fabric}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-stone-700 shrink-0 mt-0.5" />
                  <span className="text-stone-700"><strong className="text-stone-900">Xuất xứ:</strong> {product.origin}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-stone-700">Chọn kích cỡ:</span>
                  <span className="font-mono font-bold text-stone-900">{selectedSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-9 h-9 text-xs font-semibold rounded border transition-colors ${
                        selectedSize === sz
                          ? 'border-stone-950 bg-stone-950 text-white'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-stone-700">Màu sắc:</span>
                  <span className="text-stone-800">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-all ${
                        selectedColor === c.name
                          ? 'border-stone-900 bg-stone-100 font-semibold'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-md border transition-colors ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:bg-stone-50 text-stone-700'
                }`}
                title={isWishlisted ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-950 hover:bg-stone-800 text-white active:scale-[0.98]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã Thêm Vào Giỏ Hàng!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-stone-300" />
                    Thêm Vào Giỏ ({formatPrice(product.price * quantity)})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

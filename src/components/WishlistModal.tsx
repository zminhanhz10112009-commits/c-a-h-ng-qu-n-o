import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL', color: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 max-h-[85vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1 rounded-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
          <h3 className="font-serif font-bold text-lg text-stone-950">
            Danh Sách Yêu Thích Của Bạn ({wishlistedProducts.length})
          </h3>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-12 text-center text-stone-400">
            <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300 stroke-1" />
            <p className="text-sm font-medium text-stone-700">Chưa có sản phẩm nào trong danh sách</p>
            <p className="text-xs text-stone-500 mt-1">Bấm biểu tượng trái tim ở góc mỗi sản phẩm để lưu lại</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistedProducts.map((p) => (
              <div key={p.id} className="flex gap-4 p-3 bg-[#FAF8F5] border border-stone-200 rounded-lg items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded bg-stone-100"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{p.name}</h4>
                    <p className="font-serif font-bold text-xs text-stone-950 mt-1 tabular-nums">
                      {formatPrice(p.price)}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{p.fabric}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || '');
                      onRemoveFromWishlist(p.id);
                    }}
                    className="p-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1"
                    title="Thêm vào giỏ hàng"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Chọn mua</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Xoá khỏi yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-md transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

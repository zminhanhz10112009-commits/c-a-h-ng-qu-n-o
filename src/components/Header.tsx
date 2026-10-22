import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Truck, Check } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenTracking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  onOpenTracking,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('ATELIER10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Slim Top Announcement Banner (Dismissible, <= 40px) */}
      {showBanner && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="container mx-auto flex items-center justify-center gap-3 text-center">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-stone-400" />
              Miễn phí giao hàng toàn quốc từ 500.000₫
            </span>
            <span className="hidden sm:inline text-stone-500">·</span>
            <div className="hidden sm:flex items-center gap-1 text-stone-300">
              <span>Mã giảm 10% đơn đầu tiên:</span>
              <button
                onClick={handleCopyCode}
                className="font-mono text-white bg-stone-800 hover:bg-stone-700 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider transition-colors inline-flex items-center gap-1"
                title="Bấm để sao chép mã"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    Đã lưu
                  </>
                ) : (
                  'ATELIER10'
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Đóng thông báo"
            className="text-stone-400 hover:text-white p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar - Strict 3-zone contract */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-stone-950 uppercase whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            NOIR ATELIER
          </a>

          {/* Zone 2: 4-5 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-stone-600">
            <a
              href="#san-pham"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-stone-950"
            >
              Bộ Sưu Tập
            </a>
            <a
              href="#huong-dan-size"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-stone-950"
            >
              Chọn Size & Vải
            </a>
            <a
              href="#lookbook"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-stone-950"
            >
              Gợi Ý Phối Đồ
            </a>
            <a
              href="#danh-gia"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-stone-950"
            >
              Đánh Giá
            </a>
            <button
              onClick={onOpenTracking}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-stone-950"
            >
              Tra Cứu Đơn
            </button>
          </nav>

          {/* Zone 3: Primary Action & Shopping Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-md px-2.5 py-1 text-xs w-44 sm:w-56 shadow-sm">
                  <Search className="w-3.5 h-3.5 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm áo blazer, linen, quần âu..."
                    autoFocus
                    className="w-full bg-transparent focus:outline-none text-stone-800 placeholder:text-stone-400 text-xs"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-stone-400 hover:text-stone-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Tìm kiếm sản phẩm"
                  className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="Danh sách yêu thích"
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shadow-sm"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 text-stone-200" />
              <span className="hidden sm:inline">Giỏ Hàng</span>
              <span className="bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

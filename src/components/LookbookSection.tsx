import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, Layers } from 'lucide-react';
import { LOOKBOOK_IMAGE, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface LookbookSectionProps {
  onAddMultipleToCart: (items: { product: Product; size: 'XS' | 'S' | 'M' | 'L' | 'XL'; color: string; quantity: number }[]) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onAddMultipleToCart }) => {
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  // The 3 coordinated items in this curated editorial set
  const coatItem = PRODUCTS.find((p) => p.id === 'na-04') || PRODUCTS[0];
  const shirtItem = PRODUCTS.find((p) => p.id === 'na-02') || PRODUCTS[1];
  const trousersItem = PRODUCTS.find((p) => p.id === 'na-03') || PRODUCTS[2];

  const lookItems = [
    { product: coatItem, size: 'M' as const, color: 'Đen tuyền Midnight' },
    { product: shirtItem, size: 'M' as const, color: 'Xanh xô thơm (Sage)' },
    { product: trousersItem, size: 'M' as const, color: 'Xám than chì Charcoal' },
  ];

  const originalTotal = lookItems.reduce((acc, item) => acc + item.product.price, 0);
  const bundleDiscountPercent = 15;
  const bundleSavings = Math.round((originalTotal * bundleDiscountPercent) / 100);
  const discountedTotal = originalTotal - bundleSavings;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddBundle = () => {
    const bundlePayload = lookItems.map((item) => ({
      product: item.product,
      size: item.size,
      color: item.color,
      quantity: 1,
    }));
    onAddMultipleToCart(bundlePayload);
    setIsBundleAdded(true);
    setTimeout(() => setIsBundleAdded(false), 2000);
  };

  return (
    <section id="lookbook" className="py-14 border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
          <span>Nội Dung 4</span>
          <span aria-hidden="true">·</span>
          <span>Phối Đồ Độc Bản</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
              Gợi Ý Phối Đồ: The Modern Monochrome Look
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl">
              Set đồ được các stylist hàng đầu của Atelier lựa chọn, kết hợp hài hòa giữa áo khoác dáng dài thanh lịch, sơ mi lụa rủ mềm và quần âu xếp ly chuẩn phom.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Lookbook Visual Editorial */}
          <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200 min-h-[460px]">
            <img
              src={LOOKBOOK_IMAGE}
              alt="Gợi ý phối đồ trọn bộ Atelier"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-xs">
              Look #04 · Thu Đông 2026
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-md border border-stone-200 shadow-sm flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900">Phong cách: Minimal Chic Gallery</span>
              <span className="text-stone-500">Người mẫu cao 1m75 · Size M</span>
            </div>
          </div>

          {/* Breakdown & Bundle Purchase Card */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-lg border border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-stone-700" />
                  3 Món Trong Set Phối Này
                </span>
                <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  Ưu Đãi Combo -15%
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-4 mb-6">
                {lookItems.map((item, idx) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#FAF8F5] border border-stone-200/60">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-xs flex items-center justify-center font-mono shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">{item.product.name}</h4>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          <span>Màu: {item.color}</span>
                          <span className="mx-1">·</span>
                          <span>Size {item.size}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-xs text-stone-900 tabular-nums shrink-0">
                      {formatPrice(item.product.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bundle Pricing Calculation & CTA */}
            <div className="pt-5 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>Tổng giá trị riêng lẻ:</span>
                <span className="line-through tabular-nums">{formatPrice(originalTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-700 font-medium mb-2">
                <span>Tiết kiệm khi mua combo (15%):</span>
                <span className="tabular-nums">- {formatPrice(bundleSavings)}</span>
              </div>

              <div className="flex items-center justify-between text-base mb-5">
                <span className="font-serif font-bold text-stone-900">Giá trọn bộ 3 món:</span>
                <span className="font-serif font-bold text-xl text-stone-950 tabular-nums">
                  {formatPrice(discountedTotal)}
                </span>
              </div>

              <button
                onClick={handleAddBundle}
                className={`w-full py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isBundleAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-950 hover:bg-stone-800 text-white shadow-sm active:scale-[0.99]'
                }`}
              >
                {isBundleAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã Thêm Cả 3 Món Vào Giỏ Hàng!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-stone-300" />
                    Mua Trọn Set & Nhận Ưu Đãi 15%
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

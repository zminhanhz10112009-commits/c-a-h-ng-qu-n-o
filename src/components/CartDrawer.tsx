import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; percent: number } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 500000;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || appliedVoucher?.code === 'FREESHIP';
  const shippingFee = rawSubtotal > 0 && !isFreeShipping ? 35000 : 0;
  
  const discountAmount = appliedVoucher ? Math.round((rawSubtotal * appliedVoucher.percent) / 100) : 0;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    if (code === 'ATELIER10') {
      setAppliedVoucher({ code: 'ATELIER10', percent: 10 });
      setVoucherError('');
    } else if (code === 'FREESHIP') {
      setAppliedVoucher({ code: 'FREESHIP', percent: 0 });
      setVoucherError('');
    } else {
      setVoucherError('Mã không hợp lệ. Hãy thử: ATELIER10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-stone-900" />
            <h3 className="font-serif font-bold text-base text-stone-950">Giỏ Hàng Của Bạn</h3>
            <span className="text-xs text-stone-500 font-mono">({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-b border-stone-200">
          {rawSubtotal >= freeShippingThreshold ? (
            <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Đơn hàng của bạn được Miễn phí vận chuyển toàn quốc!
            </p>
          ) : (
            <div>
              <p className="text-xs text-stone-700">
                Mua thêm <span className="font-bold font-mono text-stone-900">{formatPrice(freeShippingThreshold - rawSubtotal)}</span> để được miễn phí giao hàng.
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-stone-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 stroke-1 text-stone-300" />
              <p className="text-sm font-medium text-stone-600">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-stone-400 mt-1">Hãy khám phá bộ sưu tập và chọn trang phục yêu thích</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3 pb-4 border-b border-stone-100"
              >
                {/* Thumb */}
                <div className="w-20 h-24 bg-stone-100 rounded overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                        title="Xoá món này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Màu: {item.selectedColor} · Size: {item.selectedSize}
                    </p>
                    <p className="font-serif font-bold text-xs text-stone-950 mt-1 tabular-nums">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-200 rounded">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                        className="p-1 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono font-medium text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                        className="p-1 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Totals Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF8F5]">
            {/* Voucher code input */}
            <form onSubmit={handleApplyVoucher} className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Mã giảm giá (ví dụ: ATELIER10)"
                    className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  Áp Dụng
                </button>
              </div>
              {appliedVoucher && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Đã áp dụng mã {appliedVoucher.code} ({appliedVoucher.percent > 0 ? `-${appliedVoucher.percent}%` : 'Miễn phí giao hàng'})
                </p>
              )}
              {voucherError && <p className="text-[11px] text-rose-600 mt-1">{voucherError}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs mb-4">
              <div className="flex justify-between text-stone-600">
                <span>Tạm tính:</span>
                <span className="font-mono text-stone-900 tabular-nums">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Giảm giá:</span>
                  <span className="font-mono tabular-nums">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển:</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">Miễn phí</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Tổng cộng:</span>
                <span className="font-serif text-lg tabular-nums">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedVoucher?.code || '')}
              className="w-full py-3 px-4 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

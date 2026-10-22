import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, Copy, Check, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem, OrderTrackingInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: (orderInfo: OrderTrackingInfo) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderSuccess,
}) => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hà Nội');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking' | 'card'>('cod');
  const [copiedBank, setCopiedBank] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<OrderTrackingInfo | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= 500000 || discountCode === 'FREESHIP';
  const shippingFee = rawSubtotal > 0 && !isFreeShipping ? 35000 : 0;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleCopyBank = () => {
    navigator.clipboard?.writeText('0988889999');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !phone.trim() || !address.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `NA-${randomSuffix}`;

    const newOrder: OrderTrackingInfo = {
      orderId: newOrderId,
      recipient: fullname,
      phone: phone,
      address: `${address}, ${city}`,
      status: 'Đã xác nhận',
      statusStep: 1,
      updatedAt: 'Vừa xong',
      estimatedDelivery: 'Giao trong 2-3 ngày tới',
      items: items.map((i) => ({
        name: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor,
        price: i.product.price,
        quantity: i.quantity,
      })),
      totalAmount: totalAmount,
      carrier: 'Atelier Express & Viettel Post',
      trackingCode: `VTP-${randomSuffix}`,
    };

    setOrderCompleted(newOrder);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 p-1 rounded-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderCompleted ? (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
              <ShieldCheck className="w-4 h-4 text-stone-800" />
              <span>Bảo Mật & Kiểm Hàng Tận Tay</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-6">
              Xác Nhận Đặt Hàng & Giao Nhận
            </h3>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  1. Thông Tin Nhận Hàng
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Số điện thoại nhận hàng *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-700 mb-1">Địa chỉ chi tiết (Số nhà, tên đường, phường/xã) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Số 25 ngõ 12 phố Trần Phú, Ba Đình"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Tỉnh / Thành phố *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Ghi chú giao hàng (tuỳ chọn)</label>
                  <input
                    type="text"
                    placeholder="Giao giờ hành chính, gọi trước khi đến..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. Hình Thức Thanh Toán
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-950 bg-stone-50 ring-1 ring-stone-950'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-stone-800" />
                      <span className="text-xs font-semibold text-stone-900">Thanh toán COD</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Nhận hàng, kiểm tra trang phục rồi mới trả tiền</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('banking')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'banking'
                        ? 'border-stone-950 bg-stone-50 ring-1 ring-stone-950'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <QrCode className="w-4 h-4 text-stone-800" />
                      <span className="text-xs font-semibold text-stone-900">VietQR Quét Mã</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Chuyển khoản nhanh 24/7 không phí</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-stone-950 bg-stone-50 ring-1 ring-stone-950'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-stone-800" />
                      <span className="text-xs font-semibold text-stone-900">Thẻ Visa / Master</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Cổng thanh toán thẻ nội địa và quốc tế</p>
                  </div>
                </div>

                {/* QR Banking Details preview if banking selected */}
                {paymentMethod === 'banking' && (
                  <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-lg flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-28 h-28 bg-white border border-stone-300 rounded p-1 flex items-center justify-center shrink-0">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-stone-800 mx-auto" />
                        <span className="text-[9px] font-mono font-bold block text-stone-600">VIETQR 24/7</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="font-semibold text-stone-900">Ngân hàng Quân Đội (MB Bank)</p>
                      <p className="text-stone-600">
                        Số tài khoản:{' '}
                        <span className="font-mono font-bold text-stone-950">0988889999</span>
                        <button
                          type="button"
                          onClick={handleCopyBank}
                          className="ml-2 text-stone-500 hover:text-stone-900 inline-flex items-center gap-0.5 text-[11px]"
                        >
                          {copiedBank ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copiedBank ? 'Đã chép' : 'Chép STK'}
                        </button>
                      </p>
                      <p className="text-stone-600">Chủ tài khoản: <span className="font-semibold">NOIR ATELIER VIETNAM</span></p>
                      <p className="text-[11px] text-stone-500 pt-1">
                        Hệ thống tự động kích hoạt đơn hàng ngay khi tiền vào tài khoản.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items Review Strip */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-stone-800">{items.length} món trong đơn hàng:</span>
                  <span className="font-mono text-stone-600 tabular-nums">Tạm tính: {formatPrice(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-700 font-medium mb-1">
                    <span>Mã ưu đãi ({discountCode}):</span>
                    <span className="font-mono tabular-nums">- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-stone-600 mb-2">
                  <span>Phí giao hàng:</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="font-serif text-lg tabular-nums">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Hoàn Tất Đặt Hàng ({formatPrice(totalAmount)})
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1">Đặt Hàng Thành Công</p>
            <h3 className="text-2xl font-serif font-bold text-stone-950 mb-2">Cảm Ơn Quý Khách Đã Lựa Chọn Atelier</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
              Đơn hàng của bạn đã được ghi nhận vào hệ thống. Chuyên viên may đo sẽ liên hệ qua số điện thoại <span className="font-semibold text-stone-900">{orderCompleted.phone}</span> để xác nhận số đo trước khi gửi hàng.
            </p>

            <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-lg max-w-md mx-auto text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-stone-950">{orderCompleted.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Người nhận:</span>
                <span className="font-medium text-stone-900">{orderCompleted.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Địa chỉ:</span>
                <span className="font-medium text-stone-900 text-right">{orderCompleted.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Phương thức:</span>
                <span className="font-medium text-stone-900">
                  {paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản ngân hàng'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold">
                <span className="text-stone-900">Tổng thanh toán:</span>
                <span className="font-serif text-sm text-stone-950 tabular-nums">{formatPrice(orderCompleted.totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

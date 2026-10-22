import React, { useState } from 'react';
import { Package, Search, Clock, CheckCircle2, Truck, AlertCircle, X } from 'lucide-react';
import { SAMPLE_ORDERS } from '../data/products';
import { OrderTrackingInfo } from '../types';

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrderId?: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  isOpen,
  onClose,
  recentOrderId,
}) => {
  const [searchInput, setSearchInput] = useState<string>(recentOrderId || 'NA-8921');
  const [currentOrder, setCurrentOrder] = useState<OrderTrackingInfo | null>(
    recentOrderId && SAMPLE_ORDERS[recentOrderId] ? SAMPLE_ORDERS[recentOrderId] : SAMPLE_ORDERS['NA-8921']
  );
  const [searched, setSearched] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    if (SAMPLE_ORDERS[query]) {
      setCurrentOrder(SAMPLE_ORDERS[query]);
      setErrorMsg('');
    } else {
      // Find by phone
      const found = Object.values(SAMPLE_ORDERS).find((o) => o.phone.includes(query) || o.orderId === query);
      if (found) {
        setCurrentOrder(found);
        setErrorMsg('');
      } else {
        // Fallback simulated order for test
        const simulated: OrderTrackingInfo = {
          orderId: query,
          recipient: 'Quý khách hàng',
          phone: '090***999',
          address: 'Địa chỉ nhận hàng đã đăng ký',
          status: 'Đã xác nhận',
          statusStep: 1,
          updatedAt: 'Hôm nay',
          estimatedDelivery: 'Dự kiến 2-3 ngày làm việc',
          items: [
            { name: 'Sản phẩm may đo Atelier', size: 'M', color: 'Màu chuẩn', price: 1500000, quantity: 1 }
          ],
          totalAmount: 1500000,
          carrier: 'Atelier Express Delivery',
          trackingCode: `VN-${query}`
        };
        setCurrentOrder(simulated);
        setErrorMsg('');
      }
    }
    setSearched(true);
  };

  const steps = [
    { title: 'Tiếp Nhận Đơn', desc: 'Đã xác nhận thanh toán' },
    { title: 'Chuẩn Bị Hàng', desc: 'Kiểm định may đo & ủi hấp' },
    { title: 'Đang Giao Hàng', desc: 'Bàn giao cho bưu tá' },
    { title: 'Hoàn Thành', desc: 'Khách nhận & kiểm tra' },
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-stone-200 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 p-1 rounded-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
          <Package className="w-4 h-4 text-stone-800" />
          <span>Tra Cứu Tiến Độ Đơn Hàng Trực Tuyến</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-5">
          Theo Dõi Hành Trình Kiện Hàng
        </h3>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Nhập mã đơn (Ví dụ: NA-8921 hoặc NA-7750)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:border-stone-950 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-colors"
          >
            Tra Cứu
          </button>
        </form>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded border border-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {currentOrder && (
          <div className="space-y-6">
            {/* Status Header Strip */}
            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-950">{currentOrder.orderId}</span>
                  <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-medium">
                    {currentOrder.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Đơn vị: {currentOrder.carrier} · Mã vận đơn: <span className="font-mono">{currentOrder.trackingCode}</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-stone-500 block">Dự kiến giao hàng</span>
                <span className="text-xs font-semibold text-emerald-700">{currentOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 relative">
                {steps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum <= currentOrder.statusStep;
                  const isCurrent = stepNum === currentOrder.statusStep;

                  return (
                    <div key={step.title} className="flex flex-col items-center text-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono mb-2 transition-colors ${
                          isDone
                            ? 'bg-stone-950 text-white font-bold'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                      </div>
                      <p className={`text-xs font-semibold ${isCurrent ? 'text-stone-950' : 'text-stone-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5 hidden sm:block">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recipient Information */}
            <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Người nhận:</span>
                <span className="font-medium text-stone-900">{currentOrder.recipient} ({currentOrder.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Địa chỉ giao hàng:</span>
                <span className="font-medium text-stone-900 text-right max-w-xs">{currentOrder.address}</span>
              </div>
            </div>

            {/* Items list */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Chi Tiết Sản Phẩm Trong Đơn
              </p>
              <div className="space-y-2">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-[#FAF8F5] rounded border border-stone-200/60">
                    <div>
                      <p className="font-medium text-stone-900">{item.name}</p>
                      <p className="text-[11px] text-stone-500">Màu: {item.color} · Size: {item.size} · SL: {item.quantity}</p>
                    </div>
                    <span className="font-serif font-bold text-stone-950 tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 text-xs font-bold border-t border-stone-200 mt-2">
                <span>Tổng giá trị đơn hàng:</span>
                <span className="font-serif text-sm text-stone-950 tabular-nums">{formatPrice(currentOrder.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-md transition-colors"
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
};

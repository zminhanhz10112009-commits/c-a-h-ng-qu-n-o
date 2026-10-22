import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking, onOpenSizeGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase block mb-3">
              NOIR ATELIER
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm mb-6">
              Thương hiệu thời trang may đo và thiết kế đương đại Việt Nam. Tôn vinh vẻ đẹp tối giản, chất liệu tự nhiên thượng hạng và sự chỉn chu trong từng đường kim mũi chỉ.
            </p>

            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Showroom 1: 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Showroom 2: 92 Đồng Khởi, Bến Nghé, Quận 1, TP. HCM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Hotline tư vấn may đo: 1900 8824 (8:30 - 21:30)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Mở cửa tất cả các ngày trong tuần</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Danh Mục</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#san-pham" className="hover:text-white transition-colors">Áo Blazer & Khoác</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Sơ Mi & Áo Lụa</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Quần Âu Xếp Ly</a></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Bộ Sưu Tập Lookbook</a></li>
              <li><a href="#huong-dan-size" className="hover:text-white transition-colors">Câu Chuyện Sợi Vải</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenTracking} className="hover:text-white transition-colors text-left">
                  Tra Cứu Tiến Độ Đơn
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors text-left">
                  Bảng Thông Số & Size
                </button>
              </li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Chính Sách Đổi Trả 30 Ngày</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Kiểm Tra Hàng (COD)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Bảo Hành Đường May Trọn Đời</span></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Đăng Ký Nhận Bản Tin Thời Trang</h4>
            <p className="text-xs text-stone-400 mb-4">
              Nhận voucher 10% cho đơn hàng đầu tiên cùng thông tin ra mắt bộ sưu tập giới hạn trước công chúng.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none focus:border-stone-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white hover:bg-stone-200 text-stone-950 text-xs font-bold rounded transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Đăng Ký</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Cảm ơn bạn! Mã ATELIER10 đã được lưu cho đơn hàng tiếp theo.
                </p>
              )}
            </form>

            <div className="mt-6 pt-4 border-t border-stone-900 flex items-center gap-3 text-stone-500 text-xs">
              <span className="text-[11px]">Chấp nhận thanh toán:</span>
              <span className="font-mono text-stone-400 font-medium">VietQR · COD · Visa · Napas</span>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© 2026 NOIR ATELIER. All rights reserved. Made in Vietnam.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Điều khoản dịch vụ</span>
            <span className="hover:text-stone-400 cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-stone-400 cursor-pointer">Hệ thống cửa hàng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

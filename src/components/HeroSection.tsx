import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw, Scissors } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSizeGuideClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onSizeGuideClick,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Campaign Message */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
              <span>Bộ Sưu Tập Mùa Hè 2026</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-semibold">Xu Hướng Tối Giản</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950 tracking-tight leading-[1.15] mb-5 text-balance">
              Sự Tinh Tế Của Những Đường Cắt & May Đo Chuẩn Mực
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Định hình phong cách thời trang đương đại với chất liệu Linen hữu cơ Bỉ, lụa Mulberry tự nhiên và len lông cừu thượng hạng. Từng phom dáng được nghiên cứu để tôn vinh sự thanh lịch, tự do và thoáng mát tối đa.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all transform active:scale-95"
              >
                Khám Phá Sản Phẩm
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSizeGuideClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors"
              >
                Hướng Dẫn Chọn Size
              </button>
            </div>

            {/* Campaign Metrics & Proof */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
              <div>
                <p className="font-serif text-2xl font-bold text-stone-950 tabular-nums">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Sợi dệt tự nhiên</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-950 tabular-nums">30 Ngày</p>
                <p className="text-xs text-stone-500 mt-0.5">Đổi trả tận nơi</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-950 tabular-nums">4.9 / 5.0</p>
                <p className="text-xs text-stone-500 mt-0.5">Hơn 2.400 đánh giá</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-full min-h-[420px] rounded-lg overflow-hidden bg-stone-100 shadow-sm border border-stone-200/60">
              <img
                src={HERO_IMAGE}
                alt="Bộ sưu tập thời trang may đo NOIR ATELIER"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white pointer-events-none">
                <p className="text-xs uppercase tracking-widest text-stone-200 font-medium">Chiến Dịch Lookbook 2026</p>
                <p className="text-sm sm:text-base font-serif font-medium mt-0.5 text-stone-100">
                  The Line Collection — May Đo Tối Giản Cho Phong Cách Sống Đô Thị
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Quality Guarantee Strip below hero */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Scissors className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">May Đo Tinh Xảo</h4>
              <p className="text-xs text-stone-500 mt-1">Đường chỉ may kép tiêu chuẩn xuất khẩu cao cấp</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Chất Liệu Tuyển Chọn</h4>
              <p className="text-xs text-stone-500 mt-1">Linen Bỉ, Lụa tơ tằm Bảo Lộc & Wool Ý</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Đổi Trả 30 Ngày</h4>
              <p className="text-xs text-stone-500 mt-1">Hỗ trợ đổi size tận nhà miễn phí trong 30 ngày</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Kiểm Tra Trước Khi Trả</h4>
              <p className="text-xs text-stone-500 mt-1">Thanh toán COD khi nhận hàng & ưng ý</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

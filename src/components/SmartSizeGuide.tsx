import React, { useState } from 'react';
import { Ruler, Sparkles, CheckCircle2, Info, Shirt } from 'lucide-react';

export const SmartSizeGuide: React.FC = () => {
  const [height, setHeight] = useState<number>(168);
  const [weight, setWeight] = useState<number>(62);
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [activeTab, setActiveTab] = useState<'calculator' | 'fabrics'>('calculator');

  // Recommendation logic
  const calculateSize = (): { size: string; note: string; chest: string; waist: string; hip: string } => {
    let base = 'M';
    if (weight < 52 && height < 162) {
      base = 'XS';
    } else if (weight < 59 && height < 168) {
      base = 'S';
    } else if (weight <= 68 && height <= 175) {
      base = 'M';
    } else if (weight <= 78 && height <= 180) {
      base = 'L';
    } else {
      base = 'XL';
    }

    if (fitPreference === 'relaxed' && base !== 'XL') {
      if (base === 'XS') base = 'S';
      else if (base === 'S') base = 'M';
      else if (base === 'M') base = 'L';
      else if (base === 'L') base = 'XL';
    }

    const sizeDetails: Record<string, { chest: string; waist: string; hip: string; note: string }> = {
      XS: { chest: '80 - 84 cm', waist: '62 - 66 cm', hip: '86 - 90 cm', note: 'Phù hợp người mảnh mai, cân đối' },
      S: { chest: '84 - 88 cm', waist: '66 - 70 cm', hip: '90 - 94 cm', note: 'Vừa vặn chuẩn người mẫu châu Á' },
      M: { chest: '88 - 94 cm', waist: '70 - 76 cm', hip: '94 - 100 cm', note: 'Size phổ biến nhất, linh hoạt phối đồ' },
      L: { chest: '94 - 100 cm', waist: '76 - 82 cm', hip: '100 - 106 cm', note: 'Thoải mái cho khung xương to hoặc thích mặc rũ' },
      XL: { chest: '100 - 108 cm', waist: '82 - 90 cm', hip: '106 - 114 cm', note: 'Rộng rãi tối đa, phong cách oversize tự nhiên' },
    };

    const info = sizeDetails[base] || sizeDetails['M'];
    return { size: base, ...info };
  };

  const recommendation = calculateSize();

  return (
    <section id="huong-dan-size" className="py-14 border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            <span>Nội Dung 3</span>
            <span aria-hidden="true">·</span>
            <span>May Đo Chuẩn Xác</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
            Công Cụ Gợi Ý Size & Câu Chuyện Chất Liệu
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Đừng lo lắng về việc chọn nhầm kích cỡ khi mua sắm trực tuyến. Hệ thống may đo thông minh của Atelier tự động tính toán kích cỡ tối ưu dựa trên chỉ số cơ thể thực tế của bạn.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'calculator'
                ? 'border-stone-950 text-stone-950'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Ruler className="w-4 h-4" />
            Tính Size Theo Chiều Cao & Cân Nặng
          </button>
          <button
            onClick={() => setActiveTab('fabrics')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'fabrics'
                ? 'border-stone-950 text-stone-950'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Shirt className="w-4 h-4" />
            Bảng Tiêu Chuẩn Chất Liệu Vải
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive sliders & fit preferences */}
            <div className="lg:col-span-7 bg-[#FAF8F5] p-6 rounded-lg border border-stone-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-5">
                Nhập Thông Số Cơ Thể Của Bạn
              </h3>

              {/* Height slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="font-medium text-stone-700">Chiều cao</span>
                  <span className="font-mono text-stone-950 font-bold text-sm tabular-nums">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="195"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
                  <span>150 cm</span>
                  <span>170 cm</span>
                  <span>195 cm</span>
                </div>
              </div>

              {/* Weight slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="font-medium text-stone-700">Cân nặng</span>
                  <span className="font-mono text-stone-950 font-bold text-sm tabular-nums">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
                  <span>40 kg</span>
                  <span>65 kg</span>
                  <span>95 kg</span>
                </div>
              </div>

              {/* Fit Preference */}
              <div className="mb-4">
                <span className="block text-xs font-medium text-stone-700 mb-2">Thói quen mặc đồ</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFitPreference('slim')}
                    className={`py-2 px-3 text-xs font-medium rounded border transition-colors ${
                      fitPreference === 'slim'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    Ôm gọn (Slim)
                  </button>
                  <button
                    onClick={() => setFitPreference('regular')}
                    className={`py-2 px-3 text-xs font-medium rounded border transition-colors ${
                      fitPreference === 'regular'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    Vừa vặn (Regular)
                  </button>
                  <button
                    onClick={() => setFitPreference('relaxed')}
                    className={`py-2 px-3 text-xs font-medium rounded border transition-colors ${
                      fitPreference === 'relaxed'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    Suông rộng (Relaxed)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-200">
                <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Nếu số đo nằm giữa hai size, chúng tôi khuyến nghị chọn size lớn hơn để có độ rủ tự nhiên.</span>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="lg:col-span-5 bg-stone-950 text-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">Gợi ý dành riêng cho bạn</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Độ chính xác 98%
                </span>
              </div>

              <div className="py-6 text-center">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Kích Cỡ Khuyên Dùng</p>
                <div className="font-serif text-6xl font-bold tracking-tight text-white mb-2">
                  SIZE {recommendation.size}
                </div>
                <p className="text-xs text-stone-300">{recommendation.note}</p>
              </div>

              {/* Measurements specs */}
              <div className="bg-stone-900 rounded p-4 mb-5 border border-stone-800">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-3">
                  Thông Số Tham Chiếu Chuẩn:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Vòng ngực (Bust/Chest):</span>
                    <span className="font-mono text-white font-medium tabular-nums">{recommendation.chest}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Vòng eo (Waist):</span>
                    <span className="font-mono text-white font-medium tabular-nums">{recommendation.waist}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Vòng mông (Hips):</span>
                    <span className="font-mono text-white font-medium tabular-nums">{recommendation.hip}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Miễn phí 100% chi phí đổi size tại nhà nếu mặc không vừa vặn.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Fabric Information & Care Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">Chất Liệu 01</span>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">100% Linen Tự Nhiên Bỉ</h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Sợi lanh hữu cơ dệt mật độ cao từ vùng Normandy và Bỉ. Thoáng khí gấp 3 lần cotton, càng giặt càng mềm và có độ nhăn tự nhiên quý phái.
              </p>
              <div className="text-[11px] text-stone-500 pt-3 border-t border-stone-200">
                <span className="font-semibold text-stone-800">Bảo quản:</span> Giặt tay hoặc giặt máy chế độ nhẹ, phơi trong bóng râm, ủi khi vải còn ẩm nhẹ.
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">Chất Liệu 02</span>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Lụa Tơ Tằm Bảo Lộc Cao Cấp</h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Dệt từ kén tơ tằm tự nhiên 100% tại thủ phủ lụa Lâm Đồng. Mát lịm vào mùa hè, giữ ấm thân nhiệt vào mùa thu đông, thân thiện tuyệt đối với da nhạy cảm.
              </p>
              <div className="text-[11px] text-stone-500 pt-3 border-t border-stone-200">
                <span className="font-semibold text-stone-800">Bảo quản:</span> Khuyến khích giặt khô hoặc dùng dầu gội dịu nhẹ, tránh vắt xoắn mạnh tay.
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">Chất Liệu 03</span>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Len Lông Cừu Merino & Cashmere</h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Sợi len siêu mảnh dưới 18 micron cho cảm giác mịn như nhung không gây châm chích. Khả năng chống nhăn tự nhiên và phục hồi phom dáng xuất sắc.
              </p>
              <div className="text-[11px] text-stone-500 pt-3 border-t border-stone-200">
                <span className="font-semibold text-stone-800">Bảo quản:</span> Sử dụng móc treo gỗ có đệm vai, dùng bàn là hơi nước đứng khi làm phẳng.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

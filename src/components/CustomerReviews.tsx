import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Send, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { Review } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newItem, setNewItem] = useState('Áo Blazer Linen Dáng Suông');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const initials = newAuthor
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const addedReview: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Việt Nam',
      rating: newRating,
      date: 'Vừa xong',
      itemPurchased: `${newItem} (Đã xác thực)`,
      comment: newComment.trim(),
      verified: true,
      avatarText: initials || 'KH',
    };

    setReviewsList([addedReview, ...reviewsList]);
    setNewAuthor('');
    setNewLocation('');
    setNewComment('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewForm(false);
    }, 2000);
  };

  return (
    <section id="danh-gia" className="py-14 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
          <span>Nội Dung 5</span>
          <span aria-hidden="true">·</span>
          <span>Phản Hồi & Trải Nghiệm Khách Hàng</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
              Đánh Giá Thực Tế Từ Khách Hàng
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Hơn 98.6% khách hàng hài lòng về chất liệu vải tự nhiên và độ vừa vặn khi nhận hàng.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 hover:border-stone-900 text-stone-900 text-xs font-semibold rounded-md transition-colors shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-stone-700" />
            {showReviewForm ? 'Đóng Biểu Mẫu' : 'Viết Đánh Giá Của Bạn'}
          </button>
        </div>

        {/* Submit Review Form (if expanded) */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 p-6 bg-white border border-stone-200 rounded-lg shadow-xs max-w-2xl mx-auto transition-all"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4">
              Chia Sẻ Trải Nghiệm Mua Sắm Của Bạn
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Mai Chi"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Tỉnh / Thành phố</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cầu Giấy, Hà Nội"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Sản phẩm đã mua</label>
                <select
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="Áo Blazer Linen Dáng Suông">Áo Blazer Linen Dáng Suông</option>
                  <option value="Áo Sơ Mi Lụa Tơ Tằm Cổ Điển">Áo Sơ Mi Lụa Tơ Tằm Cổ Điển</option>
                  <option value="Quần Âu Xếp Ly Ống Rộng">Quần Âu Xếp Ly Ống Rộng Len</option>
                  <option value="Áo Măng Tô Dạ Noir Elegance">Áo Măng Tô Dạ Noir Elegance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Mức độ hài lòng</label>
                <div className="flex items-center gap-1.5 pt-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-stone-600 ml-2">{newRating} / 5 sao</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-stone-700 mb-1">Nhận xét chi tiết *</label>
              <textarea
                required
                rows={3}
                placeholder="Cảm nhận của bạn về phom dáng, chất liệu vải, dịch vụ giao nhận..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="flex items-center justify-between">
              {submitSuccess ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Cảm ơn bạn! Đánh giá đã được đăng thành công.
                </span>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="px-5 py-2 bg-stone-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 transition-colors flex items-center gap-1.5 ml-auto"
              >
                <Send className="w-3.5 h-3.5" /> Gửi Đánh Giá
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-lg border border-stone-200/80 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-stone-400 font-mono text-[11px]">{rev.date}</span>
                </div>

                {/* Purchased product label */}
                <p className="text-[11px] text-stone-500 font-medium line-clamp-1 mb-2">
                  Đã mua: <span className="text-stone-700">{rev.itemPurchased}</span>
                </p>

                {/* Comment text */}
                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-stone-100">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {rev.avatarText}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-stone-900 truncate">{rev.author}</p>
                    {rev.verified && (
                      <span title="Khách hàng đã mua hàng">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-400 truncate">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Quotes & Media Mentions */}
        <div className="p-6 bg-white border border-stone-200 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-stone-800 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Cam Kết Độc Bản Của Atelier</h4>
              <p className="text-xs text-stone-500 mt-0.5">Mỗi sản phẩm đều được kiểm định khâu may thủ công và đóng dấu xác nhận trước khi giao.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-stone-400 font-serif italic text-sm">
            <span>ELLE Vietnam: "Định hình lại thời trang tối giản may đo"</span>
          </div>
        </div>
      </div>
    </section>
  );
};

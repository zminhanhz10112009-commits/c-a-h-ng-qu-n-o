import { Product, Review, OrderTrackingInfo } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_fashion_editorial_1792026380063.jpg';
export const LOOKBOOK_IMAGE = '/src/assets/images/lookbook_styling_outfit_1792026381718.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'na-01',
    name: 'Áo Blazer Linen Dáng Suông Tối Giản',
    category: 'blazer',
    categoryLabel: 'Áo Khoác & Blazer',
    price: 1850000,
    originalPrice: 2200000,
    image: '/src/assets/images/product_linen_blazer_1792026381204.jpg',
    tag: 'Bán chạy nhất',
    description: 'Áo khoác blazer may đo thủ công từ sợi linen tự nhiên nhập khẩu từ Bỉ. Cấu trúc vai mềm mại không đệm mút, phom suông phóng khoáng mang lại cảm giác thoáng mát tối đa trong khí hậu nhiệt đới nhưng vẫn chuẩn mực lịch thiệp.',
    fabric: '100% Linen hữu cơ tự nhiên Bỉ, lót tơ lụa thoáng khí',
    origin: 'May đo thủ công tại Atelier Hà Nội',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Be cát tự nhiên', hex: '#D8C7B5' },
      { name: 'Xanh Navy thẫm', hex: '#212A3E' },
      { name: 'Đen Noir', hex: '#1C1917' }
    ],
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: 'na-02',
    name: 'Áo Sơ Mi Lụa Tơ Tằm Cổ Điển',
    category: 'shirt',
    categoryLabel: 'Áo Sơ Mi & Lụa',
    price: 1350000,
    originalPrice: 1600000,
    image: '/src/assets/images/product_silk_shirt_1792026381278.jpg',
    tag: 'Mới về',
    description: 'Sơ mi lụa tơ tằm Mulberry dệt mật độ cao với bề mặt óng ả tự nhiên, mềm rũ và êm dịu trên da. Cổ áo ve nhọn tinh tế cùng cúc vỏ ốc tự nhiên cắt giác sắc nét.',
    fabric: '100% Lụa Mulberry cao cấp dệt thủ công Bảo Lộc',
    origin: 'Hoàn thiện thủ công tại Sài Gòn',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Xanh xô thơm (Sage)', hex: '#A3B19B' },
      { name: 'Trắng ngà Pearl', hex: '#F5F5F0' },
      { name: 'Nâu caramel', hex: '#9E6D4E' }
    ],
    rating: 5.0,
    reviewsCount: 94
  },
  {
    id: 'na-03',
    name: 'Quần Âu Xếp Ly Ống Rộng Len Lông Cừu',
    category: 'trousers',
    categoryLabel: 'Quần Âu & Dáng Rộng',
    price: 1550000,
    image: '/src/assets/images/product_wool_trousers_1792026383107.jpg',
    tag: 'Kinh điển',
    description: 'Quần âu may đo với đường xếp ly kép phía trước, cạp cao tôn dáng và ống suông rộng rủ tự nhiên. Sử dụng chất liệu vải len dệt mỏng 4 mùa có khả năng chống nhăn và co giãn tự nhiên.',
    fabric: '70% Wool Ý cao cấp, 28% Viscose tự nhiên, 2% Elastane',
    origin: 'May đo tiêu chuẩn Sartorial Atelier',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Xám than chì Charcoal', hex: '#3E424B' },
      { name: 'Đen Onyx', hex: '#1E1E1E' },
      { name: 'Nâu đất mờ Espresso', hex: '#4A3B32' }
    ],
    rating: 4.8,
    reviewsCount: 112
  },
  {
    id: 'na-04',
    name: 'Áo Măng Tô Dạ Dáng Dài Noir Elegance',
    category: 'blazer',
    categoryLabel: 'Áo Khoác & Blazer',
    price: 2890000,
    originalPrice: 3400000,
    image: '/src/assets/images/lookbook_styling_outfit_1792026381718.jpg',
    tag: 'Thiết kế độc quyền',
    description: 'Áo măng tô may đo dáng dài qua gối với kết cấu len cashmere pha wool dày dặn, đứng phom và giữ ấm hoàn hảo. Thiết kế cổ ve lớn phóng khoáng và đai thắt eo tôn dáng.',
    fabric: '60% Wool Cashmere mềm mịn, 40% Virgin Wool',
    origin: 'Phiên bản giới hạn Atelier 2026',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Đen tuyền Midnight', hex: '#111827' },
      { name: 'Nâu lạc đà Camel', hex: '#9A6B43' }
    ],
    rating: 4.9,
    reviewsCount: 65
  },
  {
    id: 'na-05',
    name: 'Đầm Lụa Hai Dây Satin Cắt Xéo Bias Cut',
    category: 'dress',
    categoryLabel: 'Đầm & Set Phối',
    price: 1680000,
    image: '/src/assets/images/product_silk_shirt_1792026381278.jpg',
    tag: 'Limited Run',
    description: 'Đầm hai dây kỹ thuật cắt xéo vải (bias-cut) ôm nhẹ nhàng theo đường cong cơ thể mà không bó thắt. Dây áo mảnh điều chỉnh được và đường viền cổ chữ V tinh tế.',
    fabric: '100% Silk Satin hữu cơ dệt mịn',
    origin: 'May đo thủ công tại Sài Gòn',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Đen bóng Obsidian', hex: '#0F172A' },
      { name: 'Xanh sage dịu nhẹ', hex: '#9FAF90' },
      { name: 'Hồng phấn Champagne', hex: '#D7B4A3' }
    ],
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'na-06',
    name: 'Áo Thun Dệt Kim Tay Ngắn Cotton Pima',
    category: 'shirt',
    categoryLabel: 'Áo Sơ Mi & Lụa',
    price: 650000,
    image: '/src/assets/images/product_linen_blazer_1792026381204.jpg',
    tag: 'Must-have',
    description: 'Chiếc áo thun hoàn hảo thường nhật từ sợi bông Pima Peru siêu dài. Độ bền màu gấp 3 lần cotton thông thường, giữ phom sau 100 lần giặt, thoáng mát và mềm mượt như lụa.',
    fabric: '100% Cotton Pima Peru chải kỹ hữu cơ',
    origin: 'Xưởng may tiêu chuẩn ISO 9001',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Trắng tinh khôi', hex: '#FAFAFA' },
      { name: 'Đen Charcoal', hex: '#262626' },
      { name: 'Xám melange', hex: '#9CA3AF' }
    ],
    rating: 4.8,
    reviewsCount: 204
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Nguyễn Thảo My',
    location: 'Quận 1, TP. Hồ Chí Minh',
    rating: 5,
    date: '12/10/2026',
    itemPurchased: 'Áo Blazer Linen Dáng Suông (Be cát / Size M)',
    comment: 'Chất vải linen rất đẹp, cầm đầm tay mà mặc lên cực kỳ thoáng mát. Mình mặc đi làm công sở lẫn đi cà phê cuối tuần đều rất lịch sự. Đường may tỉ mỉ, đóng hộp thơm nức mũi.',
    verified: true,
    avatarText: 'TM'
  },
  {
    id: 'rev-02',
    author: 'Trần Minh Quân',
    location: 'Ba Đình, Hà Nội',
    rating: 5,
    date: '08/10/2026',
    itemPurchased: 'Quần Âu Xếp Ly Ống Rộng (Xám than chì / Size L)',
    comment: 'Rất ưng phom quần! Độ rủ cực chuẩn, lưng cạp may đo ôm vừa vặn không bị thừa vải khi sơ vin. Giao hàng trong vòng 24h, nhân viên hỗ trợ đổi size cực kỳ nhiệt tình.',
    verified: true,
    avatarText: 'MQ'
  },
  {
    id: 'rev-03',
    author: 'Lê Thuỳ Dung',
    location: 'Hải Châu, Đà Nẵng',
    rating: 5,
    date: '03/10/2026',
    itemPurchased: 'Áo Sơ Mi Lụa Tơ Tằm Cổ Điển (Sage / Size S)',
    comment: 'Lụa tự nhiên mát lạnh, màu xanh xô thơm bên ngoài còn sang hơn trên hình. Cúc vỏ ốc rất sáng. Đáng từng đồng tiền!',
    verified: true,
    avatarText: 'TD'
  }
];

export const SAMPLE_ORDERS: Record<string, OrderTrackingInfo> = {
  'NA-8921': {
    orderId: 'NA-8921',
    recipient: 'Hoàng Phương Linh',
    phone: '0912***456',
    address: 'Toà nhà Landmark 81, P. 22, Q. Bình Thạnh, TP. HCM',
    status: 'Đang giao hàng',
    statusStep: 3,
    updatedAt: '14:20 Hôm nay',
    estimatedDelivery: 'Dự kiến hôm nay trước 18:00',
    items: [
      { name: 'Áo Blazer Linen Dáng Suông', size: 'M', color: 'Be cát tự nhiên', price: 1850000, quantity: 1 },
      { name: 'Quần Âu Xếp Ly Ống Rộng', size: 'M', color: 'Xám than chì', price: 1550000, quantity: 1 }
    ],
    totalAmount: 3400000,
    carrier: 'Giao Hàng Hoả Tốc Atelier Express',
    trackingCode: 'ATE-VN-984210'
  },
  'NA-7750': {
    orderId: 'NA-7750',
    recipient: 'Đặng Quốc Anh',
    phone: '0988***112',
    address: 'Phố Tràng Tiền, Q. Hoàn Kiếm, Hà Nội',
    status: 'Đã giao thành công',
    statusStep: 4,
    updatedAt: 'Hôm qua',
    estimatedDelivery: 'Đã hoàn tất',
    items: [
      { name: 'Áo Sơ Mi Lụa Tơ Tằm Cổ Điển', size: 'L', color: 'Trắng ngà', price: 1350000, quantity: 1 }
    ],
    totalAmount: 1350000,
    carrier: 'Viettel Post Chuyển Phát Nhanh',
    trackingCode: 'VTP-8874192'
  }
};

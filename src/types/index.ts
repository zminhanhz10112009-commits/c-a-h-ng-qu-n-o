export interface Product {
  id: string;
  name: string;
  category: 'blazer' | 'shirt' | 'trousers' | 'dress' | 'knitwear';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  tag?: string;
  description: string;
  fabric: string;
  origin: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  colors: {
    name: string;
    hex: string;
  }[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  itemPurchased: string;
  comment: string;
  verified: boolean;
  avatarText: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  price: number;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
}

export interface OrderTrackingInfo {
  orderId: string;
  recipient: string;
  phone: string;
  address: string;
  status: 'Đã xác nhận' | 'Đang đóng gói' | 'Đang giao hàng' | 'Đã giao thành công';
  statusStep: number; // 1 to 4
  updatedAt: string;
  estimatedDelivery: string;
  items: {
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  carrier: string;
  trackingCode: string;
}

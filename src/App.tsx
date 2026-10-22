import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { SmartSizeGuide } from './components/SmartSizeGuide';
import { LookbookSection } from './components/LookbookSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistModal } from './components/WishlistModal';
import { OrderTracking } from './components/OrderTracking';
import { PRODUCTS } from './data/products';
import { Product, CartItem, OrderTrackingInfo } from './types';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'M',
      selectedColor: 'Be cát tự nhiên',
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['na-02']);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Search & Checkout data
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutDiscountCode, setCheckoutDiscountCode] = useState('');
  const [recentPlacedOrderId, setRecentPlacedOrderId] = useState<string | undefined>(undefined);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL',
    selectedColor: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedSize, selectedColor, quantity }];
    });
  };

  const handleAddMultipleToCart = (
    newItems: { product: Product; size: 'XS' | 'S' | 'M' | 'L' | 'XL'; color: string; quantity: number }[]
  ) => {
    newItems.forEach((item) => {
      handleAddToCart(item.product, item.size, item.color, item.quantity);
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    size: string,
    color: string,
    delta: number
  ) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Proceed to checkout
  const handleProceedToCheckout = (discount: number, code: string) => {
    setCheckoutDiscount(discount);
    setCheckoutDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderInfo: OrderTrackingInfo) => {
    setRecentPlacedOrderId(orderInfo.orderId);
    setCartItems([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Top Bar Contract (Wordmark + 4 Nav links + Action) */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      <main className="flex-1">
        {/* Nội Dung 1: Chiến Dịch Editorial Mùa Mới */}
        <HeroSection
          onExploreClick={() => handleScrollToSection('san-pham')}
          onSizeGuideClick={() => handleScrollToSection('huong-dan-size')}
        />

        {/* Nội Dung 2: Danh Mục Sản Phẩm & Bộ Lọc Nâng Cao */}
        <ProductCatalog
          products={PRODUCTS}
          onQuickView={(p) => setActiveQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Nội Dung 3: Hướng Dẫn Chọn Size Thông Minh & Bí Quyết Chất Liệu */}
        <SmartSizeGuide />

        {/* Nội Dung 4: Gợi Ý Phối Đồ Lookbook Styling */}
        <LookbookSection onAddMultipleToCart={handleAddMultipleToCart} />

        {/* Nội Dung 5: Đánh Giá Khách Hàng Đã Xác Thực & Cam Kết Chất Lượng */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSizeGuide={() => handleScrollToSection('huong-dan-size')}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal with COD & VietQR */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        discountCode={checkoutDiscountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={activeQuickViewProduct ? wishlistIds.includes(activeQuickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={PRODUCTS}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Order Tracking Modal (Nội Dung 6) */}
      <OrderTracking
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrderId={recentPlacedOrderId}
      />
    </div>
  );
}

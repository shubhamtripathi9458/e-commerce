import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FiTrash2, 
  FiArrowLeft, 
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiTag,
  FiCreditCard,
  FiTruck,
  FiClock,
  FiChevronRight,
  FiMapPin
} from 'react-icons/fi';
import { MdDeliveryDining, MdOutlineLocalOffer } from 'react-icons/md';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil',
      price: 12.99,
      originalPrice: 15.99,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
      quantity: 2,
      isVeg: true,
      restaurant: 'Pizza Heaven'
    },
    {
      id: 2,
      name: 'Classic Cheeseburger',
      description: 'Beef patty, cheese, lettuce, tomato',
      price: 8.99,
      originalPrice: 10.99,
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
      quantity: 1,
      isVeg: false,
      restaurant: 'Burger King'
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake',
      price: 6.99,
      originalPrice: 8.99,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      quantity: 1,
      isVeg: true,
      restaurant: 'Sweet Treats'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('Home - Dadri, UP');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedPromo({ code: 'SAVE20', discount: 0.2 });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 50 ? 0 : 2.99;
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const total = subtotal + deliveryFee + tax - discount;

  // Group items by restaurant
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurant]) {
      acc[item.restaurant] = [];
    }
    acc[item.restaurant].push(item);
    return acc;
  }, {});

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <FiShoppingBag className="text-[#6B8CFF]" size={40} />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          
          <Link
            href="/"
            className="inline-block bg-[#6B8CFF] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5A7AE0] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 mt-4">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FiArrowLeft className="text-gray-700" size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
              <p className="text-xs text-gray-500">{cartItems.length} items • ${subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#6B8CFF]" size={16} />
              <span className="text-sm font-medium text-gray-700">Delivery Address</span>
            </div>
            <button className="text-xs text-[#6B8CFF] font-medium">Change</button>
          </div>
          <p className="text-sm text-gray-600">{selectedAddress}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <MdDeliveryDining className="text-green-500" size={14} />
            <span>Delivery in 25-30 min</span>
          </div>
        </div>
      </div>

      {/* Cart Items by Restaurant */}
      <div className="px-4 mt-4 space-y-4">
        {Object.entries(groupedItems).map(([restaurant, items]) => (
          <div key={restaurant} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm">{restaurant}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-3">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-1 right-1 w-2 h-2 rounded-full 
                        ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="text-gray-400 hover:text-red-500" size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-[#6B8CFF] text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#6B8CFF] transition-colors"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="w-7 text-center text-sm text-gray-700 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#6B8CFF] transition-colors"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <MdOutlineLocalOffer className="text-[#FF9F7A]" size={18} />
            <span className="text-sm font-medium text-gray-700">Apply Promo Code</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
                       text-sm text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:border-[#6B8CFF] focus:ring-1 focus:ring-[#6B8CFF]"
            />
            <button
              onClick={applyPromo}
              className="px-4 py-2 bg-[#6B8CFF] text-white rounded-lg text-sm font-medium
                       hover:bg-[#5A7AE0] transition-colors"
            >
              Apply
            </button>
          </div>
          {appliedPromo && (
            <div className="mt-2 flex items-center gap-1 text-green-600 text-xs">
              <FiTag size={12} />
              <span>Promo {appliedPromo.code} applied! 20% discount</span>
            </div>
          )}
        </div>
      </div>

      {/* Bill Details */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Bill Details</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600' : 'text-gray-800'}>
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="text-gray-800">${tax.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-[#6B8CFF]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Free delivery progress */}
          {subtotal < 50 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  Add ${(50 - subtotal).toFixed(2)} more for free delivery
                </span>
                <FiTruck className="text-[#6B8CFF]" size={14} />
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] rounded-full"
                  style={{ width: `${(subtotal / 50) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Button - Fixed with bottom nav offset */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <Link
            href="/checkout"
            className="flex items-center justify-between w-full bg-gradient-to-r 
                     from-[#6B8CFF] to-[#9F7AEA] text-white px-6 py-4 rounded-xl 
                     font-semibold hover:opacity-90 transition-all active:scale-[0.98] 
                     shadow-lg shadow-[#6B8CFF]/20"
          >
            <span>Proceed to Checkout</span>
            <div className="flex items-center gap-2">
              <span>${total.toFixed(2)}</span>
              <FiChevronRight size={18} />
            </div>
          </Link>

          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiCreditCard size={12} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiTruck size={12} />
              <span>Free Delivery on $50+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
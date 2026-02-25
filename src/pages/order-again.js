
import { useState } from 'react';
import Link from 'next/link';
import { FiRepeat, FiClock, FiStar, FiChevronRight } from 'react-icons/fi';
import { MdRestaurant, MdShoppingBasket } from 'react-icons/md';

export default function OrderAgainPage() {
  const [activeTab, setActiveTab] = useState('restaurants');

  const recentOrders = [
    {
      id: 1,
      restaurant: {
        name: 'Pizza Heaven',
        cuisine: 'Italian • Pizza',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop',
        deliveryTime: '25-35 min'
      },
      items: [
        { name: 'Margherita Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop' },
        { name: 'Pepperoni Pizza', price: 14.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop' }
      ],
      date: 'Yesterday',
      total: 27.98
    },
    {
      id: 2,
      restaurant: {
        name: 'Burger King',
        cuisine: 'American • Fast Food',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
        deliveryTime: '15-25 min'
      },
      items: [
        { name: 'Classic Cheeseburger', price: 8.99, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=100&h=100&fit=crop' }
      ],
      date: '2 days ago',
      total: 8.99
    },
    {
      id: 3,
      restaurant: {
        name: 'Sweet Treats',
        cuisine: 'Desserts • Bakery',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        deliveryTime: '15-20 min'
      },
      items: [
        { name: 'Chocolate Cake', price: 6.99, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop' },
        { name: 'Red Velvet', price: 7.99, image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=100&h=100&fit=crop' }
      ],
      date: '5 days ago',
      total: 14.98
    }
  ];

  const popularItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, orders: 234, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop' },
    { id: 2, name: 'Classic Cheeseburger', price: 8.99, orders: 189, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200&h=200&fit=crop' },
    { id: 3, name: 'California Roll', price: 10.99, orders: 156, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop' },
    { id: 4, name: 'Chocolate Cake', price: 6.99, orders: 312, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 mt-4">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">Order Again</h1>
          <p className="text-xs text-gray-500 mt-1">Quick reorder from your favorites</p>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeTab === 'restaurants' 
                  ? 'bg-[#6B8CFF] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <MdRestaurant className="inline mr-1" size={16} />
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeTab === 'items' 
                  ? 'bg-[#6B8CFF] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <MdShoppingBasket className="inline mr-1" size={16} />
              Popular Items
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === 'restaurants' ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Restaurant Header */}
                <div className="p-3 border-b border-gray-100">
                  <div className="flex gap-3">
                    <img
                      src={order.restaurant.image}
                      alt={order.restaurant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800">{order.restaurant.name}</h3>
                        <span className="text-xs text-gray-400">{order.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{order.restaurant.cuisine}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400" size={12} />
                          <span className="text-xs text-gray-600">{order.restaurant.rating}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{order.restaurant.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="p-3 bg-gray-50">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex-shrink-0 flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-6 h-6 rounded" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">{item.name}</p>
                          <p className="text-xs text-gray-500">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Total: ${order.total}</p>
                </div>

                {/* Action Buttons */}
                <div className="p-3 flex gap-2">
                  <button className="flex-1 py-2.5 bg-[#6B8CFF] text-white rounded-lg text-sm font-medium hover:bg-[#5A7AE0] transition-colors">
                    <FiRepeat className="inline mr-1" size={14} />
                    Order Again
                  </button>
                  <Link
                    href={`/restaurant/${order.id}`}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}

            <Link
              href="/orders"
              className="block text-center py-3 text-sm text-[#6B8CFF] font-medium"
            >
              View All Orders
              <FiChevronRight className="inline ml-1" size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Popular Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {popularItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {item.orders} orders
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#6B8CFF]">${item.price}</span>
                      <button className="bg-[#6B8CFF] text-white px-3 py-1.5 rounded-lg text-xs hover:bg-[#5A7AE0] transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended for You */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recommended for You</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"
                      alt="Food"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">New Restaurant Name</h4>
                      <p className="text-xs text-gray-500">Italian • American</p>
                    </div>
                    <button className="text-[#6B8CFF] text-xs font-medium">Explore</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
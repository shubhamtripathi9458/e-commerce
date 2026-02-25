

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiHeart, 
  FiClock, 
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiEdit2,
  FiStar
} from 'react-icons/fi';
import { MdDeliveryDining, MdOutlineLocalOffer } from 'react-icons/md';

export default function ProfileSheet({ open, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    name: 'Shubham Tripathi',
    email: 'shubham@example.com',
    phone: '+91 98765 43210',
    memberSince: 'Jan 2024',
    orders: 24,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  };

  const addresses = [
    { id: 1, type: 'Home', address: '123 Green Street, Dadri, UP', isDefault: true },
    { id: 2, type: 'Work', address: '456 Business Avenue, Sector 62, Noida', isDefault: false }
  ];

  const recentOrders = [
    { id: 1, restaurant: 'Pizza Heaven', items: 2, total: 25.98, date: 'Yesterday' },
    { id: 2, restaurant: 'Burger King', items: 1, total: 8.99, date: '2 days ago' }
  ];

  const menuItems = [
    { icon: FiHeart, label: 'Favorites', count: 12, href: '/favorites' },
    { icon: FiClock, label: 'Order History', href: '/orders' },
    { icon: FiCreditCard, label: 'Payment Methods', href: '/payment' },
    { icon: MdOutlineLocalOffer, label: 'Offers for You', count: 3, href: '/offers' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Handle */}
        <div className="pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative
              ${activeTab === 'profile' 
                ? 'text-[#6B8CFF]' 
                : 'text-gray-500'}`}
          >
            Profile
            {activeTab === 'profile' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8CFF]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative
              ${activeTab === 'orders' 
                ? 'text-[#6B8CFF]' 
                : 'text-gray-500'}`}
          >
            Orders
            {activeTab === 'orders' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8CFF]" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                  />
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6B8CFF] rounded-full flex items-center justify-center text-white shadow-md">
                    <FiEdit2 size={12} />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FiMail size={12} />
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FiPhone size={12} />
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-[#6B8CFF]/10 to-[#9F7AEA]/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#6B8CFF]">{user.orders}</div>
                  <div className="text-xs text-gray-600">Orders</div>
                </div>
                <div className="bg-gradient-to-br from-[#FF9F7A]/10 to-[#FF7A9F]/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#FF9F7A]">12</div>
                  <div className="text-xs text-gray-600">Favorites</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-500">₹0</div>
                  <div className="text-xs text-gray-600">Wallet</div>
                </div>
              </div>

              {/* Saved Addresses */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Saved Addresses</h3>
                  <button className="text-xs text-[#6B8CFF] font-medium">Add New</button>
                </div>
                <div className="space-y-2">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMapPin className={`mt-0.5 ${addr.type === 'Home' ? 'text-[#6B8CFF]' : 'text-[#FF9F7A]'}`} size={16} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">{addr.type}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-[#6B8CFF]/10 text-[#6B8CFF] px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">{addr.address}</p>
                      </div>
                      <button className="text-gray-400 hover:text-[#6B8CFF]">
                        <FiEdit2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-gray-500" size={18} />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.count && (
                          <span className="text-xs bg-[#6B8CFF] text-white px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                        <FiChevronRight className="text-gray-400" size={16} />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors mt-4">
                <FiLogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Recent Orders</h3>
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{order.restaurant}</h4>
                      <p className="text-xs text-gray-500">{order.items} items • ${order.total}</p>
                    </div>
                    <span className="text-xs text-gray-400">{order.date}</span>
                  </div>
                  <button className="w-full mt-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-[#6B8CFF] hover:bg-[#6B8CFF] hover:text-white transition-colors">
                    <FiClock className="inline mr-1" size={12} />
                    Order Again
                  </button>
                </div>
              ))}
              <Link
                href="/orders"
                className="block text-center text-sm text-[#6B8CFF] font-medium py-3"
              >
                View All Orders
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
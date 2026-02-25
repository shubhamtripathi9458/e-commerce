



import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch, FiHeart, FiBell } from 'react-icons/fi';
import { MdDeliveryDining } from 'react-icons/md';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B8CFF]/5 via-[#9F7AEA]/5 to-[#FF9F7A]/5" />
      
      <div className="relative px-4 pt-2 pb-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-4">
          {/* <div>
            <p className="text-xs text-[#8E8E9D]">Delivering to</p>
            <div className="flex items-center gap-1">
              <MdDeliveryDining className="text-[#6B8CFF]" size={16} />
              <h2 className="text-sm font-semibold text-[#f2f2f5]">Dadri, UP</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-[#000000] border border-[#2A2A35] flex items-center justify-center">
              <FiHeart size={16} className="text-[#f2f2f5]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#000000] border border-[#2A2A35] flex items-center justify-center relative">
              <FiBell size={16} className="text-[#f2f2f5]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6B6B] rounded-full animate-ping" />
            </button>
          </div> */}
        </div>

        {/* Main Banner */}
        <div className="relative mb-5 overflow-hidden rounded-2xl">
          <div className="relative h-44">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop"
              alt="Valentine's Special"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-[10px] text-[#FF9F7A] mb-1 font-semibold tracking-wider">
                GOURMET LOVE AT
              </p>
              <h1 className="text-2xl font-bold text-white mb-1">
                Celebrate<br />love at
              </h1>
              <p className="text-xs text-gray-200 mb-2 max-w-[200px]">
                Treat your special moments to our exclusive Valentine's menu.
              </p>
              <button className="bg-[#6B8CFF] text-white px-5 py-1.5 rounded-full text-xs font-semibold">
                Explore Menu
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search dishes, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#000000] border border-[#2A2A35] rounded-xl 
                       text-sm text-[#f2f2f5] placeholder-[#6B6B7B] focus:outline-none focus:border-[#6B8CFF]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B7B]" size={16} />
          </div> */}
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {['All', 'Nearby', 'Popular', 'New', 'Valentine', 'Special'].map((filter) => (
            <button
              key={filter}
              className="flex-shrink-0 px-4 py-2 bg-[#000000] border border-[#2A2A35] rounded-full 
                       text-xs font-medium text-[#f2f2f5] whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
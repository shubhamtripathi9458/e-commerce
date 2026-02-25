
import { useState } from 'react';
import Link from 'next/link';
import RestaurantCard from '../restaurant/RestaurantCard';
import { restaurants } from '../../data/restaurants';
import { FiChevronRight, FiClock, FiMapPin, FiStar } from 'react-icons/fi';

const FeaturedRestaurants = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'nearby', label: 'Nearby', icon: '📍' },
    { id: 'popular', label: 'Popular', icon: '🔥' },
    { id: 'new', label: 'New', icon: '✨' },
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filter === 'all') return true;
    if (filter === 'popular') return restaurant.rating >= 4.5;
    if (filter === 'nearby') return parseFloat(restaurant.distance) < 1.5;
    return true;
  });

  const handleViewMenu = (e, restaurantId) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle view menu logic or just let the link navigate
    console.log('Viewing menu for:', restaurantId);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Restaurants</h2>
            <p className="text-sm text-gray-500 mt-1">Discover the best places near you</p>
          </div>
          <Link 
            href="/restaurants" 
            className="flex items-center gap-1 text-sm font-medium text-[#6B8CFF] hover:text-[#5A7AE0] 
                     transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200
                     mt-2 md:mt-0"
          >
            View all restaurants
            <FiChevronRight size={16} />
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-6">
          <div className="flex gap-2 pb-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full whitespace-nowrap transition-all
                  ${filter === f.id 
                    ? 'bg-[#6B8CFF] text-white shadow-lg shadow-[#6B8CFF]/30' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                <span className="mr-1">{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.slice(0, 6).map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurant/${restaurant.id}`}
              className="group block"
            >
              <div
                onMouseEnter={() => setHoveredId(restaurant.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                         cursor-pointer h-full flex flex-col"
              >
                {/* Restaurant Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {restaurant.discount && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 
                                  text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {restaurant.discount}
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm 
                                px-2 py-1.5 rounded-full text-xs font-medium flex items-center gap-1
                                shadow-md">
                    <FiStar className="text-yellow-400 fill-yellow-400" size={12} />
                    <span className="text-gray-700">{restaurant.rating}</span>
                  </div>

                  {/* Open Status */}
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm 
                                  flex items-center justify-center">
                      <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                        Currently Closed
                      </span>
                    </div>
                  )}
                </div>

                {/* Restaurant Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-[#6B8CFF] transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>

                  {/* Details */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FiClock className="text-[#6B8CFF]" size={12} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-[#6B8CFF]" size={12} />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  {/* Min Order and Action */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-400">
                      Min. ${restaurant.minOrder}
                    </span>
                    <button 
                      onClick={(e) => handleViewMenu(e, restaurant.id)}
                      className="bg-[#6B8CFF] text-white px-4 py-2 rounded-lg text-xs 
                               font-medium hover:bg-[#5A7AE0] transition-all active:scale-95
                               shadow-md"
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;


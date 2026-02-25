import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiMapPin, FiClock, FiStar, FiShare2, FiHeart } from 'react-icons/fi';
import { restaurants } from '../../data/restaurants';
import { products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('menu');

  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const restaurantProducts = products.filter(p => p.restaurantId === parseInt(id));

  if (!restaurant) {
    return (
      <div className="mobile-container py-8">
        <p>Restaurant not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'info', label: 'Info' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="pb-12">
      {/* Restaurant Header Image */}
      <div className="relative h-64">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white p-3 rounded-full shadow-lg text-gray-700 hover:bg-gray-200 transition">
            <FiShare2 size={20} />
          </button>
          <button className="bg-white p-3 rounded-full shadow-lg text-gray-700 hover:bg-gray-200 transition">
            <FiHeart size={20} />
          </button>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-gray-200 mb-2">{restaurant.cuisine}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-1" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b sticky top-16 bg-white z-40">
        <div className="mobile-container">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 font-semibold border-b-2 transition-colors
                  ${activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mobile-container py-6">
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Search in Menu */}
            {/* <input
              type="text"
              placeholder="Search in menu..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
            /> */}

            {/* Menu Categories */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-black">Popular Items</h2>
                <div className="space-y-3">
                  {restaurantProducts.filter(p => p.popular).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 text-black">All Items</h2>
                <div className="space-y-3">
                  {restaurantProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="card p-4">
              <h3 className="font-bold mb-3">Restaurant Info</h3>
              <p className="text-gray-600 mb-4">
                {restaurant.description || 'No description available.'}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cuisine:</span>
                  <span className="font-medium">{restaurant.cuisine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Time:</span>
                  <span className="font-medium">{restaurant.deliveryTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min. Order:</span>
                  <span className="font-medium">${restaurant.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Distance:</span>
                  <span className="font-medium">{restaurant.distance}</span>
                </div>
              </div>
            </div>

            <div className="card p-4">
              <h3 className="font-bold mb-3">Location</h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                Map View
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="card p-4">
              <h3 className="font-bold mb-4">Customer Reviews</h3>
              {/* Sample Reviews */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b last:border-0 py-3">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Great food and quick delivery! Will order again.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}


import Link from 'next/link';
import { products } from '../../data/products';
import { FiChevronRight, FiStar, FiClock } from 'react-icons/fi';

const TopPicks = () => {
  const topPicks = products.filter(p => p.popular).slice(0, 8);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle add to cart logic here
    console.log('Adding to cart:', productId);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Top Picks For You</h2>
            <p className="text-sm text-gray-500 mt-1">Most loved dishes by our customers</p>
          </div>
          <Link 
            href="/trending" 
            className="flex items-center gap-1 text-sm font-medium text-[#6B8CFF] hover:text-[#5A7AE0] 
                     transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
          >
            View all
            <FiChevronRight size={16} />
          </Link>
        </div>
        
        {/* Grid Layout for Top Picks */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topPicks.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 
                           hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                           cursor-pointer h-full flex flex-col">
                {/* Product Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Veg/Non-veg Indicator */}
                  <div className={`absolute top-3 left-3 w-5 h-5 rounded-full border-2 border-white shadow-md
                    ${product.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm 
                                px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                                shadow-md">
                    <FiStar className="text-yellow-400 fill-yellow-400" size={10} />
                    <span className="text-gray-700">{product.rating}</span>
                  </div>

                  {/* Popular Tag */}
                  {product.popular && (
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white 
                                  text-[10px] px-2 py-1 rounded-full shadow-md">
                      🔥 Popular
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-[#6B8CFF] transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  {/* Delivery Time */}
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
                    <FiClock size={10} />
                    <span>20-25 min</span>
                  </div>

                  {/* Price and Add Button */}
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <span className="font-bold text-[#6B8CFF] text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-1 text-xs text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product.id)}
                      className="bg-[#6B8CFF] text-white px-4 py-1.5 rounded-lg text-xs 
                               font-medium hover:bg-[#5A7AE0] transition-all active:scale-95
                               shadow-md"
                    >
                      Add
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

export default TopPicks;

import Link from 'next/link';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import { MdDeliveryDining } from 'react-icons/md';

const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    name,
    cuisine,
    rating,
    deliveryTime,
    image,
    distance,
    discount,
    isOpen
  } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 
                    hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 
                          text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {discount}
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm 
                        px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                        shadow-md">
            <FiStar className="text-yellow-400 fill-yellow-400" size={10} />
            <span className="text-gray-700">{rating}</span>
          </div>

          {/* Open/Closed Status */}
          {!isOpen && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm 
                          flex items-center justify-center">
              <span className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium">
                Closed
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{name}</h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{cuisine}</p>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <MdDeliveryDining size={12} className="text-[#6B8CFF]" />
                <span>{deliveryTime}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1 text-gray-500">
                <FiMapPin size={12} className="text-[#6B8CFF]" />
                <span>{distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
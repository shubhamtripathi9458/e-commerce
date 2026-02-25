import { useState } from 'react';
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, onOpenProduct, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const { name, description, price, originalPrice, image, isVeg } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setQuantity(1);
    onAddToCart?.({ ...product, quantity: 1 });
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart?.({ ...product, quantity: newQty });
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    const newQty = quantity - 1;
    setQuantity(Math.max(0, newQty));
    onAddToCart?.({ ...product, quantity: Math.max(0, newQty) });
  };

  return (
    <div
      onClick={() => onOpenProduct?.(product)}
      className="block group cursor-pointer"
    >
      <div className="bg-[#14141C] rounded-xl overflow-hidden border border-[#2A2A35] 
                      hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex p-3">
          
          {/* Image */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white 
              ${isVeg ? 'bg-green-500' : 'bg-red-500'}`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 ml-3">
            <h3 className="font-semibold text-sm text-[#f2f2f5] mb-1 line-clamp-1">
              {name}
            </h3>
            <p className="text-xs text-[#8E8E9D] mb-2 line-clamp-2">{description}</p>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#6B8CFF] text-sm">${price}</span>
                {originalPrice && (
                  <span className="ml-2 text-xs text-[#6B6B7B] line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>

              {/* Controls */}
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-[#6B8CFF] text-white p-1.5 rounded-lg"
                >
                  <FiShoppingCart size={14} />
                </button>
              ) : (
                <div className="flex items-center bg-[#1A1A23] rounded-lg">
                  <button onClick={handleDecrement} className="w-6 h-6 flex items-center justify-center">
                    <FiMinus size={10} />
                  </button>
                  <span className="w-6 text-center text-xs text-white">{quantity}</span>
                  <button onClick={handleIncrement} className="w-6 h-6 flex items-center justify-center">
                    <FiPlus size={10} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  FiMapPin,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { MdDeliveryDining } from "react-icons/md";

const placeholders = [
  'Search "pizza"',
  'Search "burgers"',
  'Search "sushi"',
  'Search "groceries"',
];

export default function Header({ onProfileClick, onLocationClick, selectedLocation }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);

  // Animated Placeholder Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false);
      }, 200);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchFocus = () => {
    setAnimate(false);
  };

  const displayLocation = selectedLocation?.address || "Dadri, UP";
  const deliveryTime = "8-10 mins";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#000000]/95 backdrop-blur-xl border-b border-[#2A2A35] py-2' 
        : 'bg-[#000000] py-3'
    }`}>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center gap-6 max-w-7xl mx-auto px-6">

        {/* Brand + Location */}
        <div className="flex items-center gap-6">
          {/* Brand with gradient */}
          {/* <div className="text-2xl font-bold whitespace-nowrap group">
            <span className="bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] bg-clip-text text-transparent">
              Foodie
            </span>
            <span className="bg-gradient-to-r from-[#FF9F7A] to-[#FF7A9F] bg-clip-text text-transparent">
              Express
            </span>
          </div> */}


          <Link href="/" className="group">
  <div className="text-2xl font-bold whitespace-nowrap cursor-pointer select-none">
    <span className="bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] bg-clip-text text-transparent">
      Foodie
    </span>
    <span className="bg-gradient-to-r from-[#FF9F7A] to-[#FF7A9F] bg-clip-text text-transparent">
      Express
    </span>
  </div>
</Link>

          {/* Location with dropdown animation */}
          <button
            onClick={onLocationClick}
            className="flex items-center gap-2 hover:bg-[#000000] px-3 py-2 rounded-xl transition-all group relative border border-transparent hover:border-[#2A2A35]"
          >
            <div className="relative">
              <FiMapPin className="text-[#6B8CFF] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#6B8CFF] rounded-full animate-ping" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs text-[#8E8E9D] flex items-center gap-1">
                <MdDeliveryDining className="inline" />
                Delivery in {deliveryTime}
              </p>
              <p className="text-sm font-semibold text-[#f2f2f5] flex items-center gap-1">
                {displayLocation}
                <FiChevronDown className={`text-[#6B6B7B] group-hover:translate-y-0.5 transition-transform`} />
              </p>
            </div>
          </button>
        </div>

        {/* Fixed Search - Now Inputable */}
        <div className="flex-1">
          <div className="flex items-center bg-[#000000] rounded-xl px-4 h-12 border border-[#2A2A35] focus-within:border-[#6B8CFF] focus-within:ring-1 focus-within:ring-[#6B8CFF] transition-all">
            <FiSearch className="text-[#6B6B7B] mr-3 flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleSearchFocus}
              placeholder={placeholders[index]}
              className="w-full bg-transparent text-[#f2f2f5] placeholder-[#6B6B7B] focus:outline-none"
            />
          </div>
        </div>

        {/* Actions with animations */}
        <div className="flex items-center gap-3">
          {/* <button className="icon-btn relative">
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6B8CFF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                {cartCount}
              </span>
            )}
          </button> */}


          <Link href="/cart" className="relative">
  <button className="icon-btn relative">
    <FiShoppingCart size={20} />
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] 
                     text-white text-xs rounded-full w-5 h-5 flex items-center justify-center 
                     animate-bounce-in shadow-lg">
        {cartCount}
      </span>
    )}
  </button>
</Link>

          <button 
            onClick={onProfileClick}
            className="icon-btn hover:rotate-12"
          >
            <FiUser size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE - Fixed for app-like experience */}
      <div className="md:hidden px-4">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={onLocationClick}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <FiMapPin className="text-[#6B8CFF] group-hover:scale-110 transition-transform" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#6B8CFF] rounded-full animate-ping" />
            </div>
            <div className="leading-tight text-left">
              <p className="text-xs text-[#8E8E9D] flex items-center gap-1">
                <MdDeliveryDining className="inline" size={12} />
                {deliveryTime}
              </p>
              <p className="text-sm font-semibold text-[#f2f2f5] flex items-center gap-1">
                {displayLocation.split(',')[0]}
                <FiChevronDown size={14} className="text-[#6B6B7B] group-hover:translate-y-0.5 transition-transform" />
              </p>
            </div>
          </button>

          <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
            <button className="relative hover:scale-110 transition-transform">
              <FiShoppingCart size={22} className="text-[#f2f2f5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6B8CFF] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce-in">
                  {cartCount}
                </span>
              )}
            </button>
            </Link>
            <button 
              onClick={onProfileClick}
              className="hover:scale-110 hover:rotate-12 transition-all"
            >
              <FiUser size={22} className="text-[#f2f2f5]" />
            </button>
          </div>
        </div>

        {/* Fixed Mobile Search - Now Inputable */}
        <div className="flex items-center bg-[#000000] rounded-full px-4 h-11 border border-[#2A2A35] focus-within:border-[#6B8CFF] focus-within:ring-1 focus-within:ring-[#6B8CFF] transition-all">
          <FiSearch className="text-[#6B6B7B] mr-2 flex-shrink-0" size={18} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleSearchFocus}
            placeholder={placeholders[index]}
            className="w-full bg-transparent text-[#f2f2f5] placeholder-[#6B6B7B] focus:outline-none text-sm"
          />
        </div>
      </div>
    </header>
  );
}
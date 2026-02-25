

import { useState, useEffect } from "react";
import { FiMapPin, FiX, FiSearch, FiHome, FiBriefcase } from "react-icons/fi";
import { MdMyLocation } from "react-icons/md";

const LocationSelector = ({ onLocationSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const savedLocations = [
    {
      id: 1,
      name: "Home",
      address: "123 Green Street, Dadri",
      type: "home",
      icon: FiHome
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Avenue, Sector 62",
      type: "work",
      icon: FiBriefcase
    }
  ];

  const recentLocations = [
    {
      id: 3,
      name: "Dadri Market",
      address: "Main Market, Dadri",
      type: "recent"
    },
    {
      id: 4,
      name: "City Mall",
      address: "Sector 50, Noida",
      type: "recent"
    }
  ];

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    handleClose();
  };

  const getCurrentLocation = () => {
    // Simulate getting location
    const currentLocation = {
      id: "current",
      name: "Current Location",
      address: "Using GPS location",
      type: "current"
    };
    handleLocationSelect(currentLocation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        className={`relative bg-[#14141C] w-full md:w-[480px] md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden transition-all duration-500 ease-out border-t md:border border-[#2A2A35] ${
          isOpen 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full md:translate-y-8 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#14141C] border-b border-[#2A2A35] p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[#f2f2f5]">Choose Location</h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-[#000000] rounded-full transition-colors"
            >
              <FiX size={20} className="text-[#8E8E9D]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B7B]" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#000000] border border-[#2A2A35] rounded-xl focus:outline-none focus:border-[#6B8CFF] focus:ring-1 focus:ring-[#6B8CFF] text-[#f2f2f5] placeholder-[#6B6B7B]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 space-y-6 max-h-[calc(90vh-120px)]">
          
          {/* Current Location Button */}
          <button
            onClick={getCurrentLocation}
            className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <MdMyLocation size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold">Use Current Location</p>
                <p className="text-sm text-white/80">Get accurate delivery time</p>
              </div>
            </div>
          </button>

          {/* Saved Locations */}
          <div>
            <h3 className="text-sm font-semibold text-[#8E8E9D] mb-3">SAVED LOCATIONS</h3>
            <div className="space-y-2">
              {savedLocations.map((location) => {
                const Icon = location.icon;
                return (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#000000] transition-all group border border-transparent hover:border-[#2A2A35]"
                  >
                    <div className={`p-2 rounded-lg ${
                      location.type === 'home' 
                        ? 'bg-[#6B8CFF]/20 text-[#6B8CFF]' 
                        : 'bg-[#9F7AEA]/20 text-[#9F7AEA]'
                    } group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[#f2f2f5]">{location.name}</p>
                      <p className="text-sm text-[#8E8E9D]">{location.address}</p>
                    </div>
                    <FiMapPin className="text-[#6B6B7B] group-hover:text-[#6B8CFF] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Locations */}
          <div>
            <h3 className="text-sm font-semibold text-[#8E8E9D] mb-3">RECENT LOCATIONS</h3>
            <div className="space-y-2">
              {recentLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#000000] transition-all group border border-transparent hover:border-[#2A2A35]"
                >
                  <div className="p-2 rounded-lg bg-[#000000] text-[#6B6B7B] group-hover:scale-110 transition-transform border border-[#2A2A35]">
                    <FiMapPin size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-[#f2f2f5]">{location.name}</p>
                    <p className="text-sm text-[#8E8E9D]">{location.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add New Address */}
          <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#2A2A35] rounded-xl text-[#8E8E9D] hover:border-[#6B8CFF] hover:text-[#6B8CFF] transition-colors group">
            <span className="text-xl group-hover:scale-110 transition-transform">+</span>
            <span className="font-semibold">Add New Address</span>
          </button>
        </div>

        {/* Footer */}
        {/* <div className="sticky bottom-0 bg-[#14141C] border-t border-[#2A2A35] p-4">
          <p className="text-xs text-center text-[#8E8E9D]">
            By selecting a location, you agree to our 
            <button className="text-[#6B8CFF] mx-1">Terms</button>
            and
            <button className="text-[#6B8CFF] mx-1">Privacy Policy</button>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LocationSelector;
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiCalendar, 
  FiClock, 
  FiChevronRight, 
  FiMapPin, 
  FiFilter,
  FiSearch,
  FiUsers,
  FiHeart,
  FiShare2
} from 'react-icons/fi';
import { MdRestaurant, MdEvent, MdLocationOn } from 'react-icons/md';
import { events } from '../../data/events';
import BottomNav from '../../components/BottomNav';

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'today') {
      const today = new Date().toDateString();
      return matchesSearch && new Date(event.date).toDateString() === today;
    }
    if (filter === 'weekend') {
      const date = new Date(event.date);
      return matchesSearch && (date.getDay() === 0 || date.getDay() === 6);
    }
    return matchesSearch;
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#6B8CFF] to-[#8A6FFF] text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Discover exclusive culinary experiences, food festivals, and special dining events
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events by name, venue, or cuisine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6B8CFF]/20 focus:border-[#6B8CFF]"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === 'all'
                      ? 'bg-[#6B8CFF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilter('today')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === 'today'
                      ? 'bg-[#6B8CFF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setFilter('weekend')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === 'weekend'
                      ? 'bg-[#6B8CFF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  This Weekend
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1">
                  <FiFilter size={14} />
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredEvents.length > 0 ? (
            <>
              {/* Results Count */}
              <p className="text-sm text-gray-500 mb-6">
                Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
              </p>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}
                className="mt-4 px-6 py-2 bg-[#6B8CFF] text-white rounded-lg hover:bg-[#5A7AE0] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

// Event Card Component
const EventCard = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#6B8CFF] px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            ${event.price}
          </div>

          {/* Available Spots */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
              <FiUsers size={14} />
              {event.available} spots left
            </div>
            {event.isVeg && (
              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                🌱 Pure Veg
              </div>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <FiHeart size={18} className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#6B8CFF] transition-colors line-clamp-1">
              {event.title}
            </h3>
          </div>

          {/* Venue with Location */}
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <MdRestaurant className="text-[#6B8CFF]" size={16} />
            <span className="font-medium">{event.venue}</span>
            <span className="text-gray-400 mx-1">•</span>
            <MdLocationOn className="text-[#6B8CFF]" size={14} />
            <span className="text-xs text-gray-500">{event.location || 'Downtown'}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Date and Time */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <FiCalendar className="text-[#6B8CFF]" size={14} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-[#6B8CFF]" size={14} />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Book Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle booking
              console.log('Booking event:', event.id);
            }}
            className="w-full mt-auto bg-gradient-to-r from-[#6B8CFF] to-[#8A6FFF] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};
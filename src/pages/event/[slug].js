import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiStar
} from 'react-icons/fi';
import { MdRestaurant, MdEvent, MdLocationOn } from 'react-icons/md';
import { events } from '../../data/events';
// import BottomNav from '../../components/BottomNav';

export default function EventDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundEvent = events.find(e => e.slug === slug);
      if (foundEvent) {
        setEvent(foundEvent);
        setSelectedDate(foundEvent.dates?.[0] || foundEvent.date);
        setSelectedTime(foundEvent.times?.[0] || foundEvent.time);
      } else {
        router.push('/404');
      }
    }
  }, [slug, router]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6B8CFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const similarEvents = events
    .filter(e => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Navigation */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <FiArrowLeft size={20} />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <FiHeart size={18} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                </button>
                <button className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <FiShare2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 pb-8 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#6B8CFF] rounded-full text-xs font-medium">
                  {event.category}
                </span>
                {event.isVeg && (
                  <span className="px-3 py-1 bg-green-500 rounded-full text-xs font-medium">
                    🌱 Pure Veg
                  </span>
                )}
                {event.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-medium">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-3">{event.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                <div className="flex items-center gap-1">
                  <MdRestaurant size={18} />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdLocationOn size={18} />
                  <span>{event.location || 'Downtown'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUsers size={18} />
                  <span>{event.available} spots left</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About the Event</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {event.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {event.longDescription || event.description}
                </p>
              </div>

              {/* Date & Time Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date & Time</h2>
                
                {/* Dates */}
                {event.dates && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {event.dates.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all min-w-[120px] ${
                            selectedDate === date
                              ? 'border-[#6B8CFF] bg-[#6B8CFF]/5'
                              : 'border-gray-200 hover:border-[#6B8CFF]/30'
                          }`}
                        >
                          <div className="text-sm font-semibold text-gray-800">{date}</div>
                          <div className="text-xs text-gray-500">Available</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Times */}
                {event.times && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Time</label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {event.times.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all ${
                            selectedTime === time
                              ? 'border-[#6B8CFF] bg-[#6B8CFF]/5'
                              : 'border-gray-200 hover:border-[#6B8CFF]/30'
                          }`}
                        >
                          <div className="text-sm font-semibold text-gray-800">{time}</div>
                          <div className="text-xs text-gray-500">2 hrs</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Menu/Highlights */}
              {event.menu && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Event Menu</h2>
                  <div className="space-y-3">
                    {event.menu.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <span className="text-[#6B8CFF] font-semibold">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="bg-gray-100 h-48 rounded-xl mb-3 flex items-center justify-center">
                  <p className="text-gray-500">Map will be displayed here</p>
                </div>
                <p className="text-gray-600">
                  <strong>{event.venue}</strong>
                  <br />
                  {event.address || '123 Main Street, Downtown'}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#6B8CFF] mb-1">${event.price}</div>
                  <p className="text-sm text-gray-500">per person</p>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Number of Tickets</label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-lg transition"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(event.available, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-3 border-t border-gray-200 mb-4">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-[#6B8CFF]">
                    ${(event.price * quantity).toFixed(2)}
                  </span>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-[#6B8CFF] to-[#8A6FFF] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95 mb-3">
                  Book Now
                </button>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiClock size={14} />
                    <span>Duration: {event.duration || '2 hours'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers size={14} />
                    <span>Max capacity: {event.capacity || '50'} people</span>
                  </div>
                  {event.includes && (
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>{event.includes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarEvents.map(event => (
                  <Link key={event.id} href={`/event/${event.slug}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="relative h-40">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-[#6B8CFF] text-white px-2 py-1 rounded-full text-xs font-bold">
                          ${event.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-[#6B8CFF] transition">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">{event.venue}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FiCalendar size={12} />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <BottomNav /> */}
    </>
  );
}
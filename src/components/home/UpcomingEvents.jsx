
import Link from 'next/link';
import { FiCalendar, FiClock, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Salmon Butter",
      price: 22.00,
      description: "Order a surprise dish and enjoy a unique culinary creation with our special salmon butter recipe.",
      date: "Feb 16, 2024",
      time: "7:00 PM",
      venue: "Pizza Heaven",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop",
      available: 12,
      slug: "salmon-butter"
    },
    {
      id: 2,
      title: "Herb-Crusted Chicken",
      price: 29.00,
      description: "Order a surprise dish and enjoy a unique culinary creation with our signature herb-crusted chicken.",
      date: "Feb 16, 2024",
      time: "7:00 PM",
      venue: "Burger King",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
      available: 8,
      slug: "herb-crusted-chicken"
    },
    {
      id: 3,
      title: "Lemon Butter Salmon",
      price: 22.00,
      description: "Order a surprise dish and enjoy a unique culinary creation with our fresh lemon butter salmon.",
      date: "Feb 16, 2024",
      time: "7:00 PM",
      venue: "Sweet Treats",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop",
      available: 15,
      slug: "lemon-butter-salmon"
    },
    {
      id: 4,
      title: "Truffle Pasta",
      price: 32.00,
      description: "Exclusive truffle pasta with mushrooms and parmesan.",
      date: "Feb 17, 2024",
      time: "8:00 PM",
      venue: "Dragon Wok",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop",
      available: 6,
      slug: "truffle-pasta"
    }
  ];

  const handleBookNow = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle booking logic here
    console.log('Booking event:', eventId);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Upcoming Events</h2>
            <p className="text-sm text-gray-500 mt-1">Special culinary experiences waiting for you</p>
          </div>
          <div
            // href="/events" 
            className="flex items-center gap-1 text-sm font-medium text-[#6B8CFF] hover:text-[#5A7AE0] 
                     transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
          >
            See all events
            <FiChevronRight size={16} />
          </div>
        </div>

        {/* Events Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 
                           hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                           cursor-pointer h-full flex flex-col">
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-[#6B8CFF] text-white px-3 py-1.5 rounded-full 
                                text-sm font-bold shadow-lg">
                    ${event.price}
                  </div>

                  {/* Available Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white 
                                px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <FiCalendar size={10} />
                    {event.available} spots left
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#6B8CFF] transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Venue */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MdRestaurant size={12} className="text-[#6B8CFF]" />
                    <span>{event.venue}</span>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={12} className="text-[#6B8CFF]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock size={12} className="text-[#6B8CFF]" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Book Button - Prevents event bubbling */}
                  <button 
                    onClick={(e) => handleBookNow(e, event.id)}
                    className="w-full mt-auto bg-gray-100 text-gray-700 py-2 rounded-lg 
                             text-sm font-medium hover:bg-[#6B8CFF] hover:text-white 
                             transition-colors active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;

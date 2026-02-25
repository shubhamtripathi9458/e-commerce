

import { FiSearch, FiShoppingCart, FiTruck, FiHeart } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiSearch,
      title: 'Search',
      description: 'Find your favorite food or grocery items',
      color: 'from-[#6B8CFF] to-[#9F7AEA]'
    },
    {
      icon: FiShoppingCart,
      title: 'Order',
      description: 'Add items to cart and place your order',
      color: 'from-[#9F7AEA] to-[#FF9F7A]'
    },
    {
      icon: FiTruck,
      title: 'Delivery',
      description: 'Get it delivered to your doorstep fast',
      color: 'from-[#FF9F7A] to-[#FF7A9F]'
    }
  ];

  return (
    <section className="py-8 mt-4">
      <div className="mobile-container">
        <h2 className="text-xl font-bold text-center mb-6 text-[#000000]">
          How It Works
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`relative mb-3`}>
                  {/* Glowing Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Icon Container */}
                  <div className={`relative w-16 h-16 mx-auto rounded-full 
                                bg-gradient-to-r ${step.color} p-[2px]`}>
                    <div className="w-full h-full rounded-full bg-[#14141C] flex items-center justify-center">
                      <Icon className="text-[#f2f2f5] group-hover:scale-110 transition-transform" size={28} />
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm text-[#000000] mb-1">
                  {step.title}
                </h3>
                
                <p className="text-xs text-[#8E8E9D] leading-tight">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-6 p-4 bg-[#000000] border border-[#2A2A35] rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiHeart className="text-[#FF7A9F]" />
            <span className="text-sm font-semibold text-[#f2f2f5]">10K+ Happy Customers</span>
            <FiHeart className="text-[#FF7A9F]" />
          </div>
          <p className="text-xs text-[#8E8E9D]">
            Join thousands of satisfied customers getting their favorite food delivered
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { useEffect, useState } from "react";
import { FiTruck, FiPackage, FiClock } from "react-icons/fi";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#000000] flex items-center justify-center">
      <div className="text-center relative">
        {/* Animated circles background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#6B8CFF]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9F7AEA]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* Logo animation */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FiTruck className="text-[#6B8CFF] text-6xl animate-bounce" />
            <FiPackage className="text-[#9F7AEA] text-4xl animate-pulse" />
            <FiClock className="text-[#FF9F7A] text-4xl animate-spin-slow" />
          </div>
          
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] bg-clip-text text-transparent">
              Foodie
            </span>
            <span className="bg-gradient-to-r from-[#FF9F7A] to-[#FF7A9F] bg-clip-text text-transparent">
              Express
            </span>
          </h1>
          
          <p className="text-[#8E8E9D] text-lg animate-fade-in-up">
            Delivering happiness in minutes!
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mt-8">
          <div className="h-2 bg-[#000000] rounded-full overflow-hidden border border-[#2A2A35]">
            <div 
              className="h-full bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-[#6B6B7B] mt-2 animate-pulse">
            {progress < 100 ? 'Getting things ready...' : 'Almost there!'}
          </p>
        </div>

        {/* Floating food items */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float text-2xl opacity-10`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {['🍕', '🍔', '🥗', '🍣', '🥑', '🍎'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
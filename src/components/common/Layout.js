

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import ProfileSheet from "./ProfileSheet";
import LocationSelector from "./LocationSelector";
import SplashScreen from "./SplashScreen ";
// import SplashScreen from "./SplashScreen";

const Layout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Check if user has selected location before
  useEffect(() => {
    const savedLocation = localStorage.getItem("selected-location");
    const hasVisited = localStorage.getItem("has-visited");

    if (!hasVisited) {
      // First time user - show splash then location
      setTimeout(() => {
        setShowSplash(false);
        setShowLocation(true);
        localStorage.setItem("has-visited", "true");
      }, 2000);
    } else {
      // Returning user
      setShowSplash(false);
      if (savedLocation) {
        setSelectedLocation(JSON.parse(savedLocation));
        setLocationSelected(true);
      } else {
        setShowLocation(true);
      }
    }
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationSelected(true);
    setShowLocation(false);
    localStorage.setItem("selected-location", JSON.stringify(location));
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen />;
  }

  // Show location selector if no location selected
  if (showLocation) {
    return (
      <LocationSelector 
        onLocationSelect={handleLocationSelect}
        onClose={() => setShowLocation(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedLocation={selectedLocation}
        onProfileClick={() => setProfileOpen(true)}
        onLocationClick={() => setShowLocation(true)}
      />

      {/* <main className="pt-24 pb-20 md:pb-0">
        {children}
      </main> */}


      <main className="pt-[7.2rem] pb-20 md:pt-[4.8rem] md:pb-0">
  {children}
</main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>

      <ProfileSheet
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
};

export default Layout;


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiRepeat, FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: FiHome, label: "Home" },
    { href: "/order-again", icon: FiRepeat, label: "Order" },
    { href: "/categories", icon: FiGrid, label: "Explore" },
    { href: "/cart", icon: FiShoppingCart, label: "Cart", badge: 3 },
    // { href: "/profile", icon: FiUser, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 md:hidden">
      <nav className="bg-black rounded-full px-2 py-2 shadow-xl flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-white text-black px-4 py-2 rounded-full"
                    : "text-white p-3 rounded-full"
                }`}
              >
                <div className="relative">
                  <Icon size={20} />

                  {/* Cart Badge */}
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Label Only When Active */}
                {isActive && (
                  <span className="text-sm font-medium ml-2">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

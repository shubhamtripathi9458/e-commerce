import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="mobile-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">FoodieExpress</h3>
            <p className="text-gray-400 mb-4">
              Your favorite food and grocery delivery service. Fresh, fast, and reliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/restaurant" className="hover:text-white">Restaurants</Link></li>
              <li><Link href="/category/grocery" className="hover:text-white">Grocery</Link></li>
              <li><Link href="/category/dining" className="hover:text-white">Dining Out</Link></li>
              <li><Link href="/category/pharmacy" className="hover:text-white">Pharmacy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FiMapPin />
                <span>123 Delivery Street, Food City</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail />
                <span>support@foodieexpress.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
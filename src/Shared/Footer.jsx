import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Company Info Section */}
        <div>
          <h2 className="text-3xl font-extrabold">Travel<span className="text-yellow-300">Go</span></h2>
          <p className="mt-4 text-gray-200">
            Your ultimate travel partner for exploring the world's most beautiful destinations.
          </p>
          <div className="flex space-x-4 mt-4">
            <a target='_blank' href="https://facebook.com/imamhossainbu" className="hover:text-yellow-300"><FaFacebookF size={24} /></a>
            <a target='_blank' href="https://x.com/imamhossenbu" className="hover:text-yellow-300"><FaTwitter size={24} /></a>
            <a target='_blank' href="https://instagram.com/imam62310" className="hover:text-yellow-300"><FaInstagram size={24} /></a>
            <a target='_blank' href="https://www.linkedin.com/in/imam-hossen-ub/" className="hover:text-yellow-300"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/packages" className="hover:text-yellow-300">Packages</a></li>
            <li><a href="/booking" className="hover:text-yellow-300">Booking</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center space-x-2">
              <FaPhone /> <span>+880 1624-994532</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope /> <span>imam62310@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt /> <span>Barisal Sadar, Barisal, Bangladesh.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-400 pt-5 text-center text-gray-200 text-sm">
        <p>© {new Date().getFullYear()} TravelGo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

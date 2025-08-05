import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaSuitcase, FaPhone, FaBook, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut, wishlist } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Console log the wishlist from context to verify its content
  console.log("Navbar Wishlist from Context:", wishlist);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/');
        toast('Log out successful');
      })
      .catch(error => {
        console.error("Error logging out:", error);
        toast.error("Logout failed!");
      });
  };

  // Navigation menu items
  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="text-xl" /> },
    { to: "/packages", label: "Packages", icon: <FaSuitcase className="text-xl" /> },
    { to: "/booking", label: "Booking", icon: <FaBook className="text-xl" /> },
    { to: "/contact", label: "Contact", icon: <FaPhone className="text-xl" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-3xl font-extrabold tracking-wide">
              Travel<span className="text-yellow-300">Go</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center gap-2 font-semibold text-lg border-b-2 border-yellow-300 transition-all duration-300"
                    : "text-white flex items-center gap-2 hover:text-yellow-300 text-lg transition-all duration-300"
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Section: Cart + User Profile */}
          <div className="relative flex items-center space-x-6">
            {user && (
              <NavLink to="/dashboard/wishlist" className="relative text-white hover:text-yellow-300 transition-all duration-300">
                <FaShoppingCart className="h-8 w-8" />
                {/* Only show count if wishlist is an array and has items */}
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            )}

            {!user ? (
              <NavLink
                to="/login"
                className="bg-yellow-300 text-indigo-700 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300"
              >
                Login
              </NavLink>
            ) : (
              <div className="relative cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150/0000FF/FFFFFF?text=User"} // Fallback image
                  alt="User"
                  className="h-12 w-12 rounded-full border-2 border-yellow-300 object-cover"
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                    <NavLink
                      to="/dashboard"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-6 py-2 cursor-pointer text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden z-50 relative">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                {isOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full py-20 bg-indigo-700 transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 flex items-center gap-2 font-semibold text-lg transition-all duration-300"
                  : "text-white flex items-center gap-2 hover:text-yellow-300 text-lg transition-all duration-300"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {user && (
            <NavLink to="/dashboard/wishlist" className="relative text-white hover:text-yellow-300 transition-all duration-300">
              <FaShoppingCart className="h-8 w-8" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="bg-yellow-300 text-indigo-700 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <div className="text-center">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150/0000FF/FFFFFF?text=User"} // Fallback image
                alt="User"
                className="h-12 w-12 rounded-full border-2 border-yellow-300 mx-auto mb-4 object-cover"
              />
              <NavLink
                to="/dashboard"
                className="block text-white py-2 hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogOut}
                className="block w-full text-white py-2 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

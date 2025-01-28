import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.jpg';

const ErrorPage = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Adjusted Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      {/* Animated Box */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-10 max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-7xl font-bold text-blue-600 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          404
        </motion.h1>
        
        <motion.h2
          className="text-3xl font-semibold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Oops! Page Not Found
        </motion.h2>
        
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          The page you are looking for might have been removed or is temporarily unavailable.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;

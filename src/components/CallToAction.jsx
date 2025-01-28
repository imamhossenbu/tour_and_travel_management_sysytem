import { motion } from 'framer-motion';
import callImg from '../assets/callImg.jpg'

const CallToAction = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-fixed py-24 text-center"
      style={{
        backgroundImage: `url(${callImg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      {/* CTA Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Discover the world's best travel destinations and book your dream vacation today.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <motion.a
            href="/packages"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Packages
          </motion.a>

          <motion.a
            href="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToAction;

import { motion } from 'framer-motion';
import bgImg from '../assets/bg-5.jpg'

const Newsletter = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-fixed py-24"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      <motion.div
        className="relative z-10 text-center text-white max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Stay Updated with Our Latest Offers!
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Subscribe to our newsletter and never miss out on amazing travel deals and updates.
        </p>

        <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-6 py-3 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <motion.button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Newsletter;

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const PopularDestination = () => {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of cards to display initially
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/destinations')
      .then(res => {
        setData(res.data.data);
      });
  }, [axiosPublic]);

  // Show more handler
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6); // Show 6 more cards
  };

  return (
    <div className="py-16 bg-gray-100 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Popular Destinations
      </motion.h2>

      <motion.p
        className="text-lg max-w-2xl mx-auto text-gray-600 mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover the world's most breathtaking destinations with our exclusive travel packages.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 container mx-auto px-6 md:px-12">
        {data.slice(0, visibleCount).map((destination, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-80 object-cover transform transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h3>
              <p className="text-gray-600">{destination.description}</p>
              <Link to={`/destination-details/${destination.id}`}>
                <button className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < data.length && (
        <motion.button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-medium transition duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onClick={handleShowMore}
        >
          Show More
        </motion.button>
      )}
    </div>
  );
};

export default PopularDestination;

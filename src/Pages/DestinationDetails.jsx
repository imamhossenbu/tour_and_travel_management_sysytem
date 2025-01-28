import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const DestinationDetails = () => {
  const { id } = useParams(); // Get destination id from the URL
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch destination details
    axiosPublic.get(`/destinations/${id}`).then((res) => {
      setDestination(res.data.data);
    });
  }, [id, axiosPublic]);

  useEffect(() => {
    // Fetch packages for this destination
    axiosPublic.get(`/packages`).then((res) => {
      const data = res.data.data;
      const filteredPackages = data.filter((item) => item.destination_id === parseInt(id));
      setPackages(filteredPackages);
    });
  }, [id, axiosPublic]);

  if (!destination) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen text-lg text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading destination details...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-16 px-6 md:px-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Destination Details Section */}
      <motion.div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-[300px] object-cover"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          className="w-full md:w-1/2 p-6 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{destination.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{destination.description}</p>
          <motion.p
            className="text-gray-800 font-semibold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <strong>Location:</strong> <span className="text-blue-600">{destination.location}</span>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Packages Section */}
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Available Packages
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 container mx-auto ">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-blue-600">${pkg.price}</span>
                <span className="text-sm text-gray-500">{pkg.duration} days</span>
              </div>
              <button className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {packages.length === 0 && (
        <motion.p
          className="text-lg text-gray-600 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          No packages available for this destination.
        </motion.p>
      )}
    </motion.div>
  );
};

export default DestinationDetails;

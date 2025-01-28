import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaUmbrellaBeach, FaHiking, FaCar, FaPassport } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    title: 'Flight Booking',
    description: 'Book your flights with ease and at the best prices available.',
    icon: <FaPlane className="text-5xl text-white" />,
    gradient: 'from-blue-500 to-blue-400',
  },
  {
    id: 2,
    title: 'Hotel Reservations',
    description: 'Find and reserve the best hotels at your travel destinations.',
    icon: <FaHotel className="text-5xl text-white" />,
    gradient: 'from-green-500 to-green-400',
  },
  {
    id: 3,
    title: 'Beach Holidays',
    description: 'Enjoy exclusive beach holiday packages with all amenities.',
    icon: <FaUmbrellaBeach className="text-5xl text-white" />,
    gradient: 'from-yellow-500 to-yellow-400',
  },
  {
    id: 4,
    title: 'Adventure Tours',
    description: 'Experience thrilling adventures and unforgettable moments.',
    icon: <FaHiking className="text-5xl text-white" />,
    gradient: 'from-red-500 to-red-400',
  },
  {
    id: 5,
    title: 'Car Rentals',
    description: 'Rent a car anywhere, anytime for your convenience and comfort.',
    icon: <FaCar className="text-5xl text-white" />,
    gradient: 'from-purple-500 to-purple-400',
  },
  {
    id: 6,
    title: 'Visa Assistance',
    description: 'Get hassle-free visa processing for your international trips.',
    icon: <FaPassport className="text-5xl text-white" />,
    gradient: 'from-pink-500 to-pink-400',
  },
];

const ServicesSection = () => {
  return (
    <div className="py-16 bg-gray-100 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h2>

      <p className="text-lg max-w-3xl mx-auto text-gray-600 mb-12">
        We offer a wide range of travel services to make your journey enjoyable and hassle-free.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            className={`p-8 rounded-xl shadow-lg bg-gradient-to-r ${service.gradient} flex flex-col items-center text-center`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-white leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;

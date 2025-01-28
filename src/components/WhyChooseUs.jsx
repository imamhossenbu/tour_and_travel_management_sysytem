import { motion } from 'framer-motion';
import { FaGlobe, FaHeadset, FaShieldAlt, FaDollarSign, FaPlane, FaClock, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../index.css'

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaGlobe className="text-6xl text-white" />,
      title: 'Worldwide Destinations',
      description: 'Explore a wide range of travel destinations across the globe.',
      gradient: 'bg-gradient-to-r from-blue-500/80 to-blue-300/80',
    },
    {
      id: 2,
      icon: <FaHeadset className="text-6xl text-white" />,
      title: '24/7 Customer Support',
      description: 'Our support team is available around the clock to assist you.',
      gradient: 'bg-gradient-to-r from-green-500/80 to-green-300/80',
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-6xl text-white" />,
      title: 'Secure Booking',
      description: 'Book your trip with confidence using our secure system.',
      gradient: 'bg-gradient-to-r from-purple-500/80 to-purple-300/80',
    },
    {
      id: 4,
      icon: <FaDollarSign className="text-6xl text-white" />,
      title: 'Best Price Guarantee',
      description: 'We offer the best prices to make your dream vacation affordable.',
      gradient: 'bg-gradient-to-r from-orange-500/80 to-orange-300/80',
    },
    {
      id: 5,
      icon: <FaPlane className="text-6xl text-white" />,
      title: 'Easy Booking Process',
      description: 'Enjoy a hassle-free booking process with just a few clicks.',
      gradient: 'bg-gradient-to-r from-red-500/80 to-red-300/80',
    },
    {
      id: 6,
      icon: <FaClock className="text-6xl text-white" />,
      title: 'Timely Service',
      description: 'We ensure timely arrangements for all your travel needs.',
      gradient: 'bg-gradient-to-r from-cyan-500/80 to-cyan-300/80',
    },
  ];

  return (
    <div className="py-16 bg-gray-100 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose Us
      </motion.h2>

      <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-12">
        Discover why thousands of travelers trust us for their dream vacations.
      </p>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }, // 2 cards for medium screens
            1024: { slidesPerView: 3 }, // 3 cards for large screens
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          speed={1500} // Smoother transition speed
          className="max-w-6xl mx-auto px-6 md:px-12"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={feature.id}>
              <motion.div
                className={`h-[300px] p-8 rounded-2xl shadow-lg ${feature.gradient} flex flex-col items-center text-center`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-3xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white leading-relaxed">{feature.description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer text-white text-4xl p-2 bg-amber-600 rounded-full shadow-lg  transition-all duration-300">
          <FaArrowLeft size={20} />
        </div>
        <div className="custom-next absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white text-4xl p-2 bg-amber-600 rounded-full shadow-lg  transition-all duration-300">
          <FaArrowRight size={20}/>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

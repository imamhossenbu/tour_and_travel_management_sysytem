import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../index.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            review: 'Amazing experience! Everything was perfectly organized and hassle-free. Highly recommend!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            id: 2,
            name: 'Sarah Williams',
            review: 'Had the best vacation of my life! The customer service was top-notch.',
            rating: 4,
            image: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            review: 'Excellent service and great value for money. Will book again for sure!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
            id: 4,
            name: 'Emily Brown',
            review: 'Smooth booking process and great accommodations. Totally worth it!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        {
            id: 5,
            name: 'David Smith',
            review: 'Friendly staff and fantastic destinations. Enjoyed every moment.',
            rating: 4,
            image: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
            id: 6,
            name: 'Olivia Taylor',
            review: 'Very organized and professional. Will definitely travel again with them!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/6.jpg',
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
                What Our Customers Say
            </motion.h2>

            <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-12">
                Read what our happy travelers have to say about their experiences with us.
            </p>

            <div className="relative">
                <Swiper
                    modules={[Navigation,Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    speed={1500}
                    className="max-w-6xl mx-auto px-6 md:px-12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={testimonial.id}>
                            <motion.div
                                className="h-[350px] p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaQuoteLeft className="text-blue-500 text-4xl mb-4" />
                                <p className="text-gray-600 mb-4">{testimonial.review}</p>
                                <div className="flex space-x-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-xl" />
                                    ))}
                                </div>
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full border-4 border-blue-500 mb-3"
                                />
                                <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="custom-prev absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer text-white text-4xl p-2 bg-amber-600 rounded-full shadow-lg  transition-all duration-300">
                    <FaArrowLeft size={20} />
                </div>
                <div className="custom-next absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white text-4xl p-2 bg-amber-600 rounded-full shadow-lg  transition-all duration-300">
                    <FaArrowRight size={20} />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

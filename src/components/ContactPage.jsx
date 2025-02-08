import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <div className="py-16 bg-gray-100">
            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Get in Touch</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Contact Form */}
                    <motion.div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-600 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium">Your Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium">Your Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right Side - Contact Info */}
                    <div className="space-y-8">
                        <motion.div
                            className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaMapMarkerAlt className="text-blue-600 text-4xl" />
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">Our Location</h4>
                                <p className="text-gray-600">Barisal Sadar, Barisal, Bangladesh</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaPhoneAlt className="text-blue-600 text-4xl" />
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">Call Us</h4>
                                <p className="text-gray-600">+880 1624-994532</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaEnvelope className="text-blue-600 text-4xl" />
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">Email Us</h4>
                                <p className="text-gray-600">imam.cse9.bu@gmail.com</p>
                            </div>
                        </motion.div>

                        {/* Social Media Links */}
                        <motion.div className="bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Follow Us</h4>
                            <div className="flex justify-center space-x-6">
                                <motion.a
                                    href="https://facebook.com/imamhossainbu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-3xl hover:text-blue-800 transition-all duration-300"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <FaFacebookF />
                                </motion.a>
                                <motion.a
                                    href="https://x.com/imamhossenbu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 text-3xl hover:text-blue-600 transition-all duration-300"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <FaTwitter />
                                </motion.a>
                                <motion.a
                                    href="https://instagram.com/imam62310"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 text-3xl hover:text-pink-800 transition-all duration-300"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <FaInstagram />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/imam-hossen-ub/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 text-3xl hover:text-blue-900 transition-all duration-300"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <FaLinkedinIn />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Google Map Embed */}
                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">Find Us On The Map</h3>
                    <iframe
                        className="w-full rounded-lg shadow-lg"
                        height="400"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58823.63400396304!2d90.35417047362344!3d22.701002563116623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37554d391b1108af%3A0x37b5f343e270b8c2!2sBarisal%20Sadar%20Upazila%2C%20Barisal%20District!5e0!3m2!1sen!2sbd!4v1706000000000!5m2!1sen!2sbd"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;

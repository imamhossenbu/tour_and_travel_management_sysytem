import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqImg from '../assets/faqImg.jpg';  

const faqData = [
  {
    question: 'What is the refund policy?',
    answer: 'You can cancel your booking up to 7 days before departure for a full refund.',
  },
  {
    question: 'Do you offer travel insurance?',
    answer: 'Yes, we provide comprehensive travel insurance for all our packages.',
  },
  {
    question: 'How do I book a trip?',
    answer: 'You can book a trip easily through our website or by contacting our support team.',
  },
  {
    question: 'Are group discounts available?',
    answer: 'Yes, we offer discounts for group bookings of 5 or more people.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img src={faqImg} alt="FAQ" className="rounded-md shadow-md w-full h-auto max-h-96 object-cover" />
        </div>

        {/* Right Side - FAQ */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQs</h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md shadow-sm bg-white"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 flex items-center justify-between text-left text-sm font-medium text-gray-800 focus:outline-none"
                >
                  <h3>{faq.question}</h3>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-blue-500" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-4 pb-3 text-sm text-gray-600"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

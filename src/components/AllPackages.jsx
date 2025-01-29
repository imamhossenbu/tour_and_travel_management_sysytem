import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { NavLink } from 'react-router-dom';

const AllPackages = () => {
  const [data,setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(()=>{
    axiosPublic.get('/packages')
    .then(res=>{
      setData(res.data.data)
    })
  },[axiosPublic])



  return (
    <div className="py-16 bg-gray-100 text-center">
      <motion.h2 
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        All Packages
      </motion.h2>

      <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-12">
        Discover our all travel packages tailored just for you!
      </p>

      <div className="grid md:grid-cols-3 gap-8 container mx-auto px-6 md:px-12">
        {data.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
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
              <NavLink to={`/package-details/${pkg.id}`}>
                <button className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300">
                  Learn More
                </button>
              </NavLink>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;

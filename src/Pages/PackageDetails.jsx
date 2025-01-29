import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { motion } from "framer-motion";

const PackageDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [details, setDetails] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/packages/${id}`)
            .then(res => {
                setData(res.data[0]); // Assuming API returns an array
            })
            .catch(err => console.error("Error fetching package:", err));

        axiosPublic.get(`/itinerary/${id}`)
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => console.error("Error fetching itinerary:", err));
    }, [axiosPublic, id]);

    if (!data) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Main Package Section */}
            <div className="flex flex-col items-center md:flex-row gap-6 mb-10">
                {/* Left Side - Image */}
                <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={data?.image}
                        alt={data?.title}
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                </motion.div>

                {/* Right Side - Details */}
                <motion.div
                    className="w-full md:w-1/2 flex flex-col justify-between"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="text-3xl font-bold mb-3">{data?.title}</h2>
                        <p className="text-gray-600 mb-4">{data?.description}</p>
                        <p className="text-lg font-semibold">Price: <span className="text-blue-500">${data?.price}</span></p>
                        <p className="text-lg font-semibold">Duration: <span className="text-green-500">{data?.duration} days</span></p>
                    </div>

                    {/* Add to Wishlist Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                        <FaHeart /> Add to Wishlist
                    </motion.button>
                </motion.div>
            </div>

            {/* Itinerary Section */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {details.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="bg-gray-100 p-5 rounded-lg shadow-md border-l-4 border-blue-500"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className="text-xl font-semibold mb-2">Day {item.day_number}: {item.activity}</h4>
                            <p className="text-gray-700">{item.details}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;

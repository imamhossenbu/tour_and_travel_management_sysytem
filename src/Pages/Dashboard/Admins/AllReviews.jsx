import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Rating from 'react-rating'; // ✅ Import React Rating
import { FaRegStar, FaStar } from "react-icons/fa"; // ✅ Star icons

const AllReviews = () => {
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axiosPublic.get('/reviews') // ✅ Fetch reviews instead of wishlist
            .then((res) => {
                setReviews(res.data);
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, [axiosPublic]);

    // ✅ Handle delete review
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/reviews/${id}`)
                    .then((res) => {
                        console.log(res);
                        // ✅ Update state after deletion
                        setReviews(reviews.filter(review => review.id !== id));

                        Swal.fire("Deleted!", "Your review has been removed.", "success");
                    })
                    .catch(err => console.error("Error deleting review:", err));
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6">User Reviews</h3>

            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews available.</p>
            ) : (
                <motion.table 
                    className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <thead className="bg-gray-200">
                        <tr className="text-left">
                            <th className="p-4 border border-gray-300">User</th>
                            <th className="p-4 border border-gray-300">Name</th>
                            <th className="p-4 border border-gray-300">Comment</th>
                            <th className="p-4 border border-gray-300">Review</th>
                            <th className="p-4 border border-gray-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <motion.tr 
                                key={index} 
                                className="hover:bg-gray-100 transition-all duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* User Photo */}
                                <td className="p-4 border border-gray-300 text-center">
                                    <img 
                                        src={review.user_photo_url || "https://via.placeholder.com/50"}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full mx-auto"
                                    />
                                </td>

                                {/* User Name */}
                                <td className="p-4 border border-gray-300">{review.user_name || "Anonymous"}</td>

                                {/* Reviewed Item */}
                                <td className="p-4 border border-gray-300">{review.message || "No title available"}</td>

                                {/* Review Rating */}
                                <td className="p-4 border border-gray-300 text-center">
                                    <Rating
                                        emptySymbol={<FaRegStar size={20} className="text-gray-400" />}
                                        fullSymbol={<FaStar size={20} className="text-yellow-500" />}
                                        fractions={2}
                                        initialRating={review.rating}
                                        readonly
                                    />
                                </td>

                                {/* Delete Action */}
                                <td className="p-4 border border-gray-300 text-center">
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 mx-auto"
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}
        </div>
    );
};

export default AllReviews;

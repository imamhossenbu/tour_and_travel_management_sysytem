import { useContext, useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Rating from 'react-rating'; // ⭐ For star ratings
import { FaStar, FaRegStar } from "react-icons/fa"; // ⭐ Icons for ratings

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null); // Stores the review being edited
    const [updatedMessage, setUpdatedMessage] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);

    // ✅ Fetch reviews from backend
    useEffect(() => {
        axiosPublic.get(`/reviews/user/${user?.uid}`)
            .then((res) => {
                console.log("Reviews Response:", res.data);
                setReviews(res.data.data);
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, [axiosPublic, user?.uid]);

    // ✅ Handle delete review
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/reviews/${id}`)
                    .then(() => {
                        setReviews(reviews.filter(review => review.id !== id));
                        Swal.fire("Deleted!", "Your review has been removed.", "success");
                    })
                    .catch(err => console.error("Error deleting review:", err));
            }
        });
    };

    // ✅ Open Modal for Editing
    const handleEdit = (review) => {
        setSelectedReview(review);
        setUpdatedMessage(review.message);
        setUpdatedRating(review.rating);
    };

    // ✅ Handle save updated review
    const handleSave = () => {
        if (!selectedReview) return;

        axiosPublic.patch(`/reviews/${selectedReview.id}`, {
            message: updatedMessage,
            rating: updatedRating
        })
        .then(() => {
            setReviews(reviews.map(review =>
                review.id === selectedReview.id ? { ...review, message: updatedMessage, rating: updatedRating } : review
            ));
            setSelectedReview(null);
            Swal.fire("Updated!", "Your review has been updated.", "success");
        })
        .catch(err => console.error("Error updating review:", err));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Reviews Title */}
            <h3 className="text-2xl font-bold text-center mb-6">My Reviews</h3>

            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center mt-6">You haven't reviewed any packages yet.</p>
            ) : (
                <motion.table 
                    className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Table Header with Background Color */}
                    <thead className="bg-indigo-600 text-white">
                        <tr className="text-left">
                            <th className="p-4 border border-gray-300 text-center">Image</th>
                            <th className="p-4 border border-gray-300">Package</th>
                            <th className="p-4 border border-gray-300 text-center">Rating</th>
                            <th className="p-4 border border-gray-300">Review</th>
                            <th className="p-4 border border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {reviews.map((review, index) => (
                            <motion.tr 
                                key={index} 
                                className="hover:bg-gray-100 transition-all duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Package Image */}
                                <td className="p-4 border border-gray-300 text-center">
                                    <img 
                                        src={review.image || "https://via.placeholder.com/50"}
                                        alt={review.package_name}
                                        className="w-16 h-16 rounded-lg mx-auto object-cover shadow-md"
                                    />
                                </td>

                                {/* Package Name */}
                                <td className="p-4 border border-gray-300">{review.package_name || "No name available"}</td>

                                {/* Rating */}
                                <td className="p-4 border border-gray-300 text-center">
                                    <Rating 
                                        initialRating={review.rating}
                                        emptySymbol={<FaRegStar size={18} className="text-gray-400" />}
                                        fullSymbol={<FaStar size={18} className="text-yellow-500" />}
                                        readonly
                                    />
                                </td>

                                {/* Review Message */}
                                <td className="p-4 border border-gray-300">{review.message || "No review available"}</td>

                                {/* Actions: Edit & Delete */}
                                <td className="p-4 border h-full border-gray-300 text-center flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => handleEdit(review)}
                                        className="bg-blue-500 cursor-pointer text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                                    >
                                        <FaEdit />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="bg-red-500 text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}

            {/* Modal for Editing Review */}
            {selectedReview && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Edit Review</h3>

                        {/* Rating Input */}
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Update Rating:</p>
                            <Rating
                                initialRating={updatedRating}
                                emptySymbol={<FaRegStar size={24} className="text-gray-400" />}
                                fullSymbol={<FaStar size={24} className="text-yellow-500" />}
                                fractions={2}
                                onChange={setUpdatedRating}
                            />
                        </div>

                        {/* Review Message Input */}
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Update Review:</p>
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                value={updatedMessage}
                                onChange={(e) => setUpdatedMessage(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-green-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;

import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import Rating from 'react-rating';  // Import React Rating
import { AuthContext } from '../context/AuthContext'
import Swal from "sweetalert2";
// import { toast } from "react-toastify";

const PackageDetails = () => {
    const { user , addToWishlist} = useContext(AuthContext)
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [details, setDetails] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    console.log(user);

    useEffect(() => {
        axiosPublic.get(`/packages/${id}`)
            .then(res => {
                setData(res.data[0]);
            })
            .catch(err => console.error("Error fetching package:", err));

        axiosPublic.get(`/itinerary/${id}`)
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => console.error("Error fetching itinerary:", err));

        axiosPublic.get(`/reviews/${id}`)
            .then(res => {
                console.log(res.data);
                setReviews(res.data);  // Assuming reviews are fetched from this API
            })
            .catch(err => console.error("Error fetching reviews:", err));
    }, [axiosPublic, id]);


    const handleWishList = () => {
        addToWishlist(id);  // ✅ Update globally
        Swal.fire("Success", "Added to wishlist successfully", "success");
    };

    const handleReviewSubmit = () => {
        const newReview = {
            rating,
            message: reviewMessage,
            name: user?.displayName,
            photo: user?.photoURL,
            uid: user?.uid
        };
        axiosPublic.post(`/reviews/${id}`, newReview)
            .then(() => {
                Swal.fire('Success', 'Review added successfully', 'success');
                setReviews(prevReviews => [newReview, ...prevReviews]);
                setRating(0);
                setReviewMessage('');
                navigate('/packages')
            })
            .catch(err => console.error("Error submitting review:", err));
    };

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
                    <motion.button onClick={() => handleWishList(data.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
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

            {/* Add Review Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Add a Review</h3>
                <div className="flex flex-col gap-4">
                    {/* Rating Component */}
                    <Rating
                        className="flex gap-1 text-amber-400"
                        emptySymbol={<FaRegStar size={20} />}
                        fullSymbol={<FaStar size={20} />}
                        fractions={2}
                        onChange={setRating}
                        initialRating={rating}
                    />
                    <textarea
                        value={reviewMessage}
                        required
                        onChange={(e) => setReviewMessage(e.target.value)}
                        placeholder="Leave your review here..."
                        className="p-4 border rounded-lg text-gray-700"
                        rows="4"
                    />
                    <button
                        onClick={handleReviewSubmit}
                        className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Submit Review
                    </button>
                </div>
            </div>


            {/* All Reviews Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col items-center hover:scale-105 transform transition-all duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* User Photo */}
                                <motion.div
                                    className="w-16 h-16 mb-4"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={review.user_photo_url || 'https://via.placeholder.com/50'}
                                        alt={review.user_name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </motion.div>

                                {/* User Name and Rating */}
                                <div className="text-center mb-4">
                                    <p className="font-semibold text-gray-800">{review.user_name}</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Rating
                                            className="text-amber-400"
                                            emptySymbol={<FaRegStar size={20} />}
                                            fullSymbol={<FaStar size={20} />}
                                            readonly
                                            initialRating={review.rating}
                                        />
                                    </div>
                                </div>

                                {/* Review Message */}
                                <p className="text-gray-700 text-center">{review.message}</p>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default PackageDetails;

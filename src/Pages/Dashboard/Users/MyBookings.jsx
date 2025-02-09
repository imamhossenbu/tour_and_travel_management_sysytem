import { useContext, useEffect, useState } from "react";
import { FaCreditCard, FaClock, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    // ✅ Fetch User's Bookings
    useEffect(() => {
        axiosPublic.get(`/bookings/${user?.uid}`)
            .then((res) => {
                console.log("Bookings Response:", res.data);
                setBookings(res.data.data);
            })
            .catch((error) => console.error("Error fetching bookings:", error));
    }, [axiosPublic, user?.uid]);

    // ✅ Handle Request Cancellation
    const handleRequestCancel = (bookingId) => {
        Swal.fire({
            title: "Request Cancellation?",
            text: "Your request will be sent to the admin for approval.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Request Cancellation"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/bookings/cancel/request/${bookingId}`)
                    .then(() => {
                        setBookings(bookings.map(booking =>
                            booking.booking_id === bookingId ? { ...booking, status: "Cancellation Requested" } : booking
                        ));
                        Swal.fire("Requested!", "Your cancellation request has been sent.", "success");
                    })
                    .catch(err => console.error("Error requesting cancellation:", err));
            }
        });
    };

    // ✅ Handle Payment Redirection
    const handlePayment = (bookingId) => {
        Swal.fire({
            title: "Proceed to Payment?",
            text: "You are about to pay for your booking.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Pay Now"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/payment/${bookingId}`);
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">My Bookings</h3>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center">You have no bookings yet.</p>
            ) : (
                <motion.table
                    className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* ✅ Table Header */}
                    <thead className="bg-blue-600 text-white">
                        <tr className="text-left">
                            <th className="p-4 border border-gray-300">Image</th>
                            <th className="p-4 border border-gray-300">Package</th>
                            <th className="p-4 border border-gray-300">Travel Date</th>
                            <th className="p-4 border border-gray-300">Travelers</th>
                            <th className="p-4 border border-gray-300">Total Price</th>
                            <th className="p-4 border border-gray-300">Status</th>
                            <th className="p-4 border border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* ✅ Table Body */}
                    <tbody>
                        {bookings.map((booking, index) => (
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
                                        src={booking.package_image || "https://via.placeholder.com/50"}
                                        alt={booking.package_title}
                                        className="w-16 h-16 rounded-lg mx-auto object-cover shadow-md"
                                    />
                                </td>

                                {/* Package Name */}
                                <td className="p-4 border border-gray-300">{booking.package_title || "No name available"}</td>

                                {/* Travel Date (Only Date, No Time) */}
                                <td className="p-4 border border-gray-300">
                                    {new Date(booking.travel_date).toISOString().split("T")[0] || "Unknown"}
                                </td>

                                {/* Number of Travelers */}
                                <td className="p-4 border border-gray-300 text-center">{booking.num_travelers}</td>

                                {/* Total Price */}
                                <td className="p-4 border border-gray-300 text-green-600 font-bold">${booking.total_price}</td>

                                {/* Booking Status */}
                                <td className="p-4 border border-gray-300">
                                    {booking.status === "Pending" && (
                                        <span className="text-yellow-500 font-bold flex items-center gap-2">
                                            <FaClock /> Pending
                                        </span>
                                    )}
                                    {booking.status === "Confirmed" && (
                                        <span className="text-green-600 font-bold">Confirmed</span>
                                    )}
                                    {booking.status === "Cancellation Requested" && (
                                        <span className="text-orange-500 font-bold">Cancellation Requested</span>
                                    )}
                                    {booking.status === "Cancelled" && (
                                        <span className="text-red-500 font-bold">Cancelled</span>
                                    )}
                                    {booking.status === "Cancelled with Refund" && (
                                        <span className="text-purple-600 font-bold">Refunded</span>
                                    )}
                                </td>

                                {/* Actions: Pay Now & Request Cancellation */}
                                <td className="p-4 border border-gray-300 text-center flex justify-center gap-4">
                                    {/* Pay Now Button (Only if Pending) */}
                                    {booking.status === "Pending" && (
                                        <button
                                            onClick={() => handlePayment(booking.booking_id)}
                                            className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                                        >
                                            <FaCreditCard /> Pay Now
                                        </button>
                                    )}

                                    {/* Request Cancellation (Only if Confirmed) */}
                                    {booking.status === "Confirmed" && (
                                        <button
                                            onClick={() => handleRequestCancel(booking.booking_id)}
                                            className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                                        >
                                            <FaTimes /> Request Cancellation
                                        </button>
                                    )}
                                    {booking.status === "Cancelled with Refund" && (
                                        <button
                                            onClick={() => handlePayment(booking.booking_id)}
                                            className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                                        >
                                           <FaCreditCard /> Pay Again 
                                        </button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}
        </div>
    );
};

export default MyBookings;

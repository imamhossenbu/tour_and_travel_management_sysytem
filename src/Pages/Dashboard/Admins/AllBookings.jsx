import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllBookings = () => {
    const axiosPublic = useAxiosPublic();
    const [bookings, setBookings] = useState([]);

    // ✅ Fetch All Bookings (Admin)
    useEffect(() => {
        axiosPublic.get("/admin/bookings")
            .then((res) => {
                console.log("Admin Bookings Response:", res.data);
                setBookings(res.data.data);
            })
            .catch((error) => console.error("Error fetching bookings:", error));
    }, [axiosPublic]);

    // ✅ Approve Booking
    const handleApprove = (bookingId) => {
        Swal.fire({
            title: "Confirm Approval?",
            text: "This booking will be confirmed!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/bookings/approve/${bookingId}`)
                    .then(() => {
                        setBookings(bookings.map(booking =>
                            booking.booking_id === bookingId ? { ...booking, status: "Confirmed" } : booking
                        ));
                        Swal.fire("Approved!", "Booking has been confirmed.", "success");
                    })
                    .catch(err => console.error("Error approving booking:", err));
            }
        });
    };

    // ✅ Handle Cancellation Approval (Admin Grants Refund)
    const handleApproveCancellation = (bookingId) => {
        Swal.fire({
            title: "Approve Cancellation?",
            text: "This booking will be marked as 'Cancelled with Refund'.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Approve Refund"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/bookings/cancel/approve/${bookingId}`)
                    .then(() => {
                        setBookings(bookings.map(booking =>
                            booking.booking_id === bookingId ? { ...booking, status: "Cancelled with Refund", refund_status: "Refunded" } : booking
                        ));
                        Swal.fire("Cancelled!", "Booking has been refunded.", "success");
                    })
                    .catch(err => console.error("Error approving cancellation:", err));
            }
        });
    };

    // ✅ Deny Cancellation Request
    const handleDenyCancellation = (bookingId) => {
        Swal.fire({
            title: "Deny Cancellation?",
            text: "This booking will remain confirmed.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Keep Confirmed"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/bookings/cancel/deny/${bookingId}`)
                    .then(() => {
                        setBookings(bookings.map(booking =>
                            booking.booking_id === bookingId ? { ...booking, status: "Confirmed" } : booking
                        ));
                        Swal.fire("Updated!", "Booking remains confirmed.", "success");
                    })
                    .catch(err => console.error("Error denying cancellation:", err));
            }
        });
    };

    // ✅ Delete Booking
    const handleDelete = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This booking will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/bookings/admin/${bookingId}`)
                    .then(() => {
                        setBookings(bookings.filter(booking => booking.booking_id !== bookingId));
                        Swal.fire("Deleted!", "Booking has been removed.", "success");
                    })
                    .catch(err => console.error("Error deleting booking:", err));
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">All Bookings</h3>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center">No bookings found.</p>
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
                                <td className="p-4 border border-gray-300 text-center">
                                    <img src={booking.package_image} alt={booking.package_title} className="w-16 h-16 rounded-lg mx-auto object-cover shadow-md" />
                                </td>
                                <td className="p-4 border border-gray-300">{booking.package_title}</td>
                                <td className="p-4 border border-gray-300">{new Date(booking.travel_date).toISOString().split("T")[0]}</td>
                                <td className="p-4 border border-gray-300 text-center">{booking.num_travelers}</td>
                                <td className="p-4 border border-gray-300 text-green-600 font-bold">${booking.total_price}</td>
                                <td className="p-4 border border-gray-300 font-bold">{booking.status}</td>

                                <td className="p-4 border border-gray-300 text-center flex justify-center gap-4">
                                    {booking.status === "Pending" && <button onClick={() => handleApprove(booking.booking_id)} className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600"> Approve</button>}
                                    {booking.status === "Cancellation Requested" && <>
                                        <button onClick={() => handleApproveCancellation(booking.booking_id)} className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600"> Approve Cancel</button>
                                        <button onClick={() => handleDenyCancellation(booking.booking_id)} className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"> Deny Cancel</button>
                                    </>}
                                    <button onClick={() => handleDelete(booking.booking_id)} className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600"><FaTrash /></button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}
        </div>
    );
};

export default AllBookings;

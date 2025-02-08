import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../context/AuthContext";

const MyPayments = () => {
    const axiosPublic = useAxiosPublic();
    const [payments, setPayments] = useState([]);
    const {user} = useContext(AuthContext);

    // ✅ Fetch Payments for the logged-in user
    useEffect(() => {
        axiosPublic.get(`/user/payments/${user?.email}`) // Endpoint should be for fetching user's payments
            .then((res) => {
                console.log("My Payments Response:", res.data);
                setPayments(res.data.data); // Store payment data in state
            })
            .catch((error) => {
                console.error("Error fetching payments:", error);
                Swal.fire("Error", "Failed to load payment details.", "error");
            });
    }, [axiosPublic, user?.email]);

    // ✅ View Payment Details
    const handleViewDetails = (paymentId) => {
        Swal.fire({
            title: "Payment Details",
            text: `Show details for Payment ID: ${paymentId}`,
            icon: "info",
        });
    };

    // ✅ Cancel Refund Request (if any)
    const handleCancelRefund = (paymentId) => {
        Swal.fire({
            title: "Cancel Refund Request?",
            text: "Are you sure you want to cancel this refund request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel Refund"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/user/payments/cancel-refund/${paymentId}`)
                    .then(() => {
                        setPayments(payments.map(payment =>
                            payment.payment_id === paymentId ? { ...payment, refund_status: "Refund Cancelled" } : payment
                        ));
                        Swal.fire("Cancelled!", "Refund request has been cancelled.", "success");
                    })
                    .catch(err => console.error("Error cancelling refund:", err));
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">My Payments</h3>

            {payments.length === 0 ? (
                <p className="text-gray-500 text-center">You have no payment history.</p>
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
                            <th className="p-4 border border-gray-300">Payment ID</th>
                            <th className="p-4 border border-gray-300">Booking ID</th>
                            <th className="p-4 border border-gray-300">Amount</th>
                            <th className="p-4 border border-gray-300">Payment Method</th>
                            <th className="p-4 border border-gray-300">Status</th>
                        </tr>
                    </thead>

                    {/* ✅ Table Body */}
                    <tbody>
                        {payments.map((payment, index) => (
                            <motion.tr
                                key={index}
                                className="hover:bg-gray-100 transition-all duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <td className="p-4 border border-gray-300">{payment.transaction_id}</td>
                                <td className="p-4 border border-gray-300">{payment.booking_id}</td>
                                <td className="p-4 border border-gray-300 text-green-600 font-bold">${payment.amount}</td>
                                <td className="p-4 border border-gray-300">{payment.payment_method}</td>
                                <td className="p-4 border border-gray-300 font-bold">{payment.payment_status}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            )}
        </div>
    );


};

export default MyPayments;

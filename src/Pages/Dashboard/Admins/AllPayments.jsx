import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllPayments = () => {
    const axiosPublic = useAxiosPublic();
    const [payments, setPayments] = useState([]);

    // ✅ Fetch All Payments (Admin)
    useEffect(() => {
        axiosPublic.get("/admin/payments")
            .then((res) => {
                console.log("All Payments Response:", res.data);
                setPayments(res.data.data);
            })
            .catch((error) => console.error("Error fetching payments:", error));
    }, [axiosPublic]);

    // ✅ Handle Delete Payment (Admin)
    const handleDelete = (paymentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This payment will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/admin/payments/${paymentId}`)
                    .then(() => {
                        setPayments(payments.filter(payment => payment.id !== paymentId));
                        Swal.fire("Deleted!", "Payment has been removed.", "success");
                    })
                    .catch(err => console.error("Error deleting payment:", err));
            }
        });
    };

    console.log(payments);


    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">All Payments</h3>

            {payments.length === 0 ? (
                <p className="text-gray-500 text-center">No payments found.</p>
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
                            <th className="p-4 border border-gray-300">User Name</th>
                            <th className="p-4 border border-gray-300">Amount</th>
                            <th className="p-4 border border-gray-300">Payment Method</th>
                            <th className="p-4 border border-gray-300">Status</th>
                            <th className="p-4 border border-gray-300 text-center">Actions</th>
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
                                <td className="p-4 border border-gray-300">{payment.cus_email}</td>
                                <td className="p-4 border border-gray-300 text-green-600 font-bold">${payment.amount}</td>
                                <td className="p-4 border border-gray-300">{payment.payment_method}</td>
                                <td className="p-4 border border-gray-300 font-bold">{payment.payment_status}</td>

                                <td className="p-4 border border-gray-300 text-center flex justify-center gap-4">
                                    <button
                                        onClick={() => handleDelete(payment.id)}
                                        className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
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

export default AllPayments;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../context/AuthContext";

const PaymentPage = () => {
    const { bookingId } = useParams(); // Get bookingId from URL params
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);


    console.log(user);
    const [booking, setBooking] = useState(null); // State to store booking data
    console.log('Booking ID:', bookingId); // For debugging, check the bookingId
    console.log(booking);
    // Fetch booking details when component mounts
    useEffect(() => {
        if (!bookingId) return;


        axiosPublic.get(`/bookings/details/${bookingId}`)
            .then((res) => {
                console.log(res);
                console.log("Booking Data:", res.data); // For debugging
                setBooking(res.data.data); // Set booking data from API response
            })
            .catch((error) => {
                console.error("Error fetching booking:", error);
                Swal.fire("Error", "Failed to load booking details.", "error");
            });
    }, [axiosPublic, bookingId]);

    // Handle payment initiation with SSLCommerz
    const handlePayment = () => {
        if (!booking) return;

        const paymentData = {
            booking_id: booking.booking_id,
            user_id: user?.uid,
            amount: booking.total_price,
            currency: "BDT",
            cus_name: user?.displayName || "Customer Name",
            cus_email: user?.email || "customer@example.com",
            cus_phone: booking.phone || "017XXXXXXXX",
            payment_status: 'pending'
        };

        // Send request to initiate SSLCommerz Payment
        axiosPublic.post("/sslcommerz/initiate", paymentData)
            .then((res) => {
                if (res.data?.url) {
                    console.log(res.data?.url);
                    window.location.href = res.data.url; // Redirect to SSLCommerz
                } else {
                    Swal.fire("Error", "Payment gateway initialization failed!", "error");
                }
            })
            .catch((error) => {
                console.error("Payment initialization error:", error);
                Swal.fire("Error", "Payment initialization failed!", "error");
            });
    };

    // Render loading state or booking data
    if (!booking) {
        return <p className="text-center text-gray-500">Loading booking details...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Payment for Booking</h2>

            {/* Booking Details */}
            <div className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{booking.package_title}</h3>
                <p className="text-gray-600">Travelers: {booking.num_travelers}</p>
                <p className="text-lg font-bold text-green-600">Total Amount: ৳{booking.total_price}</p>
            </div>

            {/* Pay Now Button */}
            <button
                onClick={handlePayment}
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Pay Now with SSLCommerz
            </button>
        </div>
    );
};

export default PaymentPage;

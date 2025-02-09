import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("tran_id");

    useEffect(() => {
        Swal.fire({
            title: "Payment Successful 🎉",
            text: `Your transaction ID is: ${transactionId || "N/A"}`,
            icon: "success",
            timer: 3000, // 3-second timer before redirect
            timerProgressBar: true,
            willClose: () => navigate("/dashboard/my-bookings")
        });
    }, [navigate, transactionId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-green-600">Payment Successful! ✅</h2>
                <p className="text-gray-700 mt-2">Your transaction ID: <strong>{transactionId || "N/A"}</strong></p>
                <p className="text-gray-500 mt-2">Redirecting you to your bookings...</p>
                <button 
                    onClick={() => navigate("/dashboard/my-bookings")}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Go to My Bookings
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;

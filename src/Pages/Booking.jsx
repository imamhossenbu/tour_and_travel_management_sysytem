import { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import ParallaxBanner from "../Shared/ParallaxBanner";
import bgImg from "../assets/bg-3.jpg";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaUsers, FaPhone, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

const Booking = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [travelDate, setTravelDate] = useState("");
    const [numTravelers, setNumTravelers] = useState(1);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [totalPrice, setTotalPrice] = useState(0);

    // ✅ Fetch Available Packages
    useEffect(() => {
        axiosPublic.get("/packages")
            .then((res) => setPackages(res.data.data))
            .catch((err) => console.error("Error fetching packages:", err));
    }, [axiosPublic]);

    // ✅ Handle Package Selection & Update Price
    const handlePackageChange = (e) => {
        const selectedId = e.target.value;
        const pkg = packages.find(p => p.id.toString() === selectedId);
        setSelectedPackage(pkg);
        setTotalPrice(pkg ? pkg.price * numTravelers : 0);
    };

    // ✅ Handle Number of Travelers Change
    const handleTravelersChange = (e) => {
        const count = parseInt(e.target.value);
        setNumTravelers(count);
        setTotalPrice(selectedPackage ? selectedPackage.price * count : 0);
    };

    // ✅ Handle Booking Submission & Redirect to Payment
    const handleBooking = () => {
        if (!selectedPackage || !travelDate || !phone || !email) {
            Swal.fire("Error", "All fields are required!", "error");
            return;
        }

        const bookingData = {
            userId: user?.uid,
            packageId: selectedPackage.id,
            travelDate,
            numTravelers,
            phone,
            email,
            totalPrice
        };

        axiosPublic.post("/bookings", bookingData)
            .then(() => {
                Swal.fire("Success", "Booking Confirmed! Redirecting to payment...", "success");
                setSelectedPackage(null);
                setNumTravelers(1)
                setTravelDate("")
                setPhone("")
                setTotalPrice(0);
            })
            .catch(err => console.error("Error creating booking:", err));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Helmet>
                <title>Booking || TravelGo</title>
            </Helmet>

            {/* ✅ Parallax Banner */}
            <ParallaxBanner
                backgroundImage={bgImg}
                title="Plan Your Perfect Trip"
                subtitle="Secure your dream vacation with just a few clicks. Hassle-free booking, unforgettable memories!"
                buttonText="Book Now!"
            />

            {/* ✅ Booking Section (Form on Left, Image on Right) */}
            <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* ✅ Booking Form (Left) */}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Book Your Trip</h2>

                    <div className="grid gap-4">
                        {/* Select Package */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center gap-2">
                                <FaMapMarkedAlt /> Select a Package:
                            </label>
                            <select
                                className="w-full p-3 border rounded-lg"
                                onChange={handlePackageChange}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a package...</option>
                                {packages.map((pkg) => (
                                    <option key={pkg.id} value={pkg.id}>
                                        {pkg.title} - ${pkg.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Travel Date */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center gap-2">
                                <FaCalendarAlt /> Travel Date:
                            </label>
                            <input
                                type="date"
                                className="w-full p-3 border rounded-lg"
                                value={travelDate}
                                onChange={(e) => setTravelDate(e.target.value)}
                            />
                        </div>

                        {/* Number of Travelers */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center gap-2">
                                <FaUsers /> Number of Travelers:
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border rounded-lg"
                                min="1"
                                max="10"
                                value={numTravelers}
                                onChange={handleTravelersChange}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center gap-2">
                                <FaPhone /> Phone Number:
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center gap-2">
                                <FaEnvelope /> Email Address:
                            </label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Total Price */}
                        {selectedPackage && (
                            <div className="text-lg font-bold text-green-600 bg-gray-100 p-3 rounded-lg text-center">
                                Total Price: ${totalPrice}
                            </div>
                        )}

                        {/* Book Now Button */}
                        <button
                            onClick={handleBooking}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                {/* ✅ Right Image Section */}
                <div className="hidden md:flex items-center justify-center">
                    <img
                        src={selectedPackage ? selectedPackage.image : bgImg}
                        alt="Travel Destination"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Booking;

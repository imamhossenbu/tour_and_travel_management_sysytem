import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaListAlt, FaHeart, FaHistory, FaStar, FaUsers, FaClipboardList, FaMoneyCheckAlt, FaBoxOpen, FaMapMarkerAlt, FaHome, FaSuitcase, FaBook, FaPhone, FaCalendarPlus, FaUserShield, FaUser, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isAdmin } = useAdmin();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showAdminDashboard, setShowAdminDashboard] = useState(true); // ✅ Toggle between Admin & User Dashboard

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire('Success','Log out successful','success');
                navigate('/');
            });
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Sidebar link styling with active state
    const linkClasses = ({ isActive }) =>
        isActive
            ? "flex items-center space-x-2 p-3 bg-blue-700 text-white rounded-lg"
            : "flex items-center space-x-2 p-3 hover:bg-blue-700 text-gray-300 rounded-lg";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Helmet>
                <title>Dashboard || TravelGo</title>
            </Helmet>

            {/* ✅ Sidebar for Medium to Large Screens */}
            <aside className="hidden md:flex flex-col w-64 bg-blue-900 text-white p-5 space-y-6">
                <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>

                {/* ✅ Toggle Admin/User Dashboard (Only Visible to Admins) */}
                {isAdmin && (
                    <button
                        className="flex items-center justify-center p-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => setShowAdminDashboard(!showAdminDashboard)}
                    >
                        {showAdminDashboard ? <FaUser className="mr-2" /> : <FaUserShield className="mr-2" />}
                        {showAdminDashboard ? "Go to User Dashboard" : "Go to Admin Dashboard"}
                    </button>
                )}

                {/* ✅ User Dashboard Links */}
                {!isAdmin || !showAdminDashboard ? (
                    <>
                        <h3 className="text-lg font-semibold text-gray-400 mt-4">User Links</h3>
                        <nav className="flex flex-col space-y-4">
                            <NavLink to="my-bookings" className={linkClasses}>
                                <FaListAlt />
                                <span>My Booking</span>
                            </NavLink>
                            <NavLink to="my-payments" className={linkClasses}>
                                <FaHistory />
                                <span>Payment History</span>
                            </NavLink>
                            <NavLink to="wishlist" className={linkClasses}>
                                <FaHeart />
                                <span>My Wishlist</span>
                            </NavLink>
                            <NavLink to="my-reviews" className={linkClasses}>
                                <FaStar />
                                <span>My Reviews</span>
                            </NavLink>
                        </nav>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-gray-400 mt-4">Admin Links</h3>
                        <nav className="flex flex-col space-y-4">
                            <NavLink to="users" className={linkClasses}>
                                <FaUsers />
                                <span>Users</span>
                            </NavLink>
                            <NavLink to="all-reviews" className={linkClasses}>
                                <FaClipboardList />
                                <span>All Reviews</span>
                            </NavLink>
                            <NavLink to="all-bookings" className={linkClasses}>
                                <FaClipboardList />
                                <span>All Bookings</span>
                            </NavLink>
                            <NavLink to="all-payments" className={linkClasses}>
                                <FaMoneyCheckAlt />
                                <span>All Payments</span>
                            </NavLink>
                            <NavLink to="add-packages" className={linkClasses}>
                                <FaBoxOpen />
                                <span>Add Packages</span>
                            </NavLink>
                            <NavLink to="add-destination" className={linkClasses}>
                                <FaMapMarkerAlt />
                                <span>Add Destinations</span>
                            </NavLink>
                            <NavLink to="add-itinerary" className={linkClasses}>
                                <FaCalendarPlus />
                                <span>Add Itinerary</span>
                            </NavLink>
                        </nav>
                    </>
                )}

                {/* ✅ Shared Links */}
                <h3 className="text-lg font-semibold text-gray-400">Shared Links</h3>
                <nav className="flex flex-col space-y-4">
                    <NavLink to="/" className={linkClasses}>
                        <FaHome />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/packages" className={linkClasses}>
                        <FaSuitcase />
                        <span>Packages</span>
                    </NavLink>
                    <NavLink to="/booking" className={linkClasses}>
                        <FaBook />
                        <span>Booking</span>
                    </NavLink>
                    <NavLink to="/contact" className={linkClasses}>
                        <FaPhone />
                        <span>Contact</span>
                    </NavLink>
                </nav>

                <NavLink onClick={handleLogOut} className="flex items-center space-x-2 p-3 hover:bg-red-500 text-white rounded-lg">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </NavLink>
            </aside>

            {/* ✅ Drawer for Small Screens (Now Shows All Links) */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isDrawerOpen ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-64 h-full bg-blue-900 text-white z-50 p-5 md:hidden"
            >
                <button onClick={toggleDrawer} className="text-white text-2xl absolute top-4 right-4">
                    <FaTimes />
                </button>

                {/* ✅ Admin Toggle */}
                {isAdmin && (
                    <button
                        className="flex items-center justify-center p-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition w-full mb-4"
                        onClick={() => setShowAdminDashboard(!showAdminDashboard)}
                    >
                        {showAdminDashboard ? <FaUser className="mr-2" /> : <FaUserShield className="mr-2" />}
                        {showAdminDashboard ? "Go to User Dashboard" : "Go to Admin Dashboard"}
                    </button>
                )}

                {/* ✅ All Links (Admin or User Based on Toggle) */}
                <div className="mt-10">
                    {!isAdmin || !showAdminDashboard ? (
                        <>
                            <h3 className="text-lg font-semibold text-gray-400">User Links</h3>
                            <NavLink to="my-bookings" className={linkClasses}>
                                <FaListAlt />
                                <span>My Booking</span>
                            </NavLink>
                            <NavLink to="my-payments" className={linkClasses}>
                                <FaHistory />
                                <span>Payment History</span>
                            </NavLink>
                            <NavLink to="wishlist" className={linkClasses}>
                                <FaHeart />
                                <span>My Wishlist</span>
                            </NavLink>
                            <NavLink to="my-reviews" className={linkClasses}>
                                <FaStar />
                                <span>My Reviews</span>
                            </NavLink>
                            <h3 className="text-lg font-semibold text-gray-400">Shared Links</h3>
                            <nav className="flex flex-col space-y-4">
                                <NavLink to="/" className={linkClasses}>
                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                                <NavLink to="/packages" className={linkClasses}>
                                    <FaSuitcase />
                                    <span>Packages</span>
                                </NavLink>
                                <NavLink to="/booking" className={linkClasses}>
                                    <FaBook />
                                    <span>Booking</span>
                                </NavLink>
                                <NavLink to="/contact" className={linkClasses}>
                                    <FaPhone />
                                    <span>Contact</span>
                                </NavLink>
                            </nav>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-semibold text-gray-400">Admin Links</h3>
                            <NavLink to="users" className={linkClasses}>
                                <FaUsers />
                                <span>Users</span>
                            </NavLink>
                            <NavLink to="all-reviews" className={linkClasses}>
                                <FaClipboardList />
                                <span>All Reviews</span>
                            </NavLink>
                            <NavLink to="all-bookings" className={linkClasses}>
                                <FaClipboardList />
                                <span>All Bookings</span>
                            </NavLink>
                            <NavLink to="all-payments" className={linkClasses}>
                                <FaMoneyCheckAlt />
                                <span>All Payments</span>
                            </NavLink>
                            <NavLink to="add-packages" className={linkClasses}>
                                <FaBoxOpen />
                                <span>Add Packages</span>
                            </NavLink>
                            <NavLink to="add-destination" className={linkClasses}>
                                <FaMapMarkerAlt />
                                <span>Add Destinations</span>
                            </NavLink>
                            <NavLink to="add-itinerary" className={linkClasses}>
                                <FaCalendarPlus />
                                <span>Add Itinerary</span>
                            </NavLink>
                            <h3 className="text-lg font-semibold text-gray-400">Shared Links</h3>
                            <nav className="flex flex-col space-y-4">
                                <NavLink to="/" className={linkClasses}>
                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                                <NavLink to="/packages" className={linkClasses}>
                                    <FaSuitcase />
                                    <span>Packages</span>
                                </NavLink>
                                <NavLink to="/booking" className={linkClasses}>
                                    <FaBook />
                                    <span>Booking</span>
                                </NavLink>
                                <NavLink to="/contact" className={linkClasses}>
                                    <FaPhone />
                                    <span>Contact</span>
                                </NavLink>
                            </nav>
                        </>
                    )}
                </div>
            </motion.div>

            {/* ✅ Main Content */}
            <div className="flex-1 p-4 md:p-10">
                <Outlet />
            </div>

            {/* ✅ Drawer Toggle Button for Small Screens */}
            <button onClick={toggleDrawer} className="md:hidden fixed top-4 left-4 bg-blue-900 text-white p-3 rounded-full">
                <FaBars />
            </button>
        </div>
    );
};

export default Dashboard;

import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaListAlt, FaHeart, FaHistory, FaStar, FaPlus, FaUsers, FaCommentsDollar, FaClipboardList, FaMoneyCheckAlt, FaBoxOpen, FaMapMarkerAlt, FaHome, FaSuitcase, FaBook, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isAdmin } = useAdmin();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire('Log out successful')
                navigate('/');
            })
    }

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

            {/* Sidebar for Medium to Large Screens */}
            <aside className="hidden md:flex flex-col w-64 bg-blue-900 text-white p-5 space-y-6">
                <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>

                {/* Shared Links (Visible for both Admin and User) */}

                {/* Conditionally Render User Links if not Admin */}
                {!isAdmin && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-400 mt-4">User Links</h3>
                        <nav className="flex flex-col space-y-4">
                            <NavLink to="my-bookings" className={linkClasses}>
                                <FaListAlt />
                                <span>My Booking</span>
                            </NavLink>
                            <NavLink to="payment-history" className={linkClasses}>
                                <FaHistory />
                                <span>Payment History</span>
                            </NavLink>
                            <NavLink to="wishlist" className={linkClasses}>
                                <FaHeart />
                                <span>Wishlist</span>
                            </NavLink>
                            <NavLink to="add-review" className={linkClasses}>
                                <FaPlus />
                                <span>Add Review</span>
                            </NavLink>
                            <NavLink to="my-reviews" className={linkClasses}>
                                <FaStar />
                                <span>My Reviews</span>
                            </NavLink>
                        </nav>
                    </>
                )}

                {/* Conditionally Render Admin Links if Admin */}
                {isAdmin && (
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
                            <NavLink to="all-wishlist" className={linkClasses}>
                                <FaCommentsDollar />
                                <span>All Wishlist</span>
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
                        </nav>
                    </>
                )}
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

            {/* Drawer for Small Screens */}
            <div className="md:hidden fixed top-0 left-0 w-full flex items-center p-4 bg-blue-900 text-white shadow-md">
                <button onClick={toggleDrawer} className="text-white text-2xl">
                    <FaBars />
                </button>
                <h2 className="text-lg font-bold ml-4">Dashboard</h2>
            </div>

            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isDrawerOpen ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-64 h-full bg-blue-900 text-white z-50 p-5 md:hidden"
            >
                <button onClick={toggleDrawer} className="text-white text-2xl absolute top-4 right-4">
                    ×
                </button>
                {!isAdmin && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-400 mt-4">User Links</h3>
                        <nav className="flex flex-col space-y-4">
                            <NavLink to="my-bookings" className={linkClasses}>
                                <FaListAlt />
                                <span>My Booking</span>
                            </NavLink>
                            <NavLink to="payment-history" className={linkClasses}>
                                <FaHistory />
                                <span>Payment History</span>
                            </NavLink>
                            <NavLink to="wishlist" className={linkClasses}>
                                <FaHeart />
                                <span>Wishlist</span>
                            </NavLink>
                            <NavLink to="add-review" className={linkClasses}>
                                <FaPlus />
                                <span>Add Review</span>
                            </NavLink>
                            <NavLink to="my-reviews" className={linkClasses}>
                                <FaStar />
                                <span>My Reviews</span>
                            </NavLink>
                        </nav>
                    </>
                )}

                {isAdmin && (
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
                            <NavLink to="all-wishlist" className={linkClasses}>
                                <FaCommentsDollar />
                                <span>All Wishlist</span>
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
                        </nav>
                    </>
                )}

                <h3 className="text-lg font-semibold text-gray-400">Shared Links</h3>
                <nav className="flex flex-col space-y-4 mt-10">
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
            </motion.div>

            {/* Main Content with Outlet */}
            <div className="flex-1 p-4 md:p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

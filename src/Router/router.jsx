import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Packages from "../Pages/Packages";
import Booking from "../Pages/Booking";
import Contact from "../Pages/Contact";
import ErrorPage from "../Pages/ErrorPage";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import Dashboard from "../Root/Dashboard/Dashboard";
import DestinationDetails from "../Pages/DestinationDetails";
import PackageDetails from "../Pages/PackageDetails";
import PaymentPage from "../Pages/Dashboard/PaymentPage";

// 🔹 User Routes
import MyWishList from "../Pages/Dashboard/Users/MyWishList";
import MyReviews from "../Pages/Dashboard/Users/MyReviews";
import MyBookings from "../Pages/Dashboard/Users/MyBookings";
import MyPayments from "../Pages/Dashboard/Users/MyPayments";

// 🔹 Admin Routes
import AllUsers from "../Pages/Dashboard/Admins/AllUsers";
import AddDestination from "../Pages/Dashboard/Admins/AddDestination";
import AddPackages from "../Pages/Dashboard/Admins/AddPackages";
import AddItinerary from "../Pages/Dashboard/Admins/AddItinerary";
import AllReviews from "../Pages/Dashboard/Admins/AllReviews";
import AllBookings from "../Pages/Dashboard/Admins/AllBookings";
import AllPayments from "../Pages/Dashboard/Admins/AllPayments";

// 🔥 Protected Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute"; // 🔹 New Admin Route
import PaymentSuccess from "../Pages/PaymentSuccess";
import WishlistBook from "../Pages/Dashboard/Users/WishlistBook";
import AllMessages from "../Pages/Dashboard/Admins/AllMessages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/packages", element: <Packages /> },
            { path: "/booking", element: <Booking /> },
            { path: "/contact", element: <Contact /> },
            { path: "/destination-details/:id", element: <DestinationDetails /> },
            {path:'/payment-success',element:<PaymentSuccess></PaymentSuccess>},
            {
                path: "/package-details/:id",
                element: <PrivateRoute><PackageDetails /></PrivateRoute>, // 🔒 Protected Route
            },
            { path: "/sign-up", element: <SignUp /> },
            { path: "/login", element: <LogIn /> },
            {
                path: "/payment/:bookingId",
                element: <PrivateRoute><PaymentPage /></PrivateRoute>, // 🔒 User Only
            },
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>, // 🔒 User Dashboard Protected
        children: [
            { path: "wishlist", element: <MyWishList /> },
            { path: "my-reviews", element: <MyReviews /> },
            { path: "my-bookings", element: <MyBookings /> },
            { path: "my-payments", element: <MyPayments /> },
            {path:'wishlist-book/:id',element:<WishlistBook></WishlistBook>},

            // 🔥 Admin Routes - Only Accessible to Admins
            {
                path: "users",
                element: <AdminRoute><AllUsers /></AdminRoute>,
            },
            {
                path: "all-bookings",
                element: <AdminRoute><AllBookings /></AdminRoute>,
            },
            {
                path: "add-destination",
                element: <AdminRoute><AddDestination /></AdminRoute>,
            },
            {
                path: "add-packages",
                element: <AdminRoute><AddPackages /></AdminRoute>,
            },
            {
                path: "add-itinerary",
                element: <AdminRoute><AddItinerary /></AdminRoute>,
            },
            {
                path: "all-reviews",
                element: <AdminRoute><AllReviews /></AdminRoute>,
            },
            {
                path: "all-payments",
                element: <AdminRoute><AllPayments /></AdminRoute>,
            },
            {
                path: "all-messages",
                element: <AdminRoute><AllMessages /></AdminRoute>,
            },
        ],
    },
]);

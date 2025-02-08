import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from '../Pages/Home';
import Packages from '../Pages/Packages';
import Booking from '../Pages/Booking';
import Contact from '../Pages/Contact';
import ErrorPage from "../Pages/ErrorPage";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import Dashboard from "../Root/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/Admins/AllUsers";
import AddDestination from "../Pages/Dashboard/Admins/AddDestination";
import AddPackages from "../Pages/Dashboard/Admins/AddPackages";
import DestinationDetails from "../Pages/DestinationDetails";
import AddItinerary from "../Pages/Dashboard/Admins/AddItinerary";
import PackageDetails from "../Pages/PackageDetails";
import AllReviews from "../Pages/Dashboard/Admins/AllReviews";
import MyWishList from "../Pages/Dashboard/Users/MyWishList";
import MyReviews from "../Pages/Dashboard/Users/MyReviews";
import MyBookings from "../Pages/Dashboard/Users/MyBookings";
import AllBookings from "../Pages/Dashboard/Admins/AllBookings";
import PaymentPage from "../Pages/Dashboard/PaymentPage";
import AllPayments from "../Pages/Dashboard/Admins/AllPayments";
import MyPayments from "../Pages/Dashboard/Users/MyPayments";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/packages',
                element: <Packages></Packages>
            },
            {
                path: '/booking',
                element: <Booking></Booking>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/destination-details/:id',
                element: <DestinationDetails></DestinationDetails>
            },
            {
                path:'/package-details/:id',
                element:<PackageDetails></PackageDetails>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path:'/payment/:bookingId',
                element:<PaymentPage></PaymentPage>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path:'wishlist',
                element:<MyWishList></MyWishList>
            },
            {
                path:'my-reviews',
                element:<MyReviews></MyReviews>
            },
            {
                path:'my-bookings',
                element:<MyBookings></MyBookings>
            },
            {
                path:'my-payments',
                element:<MyPayments></MyPayments>
            },
           
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
            {
                path:'all-bookings',
                element:<AllBookings></AllBookings>
            },
            {
                path: 'add-destination',
                element: <AddDestination></AddDestination>
            },
            {
                path: 'add-packages',
                element: <AddPackages></AddPackages>
            },
            {
                path:'add-itinerary',
                element:<AddItinerary></AddItinerary>
            },
            {
                path:'all-reviews',
                element:<AllReviews></AllReviews>
            },
            {
                path:'all-payments',
                element:<AllPayments></AllPayments>
            }
          
        ]
    }
])
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
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'users',
                element: <AllUsers></AllUsers>
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
            }
          
        ]
    }
])
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
                    <Skeleton height={40} width={400} />
                    <Skeleton height={40} width={400} />
                    <Skeleton height={40} width={400} />
                    <Skeleton height={40} width={400} />
                    <Skeleton height={40} width={400} />
                    <Skeleton height={30} width={400} />
                    <Skeleton height={30} width={400} />
                    <Skeleton height={30} width={400} />
                </div>
            </div>
        );
    }

    return user ? children : null; // Render children if user is authenticated
};

export default PrivateRoute;

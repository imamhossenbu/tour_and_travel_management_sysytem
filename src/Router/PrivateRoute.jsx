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
            <div className="max-w-4xl mx-auto p-6">
                <Skeleton height={40} width={200} />
                <Skeleton height={30} count={3} />
            </div>
        );
    }

    return user ? children : null; // Render children if user is authenticated
};

export default PrivateRoute;

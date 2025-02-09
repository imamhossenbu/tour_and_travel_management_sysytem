/* eslint-disable react/prop-types */
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
   const {isAdmin} = useAdmin();
    const navigate = useNavigate();


    // ✅ If still loading, show skeleton UI
    if (loading || isAdmin === null) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Skeleton height={40} width={200} />
                <Skeleton height={30} count={3} />
            </div>
        );
    }

    // ✅ If not an admin, redirect to home
    if (!isAdmin && !user) {
        navigate("/");
        return null;
    }

    return children;
};

export default AdminRoute;

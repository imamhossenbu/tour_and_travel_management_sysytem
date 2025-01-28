import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen pt-20"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Root;
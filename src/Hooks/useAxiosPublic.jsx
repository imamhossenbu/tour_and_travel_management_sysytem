import axios from "axios";

const baseURL = import.meta.env.MODE === "production"
    ? "https://tour-and-travel-server-u4mq.vercel.app"
    : "http://localhost:5000";

const axiosPublic = axios.create({
    baseURL
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

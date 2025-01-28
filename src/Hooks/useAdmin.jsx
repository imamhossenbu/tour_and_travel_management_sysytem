import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosPublic
        .get(`/users/isAdmin/${user.email}`)
        .then((res) => {
          if (res.data.isAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((err) => {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [axiosPublic, user?.email]);

  return { isAdmin, loading };
};

export default useAdmin;

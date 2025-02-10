import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom"; // ✅ Redirect to payment page

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); // ✅ For redirecting to the payment page

  // ✅ Fetch wishlist from backend
  useEffect(() => {
    axiosPublic
      .get(`/cart/${user?.uid}`)
      .then((res) => {
        console.log("Wishlist Response:", res.data); // ✅ Debugging output
        setWishlist(res.data.data); // ✅ Ensure we use `res.data.data`
      })
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [axiosPublic, user?.uid]);

  console.log(wishlist);

  // ✅ Handle delete wishlist item
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/wishlist/${id}`)
          .then(() => {
            setWishlist(wishlist.filter((item) => item.wishlist_id !== id));
            Swal.fire("Removed!", "Item removed from wishlist.", "success");
          })
          .catch((err) => console.error("Error deleting wishlist item:", err));
      }
    });
  };

  // ✅ Handle payment redirection
  const handleBook = (id) => {
    Swal.fire({
      title: "Proceed to Book?",
      text: `You are about to book this package.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Book Now",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/wishlist-book/${id}`); // ✅ Pass package ID
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Wishlist Title */}
      <h3 className="text-2xl font-bold text-center mb-6">My Wishlist</h3>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          Your wishlist is empty.
        </p>
      ) : (
        <motion.table
          className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Table Header with Background Color */}
          <thead className="bg-indigo-600 text-white">
            <tr className="text-left">
              <th className="p-4 border border-gray-300 text-center">Image</th>
              <th className="p-4 border border-gray-300">Wishlist Item</th>
              <th className="p-4 border border-gray-300">Price</th>
              <th className="p-4 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {wishlist.map((item, index) => (
              <motion.tr
                key={index}
                className="hover:bg-gray-100 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Item Image */}
                <td className="p-4 border border-gray-300 text-center">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg mx-auto object-cover shadow-md"
                  />
                </td>

                {/* Wishlist Item Name */}
                <td className="p-4 border border-gray-300">
                  {item.title || "No title available"}
                </td>

                {/* Price */}
                <td className="p-4 border border-gray-300">
                  ${item.price || "N/A"}
                </td>

                {/* Actions: Payment & Delete */}
                <td className="p-4 border border-gray-300 text-center flex justify-center gap-4">
                  {/* Pay Now Button */}
                  <button
                    onClick={() => handleBook(item.package_id)}
                    className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-green-600 font-semibold transition flex items-center gap-2"
                  >
                    Book Now
                  </button>

                  {/* Delete Button (Icon Only) */}
                  <button
                    onClick={() => handleDelete(item.wishlist_id)}
                    className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
};

export default MyWishList;

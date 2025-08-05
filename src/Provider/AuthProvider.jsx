/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for auth
    const [wishlist, setWishlist] = useState([]); // Initial state is an empty array
    const axiosPublic = useAxiosPublic();

    // Fetch Wishlist
    const fetchWishlist = (userId) => {
        if (userId) {
            axiosPublic.get(`/wishlist/${userId}`)
                .then((res) => {
                    // Assuming your backend returns { success: true, data: [...] }
                    if (res.data) {
                        console.log(res.data);
                        setWishlist(res.data); // Correctly set the array from the 'data' property
                    } else {
                        console.warn("Unexpected wishlist data format or empty data:", res.data);
                        setWishlist([]); // Fallback to empty array if data format is unexpected
                    }
                })
                .catch((error) => {
                    console.error("Error fetching wishlist:", error);
                    setWishlist([]); // Set to empty array on error to prevent issues
                });
        } else {
            setWishlist([]); // Clear wishlist if no user ID is present
        }
    };

    // Add to Wishlist
    const addToWishlist = (packageId) => {
        if (!user?.uid) {
            Swal.fire("Login Required", "Please log in to add items to your wishlist.", "info");
            return;
        }

        const wishlistData = { uid: user?.uid };
        axiosPublic.post(`/wishlist/${packageId}`, wishlistData)
            .then((res) => {
                // Assuming the backend returns the newly added item or a success message
                // You might need to re-fetch the entire wishlist or add the item to the current state
                if (res.data.success) {
                    // Re-fetch to ensure the most accurate list
                    fetchWishlist(user.uid);
                    Swal.fire("Added!", "Item added to wishlist.", "success");
                }
            })
            .catch((err) => {
                console.error("Error adding to wishlist:", err);
                Swal.fire("Error", "Failed to add item to wishlist.", "error");
            });
    };

    // Handle Delete Wishlist Item
    const handleDelete = (id) => {
        console.log("Attempting to delete wishlist item with ID:", id);
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
                        // Filter out the deleted item from the current wishlist state
                        setWishlist(wishlist.filter((item) => item.wishlist_id !== id));
                        fetchWishlist(user.uid)
                        Swal.fire("Removed!", "Item removed from wishlist.", "success");
                    })
                    .catch((err) => {
                        console.error("Error deleting wishlist item:", err);
                        Swal.fire("Error", "Failed to remove item from wishlist.", "error");
                    });
            }
        });
    };

    // Firebase onAuthStateChanged to handle session persistence and initial wishlist fetch
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Stop loading once authentication state is checked
            if (currentUser) {
                // Fetch wishlist only if a user is logged in
                fetchWishlist(currentUser.uid);
            } else {
                // Clear wishlist if no user is logged in
                setWishlist([]);
            }
        });

        // Cleanup the listener when component is unmounted
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency ensures this runs only once on mount

    // Log in User
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
    };

    // Sign up User
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
    };

    // Update User Profile
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    };

    // Log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth).finally(() => {
            setLoading(false);
            setWishlist([]); // Clear wishlist on logout
        });
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).finally(() => setLoading(false));
    };

    // GitHub Sign In
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider).finally(() => setLoading(false));
    };

    const userInfo = {
        user,
        loading,
        loginUser,
        signUp,
        logOut,
        googleSignIn,
        githubLogin,
        updateUser,
        wishlist, // Make sure wishlist is provided to the context
        addToWishlist,
        handleDelete
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

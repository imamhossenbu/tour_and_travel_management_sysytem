/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for auth
    const [carts, setCarts] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetch Wishlist
    const fetchWishlist = (userId) => {
        if (userId) {
            axiosPublic.get(`/wishlist/${userId}`)
                .then((res) => setCarts(res.data))
                .catch((error) => console.error("Error fetching wishlist:", error));
        }
    };

    // Add to Wishlist
    const addToWishlist = (packageId) => {
        if (!user?.uid) return;

        const wishlistData = { uid: user?.uid };
        axiosPublic.post(`/wishlist/${packageId}`, wishlistData)
            .then(() => {
                setCarts([...carts, { id: packageId, uid: user?.uid }]);
            })
            .catch((err) => console.error("Error adding to wishlist:", err));
    };

    useEffect(() => {
        if (user?.uid) {
            fetchWishlist(user.uid);
        }
    }, [user?.uid]);

    // Log in User
    const loginUser = (email, password) => {
        setLoading(true); // Start loading while logging in
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); // Stop loading after login
    };

    // Sign up User
    const signUp = (email, password) => {
        setLoading(true); // Start loading while signing up
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); // Stop loading after sign up
    };

    // Update User Profile
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    };

    // Log out
    const logOut = () => {
        setLoading(true); // Start loading while logging out
        return signOut(auth)
            .finally(() => setLoading(false)); // Stop loading after logout
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true); // Start loading while signing in with Google
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false)); // Stop loading after Google sign in
    };

    // GitHub Sign In
    const githubLogin = () => {
        setLoading(true); // Start loading while signing in with GitHub
        return signInWithPopup(auth, githubProvider)
            .finally(() => setLoading(false)); // Stop loading after GitHub sign in
    };

    // Firebase onAuthStateChanged to handle session persistence
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Stop loading once authentication state is checked
        });

        // Cleanup the listener when component is unmounted
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency ensures this runs only once on mount

    const userInfo = {
        user,
        loading, // Provide loading state to context
        loginUser,
        signUp,
        logOut,
        googleSignIn,
        githubLogin,
        updateUser,
        addToWishlist,
        carts
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

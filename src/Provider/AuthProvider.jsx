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
    const [carts ,setCarts] = useState([]);
    const axiosPublic = useAxiosPublic();


    const fetchWishlist = (userId) => {
        if (userId) {
            axiosPublic.get(`/wishlist/${userId}`)
                .then((res) => setCarts(res.data))
                .catch((error) => console.error("Error fetching wishlist:", error));
        }
    };

    // ✅ Add to wishlist and update state immediately
    const addToWishlist = (packageId) => {
        if (!user?.uid) return;

        const wishlistData = { uid: user?.uid };

        axiosPublic.post(`/wishlist/${packageId}`, wishlistData)
            .then(() => {
                setCarts([...carts, { id: packageId, uid: user?.uid }]); // ✅ Update UI instantly
            })
            .catch((err) => console.error("Error adding to wishlist:", err));
    };

    useEffect(() => {
        if (user?.uid) {
            fetchWishlist(user.uid);
        }
    }, [user?.uid]);


    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const updateUser = (name, photo) => {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            });
    }


    const logOut = () => {
        return signOut(auth);
    }


    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })


        return () => {
            unsubscribe();
        }
    }, [])



    const userInfo = {
        user,
        loginUser,
        signUp,
        logOut,
        googleSignIn,
        githubLogin,
        updateUser,
        addToWishlist,
        carts
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
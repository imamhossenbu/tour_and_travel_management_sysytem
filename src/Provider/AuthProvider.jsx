/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


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
        updateUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
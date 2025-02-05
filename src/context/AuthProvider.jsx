import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateInfo = async (obj) => {
        if (!auth.currentUser) return Promise.reject("Current user not matched");
        await updateProfile(auth.currentUser, obj);
        await auth.currentUser.reload();

        const updatedUser = { ...auth.currentUser };
        setUser(updatedUser);
        const newUser = {
            email: updatedUser.email,
            username: updatedUser.displayName,
            role: 'general',
            isPremium: false,
        };

        const response = await axios.post('https://griho-bandhan-server.vercel.app/users', newUser);
        console.log('User saved to backend:', response.data);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const provider = new GoogleAuthProvider();
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser) {
                setUser(currentUser);
                console.log(currentUser)

                if (currentUser.displayName) {
                    const newUser = {
                        email: currentUser.email,
                        username: currentUser.displayName,
                        role: "general",
                        isPremium: false
                    };
                    const response = await axios.post('https://griho-bandhan-server.vercel.app/users', newUser);
                    console.log("User saved to backend:", response.data);
                }

                axios.post('https://griho-bandhan-server.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        setLoading(false);
                    })

            } else {
                axios.post('https://griho-bandhan-server.vercel.app/logout', {}, {
                    withCredentials: true
                }).then(res => {
                    console.log(res.data);
                    setLoading(false);
                });
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, createUser, updateInfo, loginUser, googleSignin, logOut, setRole, role }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;

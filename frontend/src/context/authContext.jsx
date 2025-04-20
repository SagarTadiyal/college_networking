import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    // auto-check session on app load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("http://localhost:3000/auth/session", {
                    credentials: "include",
                });

                if (res.status === 401) {
                    setUser(null);
                } else {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (err) {
                console.log(err.message)
                setUser(null);
            }
        };

        checkSession();
    }, []);

    const logout = async (navigate) => {
        try {
            const res = await fetch("http://localhost:3000/user/logout", {
                credentials: "include",
            });
            console.log(res)
            const data = await res.json();
            if (data.success) {
                setUser(null);
                toast.success(data.message);
                navigate('/login')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const login = (email, password, navigate) => {
        axios.defaults.withCredentials = true;
        axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
            email,
            password
        }).then((res) => {
            if (res.data.success) {
                setUser(res.data.user)
                toast.success(res.data.message);
                navigate('/')
            } else {
                toast.error(res.data.error)
            }

        }).catch((error) => {
            console.log(error.message)
        })
    }

    const signup = (username, email, password, navigate) => {
        axios.defaults.withCredentials = true;
        axios.post(`${import.meta.env.VITE_API_URL}/user/create`, {
            username,
            email,
            password,
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    navigate('/login')
                } else {
                    toast.error(res.data.error)
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <AuthContext.Provider value={{ user, setUser, logout, login, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };
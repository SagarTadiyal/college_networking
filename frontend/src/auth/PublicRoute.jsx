import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    // const isAuthenticated = !!localStorage.getItem("authToken");
    const { user } = useContext(AuthContext)

    return !user ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRoute;
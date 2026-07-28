import React, { createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider =({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [justLoggedOut, setJustLoggedOut] = useState(false);

    // 🔥 IMPORTANT: run on first load (refresh fix)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false); 
    }, []);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        // setJustLoggedOut(true);

        // navigate('/');
        setTimeout(() => {
        navigate("/");
    }, 0);
    }

    return (
        <AuthContext.Provider value={{token, user, isAuthenticated, loading,  login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
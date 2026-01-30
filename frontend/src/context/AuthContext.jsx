import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    // const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        if(savedUser && accessToken) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", {email, password});
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("accessToken", res.data.accessToken);

            return res.data.user;
            // navigate("/");
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        // navigate("/login");
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
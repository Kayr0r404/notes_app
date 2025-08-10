import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/token/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const userData = await response.json();
            console.log('here',userData)
            setAuthUser(userData);
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError(err.message || "An error occurred during login");
            setIsAuthenticated(false);
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            setIsAuthenticated(false);
            setAuthUser(null);
            setError(null);
            navigate("/notes")
        } catch (err) {
            setError(err.message || "An error occurred during logout");
        } finally {
            setLoading(false);
        }
    };

    const values = {
        isAuthenticated,
        authUser,
        setAuthUser,
        login,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

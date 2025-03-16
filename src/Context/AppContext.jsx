import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    const getUser = async () => {
        try {
            const res = await axios.get('https://api.cloudwavproduction.com/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: false, 
            });
            setUser(res.data);
            setAuthError(null);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
            setAuthError('فشل في جلب بيانات المستخدم.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, isLoading, authError }}>
            {children}
        </AppContext.Provider>
    );
}
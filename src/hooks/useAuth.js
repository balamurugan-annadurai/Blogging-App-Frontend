import { useState, useEffect } from 'react';
import authService from '../lib/services/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                setUser(null);
                localStorage.removeItem("user");
                setLoading(false);
                return;
            }

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            try {
                const response = await authService.verify();
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } catch (error) {
                console.error("Token verification failed:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [token]);

    return { user, loading };
};

export default useAuth;

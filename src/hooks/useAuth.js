import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             setUser(null);
    //             setLoading(false);
    //             return;
    //         }

    //         try {
    //             const response = await axios.get('/api/auth/verify', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setUser(response.data.user); // assuming API returns { user: {...} }
    //         } catch (err) {
    //             console.error('Token verification failed:', err);
    //             localStorage.removeItem('token');
    //             setUser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     verifyToken();
    // }, []);

    return { user, loading, isAuthenticated: !!user };
};

export default useAuth;

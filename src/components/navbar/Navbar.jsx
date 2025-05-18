import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from './../../lib/services/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [activeLink, setActiveLink] = useState("blogs");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyToken = async () => {
            const user = localStorage.getItem("user");
            if (!token) {
                setUser(null);
                if (user) localStorage.removeItem("user");
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
            } catch (err) {
                console.error("Token verification failed:", err);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            }
        };

        verifyToken();
    }, [token]);

    // Detect active link from URL path
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/blogs')) setActiveLink("blogs");
        else if (path.startsWith('/myblogs')) setActiveLink("myblogs");
        else if (path.startsWith('/create')) setActiveLink("create");
        else setActiveLink("");
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate('/login');
        setMenuOpen(false);
    };

    const linkClass = (id) => {
        const isActive = activeLink === id;
        return `
            relative px-3 py-1 rounded-md font-semibold 
            transition-all duration-300 ease-in-out
            ${isActive ? "bg-[#08436B] text-white shadow-lg" : "text-[#08436B] hover:text-[#08436B]"}
            focus:outline-none no-underline
        `;
    };

    return (
        <header>
            <nav className="flex justify-between items-center px-6 md:px-24 py-4 bg-white shadow-md relative">
                <div className="cursor-pointer flex items-center">
                    <h1
                        onClick={() => {
                            navigate('/');
                            setMenuOpen(false);
                        }}
                        className="text-xl font-bold text-[#08436B]"
                    >
                        Blog App
                    </h1>
                </div>

                {/* Hamburger for mobile */}
                <div className="md:hidden">
                    <button
                        aria-label="Toggle Menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-[#08436B] text-3xl focus:outline-none"
                    >
                        <i className='bx bx-menu'></i>
                    </button>
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-12 items-center list-none m-0 p-0 font-semibold">
                    {user ? (
                        <>
                            <li>
                                <Link to="/blogs" className={linkClass("blogs")}>Blogs</Link>
                            </li>
                            <li>
                                <Link to="/myblogs" className={linkClass("myblogs")}>My Blogs</Link>
                            </li>
                            <li>
                                <Link to="/create" className={linkClass("create")}>Create Blog</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="bg-[#08436B] text-white px-4 py-1 rounded-md shadow-lg">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="bg-[#08436B] text-white px-4 py-2 rounded-md no-underline">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="bg-[#08436B] text-white px-4 py-2 rounded-md no-underline">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Sidebar */}
                <div className={`
                    fixed top-0 left-0 h-full w-64 bg-[#08436B] text-white transform
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
                    transition-transform duration-300 ease-in-out
                    z-50 flex flex-col p-6
                `}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-white text-3xl focus:outline-none"
                        >
                            <i className="bx bx-x"></i>
                        </button>
                    </div>

                    <ul className="flex flex-col gap-6 text-lg font-semibold">
                        {user ? (
                            <>
                                <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
                                <li><Link to="/myblogs" onClick={() => setMenuOpen(false)}>My Blogs</Link></li>
                                <li><Link to="/create" onClick={() => setMenuOpen(false)}>Create Blog</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="bg-white text-[#08436B] px-4 py-2 rounded-md mt-6">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                                <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Overlay */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                )}
            </nav>
        </header>
    );
};

export default Navbar;

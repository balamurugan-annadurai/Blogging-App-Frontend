import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    // Simulate login state (replace with real auth logic/context)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();

    const linkClass = (id) => {
        const isActive = activeLink === id;
        return `
      relative px-[10px] py-[3px] rounded-[5px] font-[600] 
      transition-all duration-300 ease-in-out
      ${isActive
                ? "bg-[#08436B] text-[#ffffff] shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
                : "text-current"
            }
      focus:outline-none no-underline
    `;
    };

    const handleLogout = () => {
        // Your logout logic here (clear tokens, etc)
        setIsLoggedIn(false);
        setActiveLink(""); // reset active link
        navigate('/login'); // redirect to login page
    };

    return (
        <header>
            <nav className="flex justify-between items-center px-[30px] md:px-[100px] py-[30px]">
                {/* Logo */}
                <div className="cursor-pointer flex items-center">
                    <h1 className="text-[20px] font-bold text-[#08436B]">Blog App</h1>
                </div>

                {/* Nav Links based on login */}
                {isLoggedIn ? (
                    <>
                        <ul
                            className="text-[20px] flex gap-[50px] items-center list-none p-0 m-0 text-[#08436B]"
                            style={{ fontWeight: "600" }}
                        >
                            <li>
                                <Link
                                    to="/blogs"
                                    onClick={() => setActiveLink("home")}
                                    className={linkClass("home")}
                                >
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/myblogs"
                                    onClick={() => setActiveLink("about")}
                                    className={linkClass("about")}
                                >
                                    My Blogs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/create"
                                    onClick={() => setActiveLink("products")}
                                    className={linkClass("products")}
                                >
                                    Create Blog
                                </Link>
                            </li>
                        </ul>

                        <button
                            onClick={handleLogout}
                            className="bg-[#08436B] text-[#ffffff] shadow-[0_10px_25px_rgba(0,0,0,0.3)] px-[13px] py-[5px] rounded-[5px] cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex gap-6">
                        <Link
                            to="/login"
                            className="bg-[#08436B] text-[#ffffff] px-[13px] py-[5px] rounded-[5px] font-[600] no-underline"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-[#08436B] text-[#ffffff] px-[13px] py-[5px] rounded-[5px] font-[600] no-underline"
                        >
                            Signup
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;

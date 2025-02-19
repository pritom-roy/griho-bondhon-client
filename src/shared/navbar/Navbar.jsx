import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const location = useLocation().pathname;

    return (
        <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow">
            <div className="md:w-10/12 mx-auto">
                <div className="px-4 flex items-center justify-between h-16">
                    <div className="text-2xl font-bold flex items-center gap-1">
                        <img src="/logo.png" alt="logo" className="h-7" />
                        <Link to="/home">
                            <span className="text-primary">Griho</span>Bondhon
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/home" className={`hover:text-primary ${location === '/home' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <Link to="/biodatas" className={`hover:text-primary ${location === '/biodatas' ? 'active' : ''}`}>
                            Biodatas
                        </Link>
                        <Link to="/aboutus" className={`hover:text-primary ${location === '/aboutus' ? 'active' : ''}`}>
                            About Us
                        </Link>
                        <Link to="/contactus" className={`hover:text-primary ${location === '/contactus' ? 'active' : ''}`}>
                            Contact Us
                        </Link>
                        {user ? (
                            <Link to="/dashboard" className={`hover:text-primary ${location === '/dashboard' ? 'active' : ''}`}>
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className={`border-x-2 px-3 hover:text-primary ${location === '/login' ? 'active' : ''}`}>
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none text-gray-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden bg-gray-700 absolute left-0 right-0 z-10 transition-all duration-500 transform overflow-hidden ${isOpen ? "translate-y-0 opacity-100 max-h-screen" : "-translate-y-full opacity-0 max-h-0"
                        }`}
                >
                    <Link
                        to="/home"
                        onClick={closeMenu}
                        className={`hover:text-primary block px-7 py-2 ${location === '/home' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/biodatas"
                        onClick={closeMenu}
                        className={`hover:text-primary block px-7 py-2 ${location === '/biodatas' ? 'active' : ''}`}
                    >
                        Biodatas
                    </Link>
                    <Link
                        to="/aboutus"
                        onClick={closeMenu}
                        className={`hover:text-primary block px-7 py-2 ${location === '/aboutus' ? 'active' : ''}`}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactus"
                        onClick={closeMenu}
                        className={`hover:text-primary block px-7 py-2 ${location === '/contactus' ? 'active' : ''}`}
                    >
                        Contact Us
                    </Link>
                    {user ? (
                        <Link
                            to="/dashboard"
                            onClick={closeMenu}
                            className={`hover:text-primary block px-7 py-2 ${location === '/dashboard' ? 'active' : ''}`}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className={`border-x-2 hover:text-primary block px-7 py-2 ${location === '/login' ? 'active' : ''}`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <img src="/logo.png" alt="logo" className="h-14" />
                <h1 className="text-3xl font-bold text-center mb-4"><span className="text-primary">Griho</span>Bondhon</h1>
                <p className="text-base md:text-lg text-center mb-4">
                    Your trusted partner in bringing families together. Find your perfect match today.
                </p>

                <div className="text-center mb-4">
                    <p className="text-sm">1234 Love Lane, Family Town, Country</p>
                    <p className="text-sm">
                        Phone:{" "}
                        <a href="tel:+1234567890" className="text-blue-400">
                            +1 234 567 890
                        </a>
                    </p>
                </div>

                <div className="flex justify-center space-x-6 mb-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                    >
                        <FaFacebook size={30} />
                    </a>
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                    >
                        <BsTwitterX size={30} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                    >
                        <FaInstagram size={30} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                    >
                        <FaLinkedin size={30} />
                    </a>
                </div>

                <div className="text-sm text-center mb-4">
                    <Link to="/home" className={` hover:text-primary mx-2 ${location == '/home' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/biodatas" className={` hover:text-primary mx-2 ${location == '/biodatas' ? 'active' : ''}`}>
                        Biodatas
                    </Link>
                    <Link to="/aboutus" className={` hover:text-primary mx-2 ${location == '/aboutus' ? 'active' : ''}`}>
                        About Us
                    </Link>
                    <Link to="/contactus" className={` hover:text-primary mx-2 ${location == '/contactus' ? 'active' : ''}`}>
                        Contact Us
                    </Link>
                </div>

                <div className="text-xs text-center text-gray-400">
                    &copy; 2025 Grihobondhon. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

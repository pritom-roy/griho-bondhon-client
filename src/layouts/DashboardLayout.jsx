import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaUser, FaSignOutAlt, FaEnvelope, FaBars, FaTimes, FaBook, FaInfoCircle, FaHeart, FaUserEdit, FaFileAlt, FaUsers, FaCheck, FaClipboardList } from "react-icons/fa";
import { BiSolidBookHeart } from "react-icons/bi";

const DashboardLayout = () => {
    const { logOut, role, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogOut = () => {
        navigate("/home")
        logOut()
            .then(() => navigate("/home"))
            .catch(error => console.log("Error logging out:", error.message));
    };

    const menuItems = (
        <>
            {role === 'admin' ? (
                <>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/admin-dashboard' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="admin-dashboard">
                        <FaUser className="mr-2" /> Admin Dashboard
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/manage-user' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="manage-user">
                        <FaUsers className="mr-2" /> Manage Users
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/approve-premium' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="approve-premium">
                        <FaCheck className="mr-2" /> Approve Premium
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/approve-request' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="approve-request">
                        <FaClipboardList className="mr-2" /> Approve Requests
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/success-story-admin' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="success-story-admin">
                        <FaHeart className="mr-2" /> Success Stories
                    </Link>
                </>
            ) : (
                <>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/edit-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="edit-data">
                        <FaUserEdit className="mr-2" /> Edit Biodata
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/view-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="view-data">
                        <FaFileAlt className="mr-2" /> View Biodata
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/contact-request' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="contact-request">
                        <FaEnvelope className="mr-2" /> My Contact Requests
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/favourite-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="favourite-data">
                        <FaHeart className="mr-2" /> Favourite Biodata
                    </Link>
                    <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/dashboard/success-story-user' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="success-story-user">
                        <BiSolidBookHeart className="mr-2" /> Success Story
                    </Link>
                </>
            )}

            <hr className="my-2" />

            <Link className={`flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-white`} to="/home">
                <FaHome className="mr-2" /> Home
            </Link>
            <Link className={`flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-white`} to="/biodatas">
                <FaBook className="mr-2" /> Biodatas
            </Link>
            <Link className={`flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-white`} to="/aboutus">
                <FaInfoCircle className="mr-2" /> About Us
            </Link>
            <Link className={`flex items-center px-4 py-2 rounded-md hover:bg-primary hover:text-white`} to="/contactus">
                <FaEnvelope className="mr-2" /> Contact Us
            </Link>

            <button onClick={handleLogOut} className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-primary hover:text-white">
                <FaSignOutAlt className="mr-2" /> Logout
            </button>
        </>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Sidebar for Desktop */}
            <aside className="w-64 bg-white shadow-lg p-5 hidden md:block h-screen fixed">
                <h2 className="text-2xl font-semibold text-center text-primary mb-5">Dashboard</h2>
                <nav className="flex flex-col space-y-2">
                    {menuItems}
                </nav>
            </aside>

            {/* Mobile Navbar */}
            <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            {menuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-64 bg-white shadow-lg p-5 z-50">
                    <nav className="flex flex-col space-y-2">
                        {menuItems}
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-2 w-full h-screen overflow-y-auto md:ml-64">
                {/* Top Bar */}
                <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-md mb-2">
                    <h1 className="text-xl font-semibold">{user?.displayName || "User"}</h1>
                    <Link className="text-2xl font-bold hidden md:block" to="/home">
                        <span className="text-primary">Griho</span>Bondhon
                    </Link>
                    <img src={user?.photoURL || "https://via.placeholder.com/40"} alt="Profile" className="w-12 h-12 object-cover rounded-full border" />
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

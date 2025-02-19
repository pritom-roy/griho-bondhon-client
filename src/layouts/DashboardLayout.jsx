import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaUser, FaSignOutAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
    const { logOut, role, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => navigate("/home"))
            .catch(error => console.log("Error logging out:", error.message));
    };

    const menuItems = (
        <>
            <Link className={`flex items-center px-4 pb-2 rounded-md ${location === '/dashboard' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="/dashboard">
                <FaHome className="mr-2" /> Home
            </Link>
            <Link className={`flex items-center px-4 py-2 rounded-md ${location === '/contact' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="/contact">
                <FaEnvelope className="mr-2" /> Contact Us
            </Link>
            <button onClick={handleLogOut} className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-primary hover:text-white">
                <FaSignOutAlt className="mr-2" /> Logout
            </button>
            <hr className="my-4" />
            {role === 'admin' ? (
                <>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/admin-dashboard' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="admin-dashboard">Admin Dashboard</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/manage-user' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="manage-user">Manage Users</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/approve-premium' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="approve-premium">Approve Premium</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/approve-request' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="approve-request">Approve Requests</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/success-story-admin' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="success-story-admin">Success Stories</Link>
                </>
            ) : (
                <>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/edit-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="edit-data">Edit Biodata</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/view-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="view-data">View Biodata</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/contact-request' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="contact-request">My Contact Requests</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/favourite-data' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="favourite-data">Favourite Biodata</Link>
                    <Link className={`px-4 py-2 rounded-md ${location === '/dashboard/success-story-user' ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-primary hover:text-white`} to="success-story-user">Success Story</Link>
                </>
            )}
        </>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Sidebar for Desktop */}
            <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
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
            <main className="flex-1 p-2 w-full">
                {/* Top Bar */}
                <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-md mb-5">
                    <h1 className="text-xl font-semibold">{user?.displayName || "User"}</h1>
                    <Link className="text-2xl font-bold" to="/home">
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

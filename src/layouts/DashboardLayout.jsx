import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
    const { logOut, role } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate('/home');
        logOut()
            .then(() => {
                console.log("logged out");
            })
            .catch(error => {
                console.log("Error logging out:", error.message);
            });
    }

    const location = useLocation().pathname;
    console.log(location);

    return (
        <div className="md:w-10/12 mx-auto">
            <div className="flex flex-col md:grid grid-cols-8 gap-4">
                <div className="col-span-2">
                    {
                        role === 'admin' ?
                            <div className="flex flex-col w-10/12 mx-auto">
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/admin-dashboard' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='admin-dashboard'>Admin Dashboard
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/manage-user' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='manage-user'>Manage User
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/approve-premium' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='approve-premium'>Approve Premium
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/approve-request' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='approve-request'>Approve Request
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/success-story-admin' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='success-story-admin'>Success Stories
                                </Link>
                                <button onClick={handleLogOut} className="px-3 py-2 my-2 text-center rounded-md text-white bg-gray-600 hover:bg-primary">Logout</button>
                            </div> :
                            <div className="flex flex-col w-10/12 mx-auto">
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/edit-data' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='edit-data'>Edit Biodata
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/view-data' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='view-data'>View Biodata
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/contact-request' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='contact-request'>My Contact Requests
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/favourite-data' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='favourite-data'>Favourite Biodata
                                </Link>
                                <Link
                                    className={`px-3 py-2 my-1 md:my-2 text-center rounded-md ${location === '/dashboard/success-story-user' ? 'bg-primary' : ''} text-white bg-gray-600 hover:bg-primary`}
                                    to='success-story-user'>Success Story
                                </Link>
                                <button onClick={handleLogOut} className="px-3 py-2 my-2 text-center rounded-md text-white bg-gray-600 hover:bg-primary">Logout</button>
                            </div>
                    }
                </div>
                <div className="col-span-6">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
// {
//     path: 'edit-data',
//         element: <EditBiodata />
// },
// {
//     path: 'view-data',
//         element: <ViewBiodata />
// },
// {
//     path: 'contact-request',
//         element: <MyContactRequest />
// },
// {
//     path: 'favourite-data',
//         element: <FavouriteBiodata />
// },
// {
//     path: 'admin-dashboard',
//         element: <AdminDashboard />
// },
// {
//     path: 'manage-user',
//         element: <ManageUser />
// },
// {
//     path: 'approve-premium',
//         element: <ApprovePremium />
// },
// {
//     path: 'approve-request',
//         element: <ApproveContactRequest />
// },
export default DashboardLayout;
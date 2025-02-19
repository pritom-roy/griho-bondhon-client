import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FcApproval } from 'react-icons/fc';
import Loading from '../../../../shared/loading/Loading';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Dashboard | Users";
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://griho-bandhan-server.vercel.app/users?username=${search}`);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const makeAdmin = async (id) => {
        try {
            await axios.patch(`https://griho-bandhan-server.vercel.app/users/admin/${id}`);
            fetchUsers();
            Toast.fire({
                icon: 'success',
                title: 'Admin approval successful',
            });
        } catch (error) {
            console.error("Error making user admin:", error);
        }
    };

    const makePremium = async (id) => {
        try {
            await axios.patch(`https://griho-bandhan-server.vercel.app/users/premium/${id}`);
            fetchUsers();
            Toast.fire({
                icon: 'success',
                title: `Premium approval successful`,
            });
        } catch (error) {
            console.error("Error making user premium:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div>
                    {/* Table for larger devices */}
                    <div className="hidden md:block">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border px-4 py-2 text-left text-gray-600">Username</th>
                                    <th className="border px-4 py-2 text-left text-gray-600">Email</th>
                                    <th className="border px-4 py-2 text-left text-gray-600">Role</th>
                                    <th className="border px-4 py-2 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">{user.username}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                        <td className="border px-4 py-2">
                                            <div className='flex flex-col justify-center items-center'>
                                                {user.role === 'admin' && user.isPremium && <FcApproval className='text-2xl' />}
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => makeAdmin(user._id)}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 transition duration-300 hover:bg-blue-600"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                                {!user.isPremium && (
                                                    <button
                                                        onClick={() => makePremium(user._id)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600"
                                                    >
                                                        Make Premium
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card view for small devices */}
                    <div className="block md:hidden space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-white border rounded-lg p-4 shadow-md transition duration-300 hover:shadow-lg"
                            >
                                <p>
                                    <span className="font-bold">Username:</span> {user.username}
                                </p>
                                <p>
                                    <span className="font-bold">Email:</span> {user.email}
                                </p>
                                <p>
                                    <span className="font-bold">Role:</span> {user.role}
                                </p>
                                <div className="flex flex-col mt-4">
                                    {user.role === 'admin' && user.isPremium && <FcApproval className="text-2xl mx-auto" />}
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => makeAdmin(user._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 transition duration-300 hover:bg-blue-600"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                    {!user.isPremium && (
                                        <button
                                            onClick={() => makePremium(user._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600"
                                        >
                                            Make Premium
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;

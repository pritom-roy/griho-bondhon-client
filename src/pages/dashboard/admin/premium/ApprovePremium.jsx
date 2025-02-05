import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../../shared/loading/Loading';

const ApprovePremium = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        document.title = "Dashboard | Premiums";
    }, []);

    useEffect(() => {
        fetchPremiumRequests();
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

    const fetchPremiumRequests = async () => {
        try {
            const { data } = await axios.get('https://griho-bandhan-server.vercel.app/premium/requests');
            setRequests(data);
        } catch (error) {
            console.error("Error fetching premium requests:", error);
        }
    };

    const approvePremium = async (email) => {
        try {
            await axios.patch(`https://griho-bandhan-server.vercel.app/premium/approve/${email}`);
            fetchPremiumRequests();
            Toast.fire({
                icon: 'success',
                title: 'Admin approval successful',
            });
        } catch (error) {
            console.error("Error approving premium:", error);
        }
    };

    if (!requests) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approved Premium</h1>

            {/* Display as a table for larger screens */}
            <div className="hidden md:block">
                <table className="min-w-full bg-white border text-center">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Biodata ID</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td className="border px-4 py-2">{request?.name}</td>
                                <td className="border px-4 py-2">{request?.contactEmail}</td>
                                <td className="border px-4 py-2">{request?.biodataId}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => approvePremium(request.contactEmail)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Make Premium
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display as cards for smaller screens */}
            <div className="block md:hidden space-y-4">
                {requests.map((request) => (
                    <div
                        key={request._id}
                        className="bg-white p-4 rounded shadow-md border flex flex-col space-y-2"
                    >
                        <div>
                            <span className="font-bold">Name:</span> {request?.name}
                        </div>
                        <div>
                            <span className="font-bold">Email:</span> {request?.contactEmail}
                        </div>
                        <div>
                            <span className="font-bold">Biodata ID:</span> {request?.biodataId}
                        </div>
                        <button
                            onClick={() => approvePremium(request.contactEmail)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Make Premium
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApprovePremium;

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Loading from "../../../../shared/loading/Loading";

const MyContactRequest = () => {
    useEffect(() => {
        document.title = "Dashboard | MyRequests";
    }, []);
    const { user } = useContext(AuthContext);
    const [contactRequests, setContactRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContactRequests();
    }, [user?.email]);

    const fetchContactRequests = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://griho-bandhan-server.vercel.app/contact-requests?userEmail=${user?.email}`);
            setContactRequests(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching contact requests:", error);
            setLoading(false);
        }
    };

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`https://griho-bandhan-server.vercel.app/contact-requests/${id}`);
            fetchContactRequests();
        } catch (error) {
            console.error("Error deleting contact request:", error);
        }
    };

    return (
        <div className="mt-2 p-6 rounded-xl bg-white">
            <h1 className="text-2xl mb-6 font-bold">My Contact Requests</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Table for larger screens */}
                    <div className="hidden md:block">
                        <table className="min-w-full bg-white border shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr className="text-left">
                                    <th className="border px-6 py-3 text-gray-700">Name</th>
                                    <th className="border px-6 py-3 text-gray-700">Biodata ID</th>
                                    <th className="border px-6 py-3 text-gray-700">Status</th>
                                    <th className="border px-6 py-3 text-gray-700">Mobile No</th>
                                    <th className="border px-6 py-3 text-gray-700">Email</th>
                                    <th className="border px-6 py-3 text-gray-700 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactRequests.map((request, index) => (
                                    <tr key={request._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="border px-6 py-3 text-gray-700">{request.name}</td>
                                        <td className="border px-6 py-3 text-gray-700">{request.id}</td>
                                        <td className="border px-6 py-3 text-gray-700">
                                            {request.isApproved ? (
                                                <span className="text-green-600 font-semibold">Approved</span>
                                            ) : (
                                                <span className="text-yellow-600 font-semibold">Pending</span>
                                            )}
                                        </td>
                                        <td className="border px-6 py-3 text-gray-700">
                                            {request.isApproved ? request.mobileNumber : "Waiting for Approval"}
                                        </td>
                                        <td className="border px-6 py-3 text-gray-700">
                                            {request.isApproved ? request.contactEmail : "Waiting for Approval"}
                                        </td>
                                        <td className="border px-6 py-3 text-center">
                                            <button
                                                onClick={() => deleteRequest(request._id)}
                                                className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for smaller screens */}
                    <div className="block md:hidden space-y-4">
                        {contactRequests.map((request) => (
                            <div
                                key={request._id}
                                className="bg-white p-4 rounded-lg shadow-md border space-y-2"
                            >
                                <div>
                                    <span className="font-semibold text-gray-800">Name:</span> {request.name}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Biodata ID:</span> {request.id}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Status:</span>{" "}
                                    {request.isApproved ? (
                                        <span className="text-green-600 font-semibold">Approved</span>
                                    ) : (
                                        <span className="text-yellow-600 font-semibold">Pending</span>
                                    )}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Mobile No:</span>{" "}
                                    {request.isApproved ? request.mobileNumber : "Waiting for Approval"}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Email:</span>{" "}
                                    {request.isApproved ? request.contactEmail : "Waiting for Approval"}
                                </div>
                                <button
                                    onClick={() => deleteRequest(request._id)}
                                    className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyContactRequest;

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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Contact Requests</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Table for larger screens */}
                    <div className="hidden md:block">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Biodata ID</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Mobile No</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactRequests.map((request) => (
                                    <tr key={request._id}>
                                        <td className="border px-4 py-2">{request.name}</td>
                                        <td className="border px-4 py-2">{request.id}</td>
                                        <td className="border px-4 py-2">
                                            {request.isApproved ? "Approved" : "Pending"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {request.isApproved ? request.mobileNumber : "Waiting for Approval"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {request.isApproved ? request.contactEmail : "Waiting for Approval"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => deleteRequest(request._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded w-full"
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
                                className="bg-white p-4 rounded shadow-md border flex flex-col space-y-2"
                            >
                                <div>
                                    <span className="font-bold">Name:</span> {request.name}
                                </div>
                                <div>
                                    <span className="font-bold">Biodata ID:</span> {request.id}
                                </div>
                                <div>
                                    <span className="font-bold">Status:</span> {request.isApproved ? "Approved" : "Pending"}
                                </div>
                                <div>
                                    <span className="font-bold">Mobile No:</span> {request.isApproved ? request.mobileNumber : "Waiting for Approval"}
                                </div>
                                <div>
                                    <span className="font-bold">Email:</span> {request.isApproved ? request.contactEmail : "Waiting for Approval"}
                                </div>
                                <button
                                    onClick={() => deleteRequest(request._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
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

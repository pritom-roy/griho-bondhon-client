import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../../shared/loading/Loading";

const ApproveContactRequest = () => {
    const [contactRequests, setContactRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Dashboard | Requests";
    }, []);

    useEffect(() => {
        fetchContactRequests();
    }, []);

    const fetchContactRequests = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("https://griho-bandhan-server.vercel.app/admin/contact-requests");
            setContactRequests(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching contact requests:", error);
            setLoading(false);
        }
    };

    const approveRequest = async (id) => {
        try {
            await axios.patch(`https://griho-bandhan-server.vercel.app/admin/contact-requests/approve/${id}`);
            fetchContactRequests(); // Refresh the data after approval
        } catch (error) {
            console.error("Error approving contact request:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approve Contact Requests</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Table for larger devices */}
                    <table className="hidden sm:table min-w-full bg-white border text-center">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Asked By</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Contact Email</th>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactRequests.map((request) => (
                                <tr key={request._id}>
                                    <td className="border px-4 py-2">{request.userEmail}</td>
                                    <td className="border px-4 py-2">{request.name}</td>
                                    <td className="border px-4 py-2">{request.contactEmail}</td>
                                    <td className="border px-4 py-2">{request.id}</td>
                                    <td className="border px-4 py-2">
                                        {!request.isApproved ? (
                                            <button
                                                onClick={() => approveRequest(request._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Approve Contact
                                            </button>
                                        ) : (
                                            <span className="text-green-500">Approved</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Cards for small devices */}
                    <div className="sm:hidden space-y-4">
                        {contactRequests.map((request) => (
                            <div
                                key={request._id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                <p>
                                    <strong>Asked By:</strong> {request.userEmail}
                                </p>
                                <p>
                                    <strong>Name:</strong> {request.name}
                                </p>
                                <p>
                                    <strong>Contact Email:</strong> {request.contactEmail}
                                </p>
                                <p>
                                    <strong>ID:</strong> {request.id}
                                </p>
                                <div className="mt-4">
                                    {!request.isApproved ? (
                                        <button
                                            onClick={() => approveRequest(request._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Approve Contact
                                        </button>
                                    ) : (
                                        <span className="text-green-500">Approved</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ApproveContactRequest;

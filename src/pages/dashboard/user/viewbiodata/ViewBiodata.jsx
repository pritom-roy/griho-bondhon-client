import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../context/AuthContext";
import Loading from "../../../../shared/loading/Loading";

const ViewBiodata = () => {
    useEffect(() => {
        document.title = "Dashboard | ViewData";
    }, []);
    const { user } = useContext(AuthContext);
    const [biodata, setBiodata] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    // Fetch biodata by user email
    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const res = await axios.get(`https://griho-bandhan-server.vercel.app/biodata/${user?.email}`);
                setBiodata(res.data);
            } catch (error) {
                console.error("Error fetching biodata:", error);
                Swal.fire("Error", "Unable to fetch biodata.", "error");
            }
        };

        if (user?.email) {
            fetchBiodata();
        }
    }, [user]);

    // Check if the user is premium
    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (biodata?.contactEmail) {
                try {
                    const response = await axios.get(
                        `https://griho-bandhan-server.vercel.app/biodata/premium/ispresent?contactEmail=${biodata.contactEmail}`
                    );
                    setIsPremium(response.data.isPremium);
                } catch (error) {
                    console.error("Error checking premium status:", error);
                }
            }
        };

        checkPremiumStatus();
    }, [biodata?.contactEmail]);

    console.log(isPremium)

    // Handle premium request
    const handleMakePremium = async () => {
        try {
            const res = await axios.post(`https://griho-bandhan-server.vercel.app/biodata/premium`, {
                contactEmail: user.email,
                name: biodata.name,
                biodataId: biodata.biodataId

            });
            setIsModalOpen(false);
            Swal.fire("Success", res.data.message, "success");
            setIsPremium(true);
        } catch (error) {
            console.error("Error making premium request:", error);
            Swal.fire("Error", "Unable to make premium request.", "error");
        }
    };

    if (!biodata) {
        return <Loading />;
    }

    return (
        <div className="mx-auto px-4 mt-2 pb-8">
            <div className="bg-white rounded-lg px-6 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                    <img
                        src={biodata.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto border-4 border-primary object-cover"
                    />
                    <h2 className="text-2xl font-semibold mt-4">{biodata.name}</h2>
                    <p className="text-gray-600">{biodata.biodataType}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Date of Birth:</strong> {biodata.dob}</div>
                    <div><strong>Age:</strong> {biodata.age}</div>
                    <div><strong>Height:</strong> {biodata.height}</div>
                    <div><strong>Weight:</strong> {biodata.weight}</div>
                    <div><strong>Occupation:</strong> {biodata.occupation}</div>
                    <div><strong>Race:</strong> {biodata.race}</div>
                    <div><strong>Fathers Name:</strong> {biodata.fathersName}</div>
                    <div><strong>Mothers Name:</strong> {biodata.mothersName}</div>
                    <div><strong>Permanent Division:</strong> {biodata.permanentDivision}</div>
                    <div><strong>Present Division:</strong> {biodata.presentDivision}</div>
                    <div><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</div>
                    <div><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</div>
                    <div><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</div>
                    <div><strong>Contact Email:</strong> {biodata.contactEmail}</div>
                    <div><strong>Mobile Number:</strong> {biodata.mobileNumber}</div>
                </div>

                <div className="text-center mt-6">
                    {biodata.isPremium ? (
                        <button className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-not-allowed" disabled>
                            Premium Biodata
                        </button>
                    ) : isPremium ? (
                        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg cursor-not-allowed" disabled>
                            Request Pending
                        </button>
                    ) : (
                        <button
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Make Biodata Premium
                        </button>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-center mb-4">Confirm Premium Request</h2>
                        <p className="text-center mb-6">
                            Are you sure you want to make your biodata premium?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                onClick={handleMakePremium}
                                disabled={biodata.isPremium || isPremium}
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBiodata;

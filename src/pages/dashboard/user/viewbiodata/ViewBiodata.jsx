import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../context/AuthContext";
import Loading from "../../../../shared/loading/Loading";
import { FaStar, FaUserShield } from "react-icons/fa";

const ViewBiodata = () => {
    useEffect(() => {
        document.title = "Dashboard | ViewData";
    }, []);
    const { user } = useContext(AuthContext);
    const [biodata, setBiodata] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

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
        if (user?.email) fetchBiodata();
    }, [user]);

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

    if (!biodata) return <Loading />;

    return (
        <div className="mx-auto mt-2 bg-white rounded-lg shadow-lg">
            <div className="bg-white rounded-lg shadow-lg p-6 grid md:grid-cols-2 gap-6">
                <div className="text-center border-r pr-6">
                    <img
                        src={biodata.profileImage}
                        alt="Profile"
                        className="w-36 h-36 rounded-full mx-auto border-4 border-primary object-cover shadow-md"
                    />
                    <h2 className="text-2xl font-bold mt-4 text-gray-800 flex items-center justify-center gap-2">
                        <FaUserShield className="text-blue-500" /> {biodata.name}
                    </h2>
                    <p className="text-gray-600">{biodata.biodataType}</p>
                    <p className="text-gray-500 mt-2">📧 {biodata.contactEmail}</p>
                    <p className="text-gray-500">📞 {biodata.mobileNumber}</p>
                    <div className="mt-4 flex justify-center">
                        {biodata.isPremium ? (
                            <button className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
                                <FaStar /> Premium Biodata
                            </button>
                        ) : isPremium ? (
                            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
                                <FaStar /> Request Pending
                            </button>
                        ) : (
                            <button
                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FaStar /> Make Biodata Premium
                            </button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div><strong>🎂 Date of Birth:</strong> {biodata.dob}</div>
                    <div><strong>📅 Age:</strong> {biodata.age}</div>
                    <div><strong>📏 Height:</strong> {biodata.height}</div>
                    <div><strong>⚖️ Weight:</strong> {biodata.weight}</div>
                    <div><strong>💼 Occupation:</strong> {biodata.occupation}</div>
                    <div><strong>🌍 Race:</strong> {biodata.race}</div>
                    <div><strong>👨‍👩‍👦 Father’s Name:</strong> {biodata.fathersName}</div>
                    <div><strong>👩‍👧 Mother’s Name:</strong> {biodata.mothersName}</div>
                    <div><strong>🏠 Permanent Division:</strong> {biodata.permanentDivision}</div>
                    <div><strong>📍 Present Division:</strong> {biodata.presentDivision}</div>
                    <div><strong>💑 Expected Partner Age:</strong> {biodata.expectedPartnerAge}</div>
                    <div><strong>📏 Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</div>
                    <div><strong>⚖️ Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Upgrade to Premium</h2>
                        <p>Are you sure you want to upgrade your biodata to premium?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={handleMakePremium}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBiodata;
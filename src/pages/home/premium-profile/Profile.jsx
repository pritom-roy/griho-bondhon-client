import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { FaUser, FaIdCard, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchProfiles();
    }, [sortOrder]);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get(`https://griho-bandhan-server.vercel.app/premium-profiles?sort=${sortOrder}`);
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching premium profiles:", error);
        }
    };

    const handleViewProfile = (id) => {
        if (user) {
            navigate(`/biodatas/${id}`);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto md:pb-16 pb-5">
            <h2 className="text-3xl uppercase font-bold mb-6 text-center">Premium Members</h2>

            {/* Sorting Dropdown */}
            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded bg-white shadow"
                >
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                    <div key={profile.biodataId} className="p-5 border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
                        {/* Profile Image */}
                        <div className="relative">
                            <img src={profile.profileImage} alt={profile.name} className="w-full h-52 object-cover rounded-lg" />
                            <span className={`absolute top-3 left-3 ${profile.biodataType === 'Male' ? 'bg-blue-500' : 'bg-primary'} text-white px-3 py-1 text-sm font-semibold rounded-md`}>
                                {profile.biodataType}
                            </span>
                        </div>

                        {/* Profile Details */}
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUser className="text-indigo-600" /> {profile.name}
                            </h3>

                            <div className="text-gray-600 mt-2 space-y-2">
                                <p className="flex items-center gap-2"><FaIdCard className="text-indigo-500" /> <span className="font-medium">Biodata ID:</span> {profile.biodataId}</p>
                                <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> <span className="font-medium">Division:</span> {profile.permanentDivision}</p>
                                <p className="flex items-center gap-2"><FaCalendarAlt className="text-green-500" /> <span className="font-medium">Age:</span> {profile.age} years</p>
                                <p className="flex items-center gap-2"><FaBriefcase className="text-yellow-500" /> <span className="font-medium">Occupation:</span> {profile.occupation}</p>
                            </div>

                            {/* View Profile Button */}
                            <button
                                onClick={() => handleViewProfile(profile.biodataId)}
                                className="mt-5 w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-red-500 transition"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending

    useEffect(() => {
        fetchProfiles();
    }, [sortOrder]);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get(`https://griho-bandhan-server.vercel.app/premium-profiles?sort=${sortOrder}`);
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching premium profiles:', error);
        }
    };

    const handleViewProfile = (id) => {
        if (user) {
            navigate(`/biodatas/${id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto md:pb-16 pb-5">
            <h2 className="text-3xl uppercase font-bold mb-6 text-center">Premium Members</h2>
            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
                {profiles.map((profile) => (
                    <div key={profile.biodataId} className="p-4 border rounded-lg shadow">
                        <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-lg font-bold mt-2">{profile.name}</h3>
                        <p>Biodata ID: {profile.biodataId}</p>
                        <p>Type: {profile.biodataType}</p>
                        <p>Division: {profile.permanentDivision}</p>
                        <p>Age: {profile.age}</p>
                        <p>Occupation: {profile.occupation}</p>
                        <button
                            onClick={() => handleViewProfile(profile.biodataId)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

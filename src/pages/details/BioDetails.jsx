import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../shared/loading/Loading';

const BioDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [biodata, setBiodata] = useState(null);
    const [similarBiodatas, setSimilarBiodatas] = useState([]);
    const [premium, setPremium] = useState(true);

    useEffect(() => {
        document.title = "GrihoBondhon | Biodatas | Details";
    }, []);

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const { data } = await axios.get(`https://griho-bandhan-server.vercel.app/biodata/viewdata/${id}`);
                setBiodata(data);

                const { data: similar } = await axios.get('https://griho-bandhan-server.vercel.app/biodata', {
                    params: { type: data.biodataType },
                });
                setSimilarBiodatas(similar.biodatas.slice(0, 3));
            } catch (error) {
                console.error('Error fetching biodata details:', error);
            }
        };

        // Check premium status
        const checkPremium = async () => {
            try {
                const response = await axios.get(`https://griho-bandhan-server.vercel.app/users/${user.email}`);
                if (response?.data?.isPremium) {
                    setPremium(response.data.role);
                    console.log(premium);
                }
            } catch (error) {
                console.error('Error checking premium status:', error);
            }
        };

        fetchBiodata();
        checkPremium();
    }, [id, user, premium]);

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
    const handleAddToFavourites = async () => {
        const payload = {
            email: user?.email,
            biodataId: id,
            name: biodata.name,
            image: biodata.profileImage,
            occupation: biodata.occupation,
            address: biodata.presentDivision
        }
        try {
            await axios.post('https://griho-bandhan-server.vercel.app/biodata/favourite', payload);
            // console.log(payload);
            Toast.fire({
                icon: 'success',
                title: 'Added to Favourites',
            });
        } catch (error) {
            console.error('Error adding to favourites:', error);
        }
    };

    const handleRequestContact = () => {
        navigate(`/checkout/${id}`);
    };

    if (!biodata || !user) return <Loading />;

    return (
        <div className="p-4">
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <img
                    src={biodata.profileImage}
                    alt={biodata.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl text-center font-bold mb-2">{biodata.name}</h2>
                <p>Age: {biodata.age}</p>
                <p>Division: {biodata.permanentDivision}</p>
                <p>Occupation: {biodata.occupation}</p>
                <p>Email: {user?.isPremium === 'premium' || biodata.contactEmail === user.email ? biodata.contactEmail : '*************'}</p>
                <p>Phone: {user?.isPremium === 'premium' || biodata.contactEmail === user.email ? biodata.mobileNumber : '*************'}</p>
                {
                    (biodata.contactEmail === user.email) ?
                        <button className='px-3 py-2 bg-primary cursor-not-allowed rounded-md text-white mt-3'>My Profile</button>
                        :
                        <button
                            onClick={handleAddToFavourites}
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        >
                            Add to Favourites
                        </button>
                }
                {!user?.isPremium && biodata.contactEmail !== user.email && (
                    <button
                        onClick={handleRequestContact}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-2 ml-1"
                    >
                        Request Contact Information
                    </button>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">Similar Biodatas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {similarBiodatas.map((similar) => (
                        <div key={similar.biodataId} className="border p-4 rounded-lg">
                            <img
                                src={similar.profileImage}
                                alt={similar.name}
                                className="w-20 h-20 rounded-full mx-auto mb-2"
                            />
                            <h4 className="text-center font-bold">{similar.name}</h4>
                            <p>Division: {similar.permanentDivision}</p>
                            <p>Age: {similar.age}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BioDetails;

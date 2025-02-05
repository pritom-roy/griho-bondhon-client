import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../shared/loading/Loading';

const Checkout = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [biodata, setBiodata] = useState(null);
    const [isPresent, setIsPresent] = useState(null);

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });


    useEffect(() => {
        // Fetch biodata details
        const fetchBiodata = async () => {
            try {
                const { data } = await axios.get(`https://griho-bandhan-server.vercel.app/biodata/viewdata/${id}`);
                setBiodata(data);
            } catch (error) {
                console.error('Error fetching biodata details:', error);
            }
        };

        fetchBiodata();
    }, [id, user]);

    useEffect(() => {
        checkPresentStatus();
    }, [user?.email]);

    const checkPresentStatus = async () => {
        if (user.email) {
            try {
                const response = await axios.get(
                    `https://griho-bandhan-server.vercel.app/biodata/request/ispresent?id=${id}&contactEmail=${user?.email}`
                );
                setIsPresent(response.data.present);
            } catch (error) {
                console.error("Error checking premium status:", error);
            }
        }
    };

    console.log(isPresent);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id,
                userEmail: user?.email,
                name: biodata?.name,
                profileImage: biodata?.profileImage,
                contactEmail: biodata?.contactEmail,
                mobileNumber: biodata?.mobileNumber,
                isApproved: false
            }
            await axios.post('https://griho-bandhan-server.vercel.app/biodata/request', payload);
            checkPresentStatus();
            Toast.fire({
                icon: "success",
                title: "Pending admin approval."
            });
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    if (!biodata || !user) return <Loading />

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Request Contact Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Biodata ID:</label>
                    <input
                        type="text"
                        value={id}
                        readOnly
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label>Your Email:</label>
                    <input
                        type="text"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label>Card Information:</label>
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                {
                    isPresent ?
                        <button type="button" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 cursor-not-allowed">
                            Requested
                        </button>
                        :
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">
                            Submit
                        </button>

                }
            </form>
        </div>
    );
};

export default Checkout;

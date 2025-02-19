import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../context/AuthContext';

const SuccessStoryUser = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        selfBiodataId: '',
        partnerBiodataId: '',
        coupleImage: '',
        successStory: '',
        marriageDate: '', // Added field
    });
    const [isStoryExisting, setIsStoryExisting] = useState(false);

    useEffect(() => {
        const fetchExistingStory = async () => {
            try {
                const response = await axios.get(`https://griho-bandhan-server.vercel.app/stories/check/${user.email}`);
                if (response.data.story) {
                    const { maleId, femaleId, coupleImage, successStory, marriageDate } = response.data.story;
                    setFormData({
                        selfBiodataId: maleId || femaleId,
                        partnerBiodataId: femaleId || maleId,
                        coupleImage,
                        successStory,
                        marriageDate: marriageDate || '',
                    });
                    setIsStoryExisting(true);
                }
            } catch (error) {
                console.error('Error fetching existing story:', error);
            }
        };

        fetchExistingStory();
    }, [user.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { selfBiodataId, partnerBiodataId, coupleImage, successStory, marriageDate } = formData;

        if (!isStoryExisting && selfBiodataId === partnerBiodataId) {
            Swal.fire('Error', 'Self Biodata ID and Partner Biodata ID cannot be the same.', 'error');
            return;
        }

        try {
            // Submit or update success story
            const response = await axios.post('https://griho-bandhan-server.vercel.app/stories', {
                selfBiodataId,
                partnerBiodataId,
                coupleImage,
                successStory,
                marriageDate,
                userEmail: user.email,
            });

            if (response.status === 201 || response.status === 200) {
                Swal.fire(
                    'Success',
                    isStoryExisting ? 'Your success story has been updated!' : 'Your success story has been submitted!',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error submitting success story:', error.response?.data || error.message);
            Swal.fire('Error', error.response?.data?.error || 'Something went wrong.', 'error');
        }
    };

    return (
        <div className="mt-2 mx-auto p-6 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-6">{isStoryExisting ? 'Update Success Story' : 'Got Married'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex flex-col md:flex-row md:justify-between w-full md: gap-4'>
                    <div className='flex-1'>
                        <label className="block font-medium md:mb-0 mb-1">Self Biodata ID</label>
                        <input
                            type="text"
                            name="selfBiodataId"
                            value={formData.selfBiodataId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            readOnly={isStoryExisting} // Make it read-only if story exists
                            required
                        />
                    </div>
                    <div className='flex-1'>
                        <label className="block font-medium md:mb-0 mb-1">Partner Biodata ID</label>
                        <input
                            type="text"
                            name="partnerBiodataId"
                            value={formData.partnerBiodataId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            readOnly={isStoryExisting}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium mb-1">Couple Image Link</label>
                    <input
                        type="text"
                        name="coupleImage"
                        value={formData.coupleImage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Success Story Review</label>
                    <textarea
                        name="successStory"
                        value={formData.successStory}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium mb-1">Date of Marriage</label>
                    <input
                        type="date"
                        name="marriageDate"
                        value={formData.marriageDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className="px-4 py-2 bg-primary hover:bg-green-600 text-white rounded">
                        {isStoryExisting ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SuccessStoryUser;

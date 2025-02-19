import { useEffect, useState } from 'react';
import axios from 'axios';

const SuccessStoryAdmin = () => {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch success stories from the backend
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('https://griho-bandhan-server.vercel.app/admin/success-stories');
                setStories(response.data);
            } catch (error) {
                console.error('Error fetching success stories:', error);
            }
        };

        fetchStories();
    }, []);

    const openModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStory(null);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Success Stories</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 border-b">Male Biodata ID</th>
                            <th className="py-3 px-4 border-b">Female Biodata ID</th>
                            <th className="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-center">{story.maleId}</td>
                                <td className="py-3 px-4 border-b text-center">{story.femaleId}</td>
                                <td className="py-3 px-4 border-b text-center">
                                    <button
                                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                        onClick={() => openModal(story)}
                                    >
                                        View Story
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedStory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl p-4 md:p-6 mx-4">
                        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Success Story</h2>
                        <img
                            src={selectedStory.coupleImage}
                            alt="Couple"
                            className="w-full h-40 md:h-64 object-cover rounded mb-3 md:mb-4"
                        />
                        <p className="text-sm md:text-base mb-3 md:mb-4">{selectedStory.successStory}</p>
                        <div className="flex justify-end">
                            <button
                                className="px-3 md:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm md:text-base"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SuccessStoryAdmin;
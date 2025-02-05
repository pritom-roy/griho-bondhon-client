import { useState, useEffect } from 'react';
import axios from 'axios';

const Marriages = () => {
    const [stories, setStories] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); // Default to descending

    useEffect(() => {
        fetchStories();
    }, [sortOrder]);

    const fetchStories = async () => {
        try {
            const response = await axios.get(`https://griho-bandhan-server.vercel.app/api/success-stories?sort=${sortOrder}`);
            setStories(response.data);
        } catch (error) {
            console.error('Error fetching success stories:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl uppercase font-bold mb-6 text-center">Success Stories</h2>
            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="asc">Sort by Date: Ascending</option>
                    <option value="desc">Sort by Date: Descending</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stories.map((story) => (
                    <div key={story._id} className="p-4 border rounded-lg shadow">
                        <img
                            src={story.coupleImage}
                            alt="Couple"
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-lg font-bold mt-2">
                            Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}
                        </h3>
                        <p className="text-gray-700 mt-2">
                            <strong>Success Story:</strong> {story.successStory}
                        </p>
                        <p className="text-gray-600">
                            <strong>Uploaded By:</strong> {story.userEmail}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marriages;
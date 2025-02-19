import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Loading from "../../../../shared/loading/Loading";

const FavouriteBiodata = () => {
    useEffect(() => {
        document.title = "Dashboard | Favourites";
    }, []);

    const { user } = useContext(AuthContext);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavourites();
    }, [user?.email]);

    const fetchFavourites = async () => {
        try {
            if (user?.email) {
                setLoading(true);
                const { data } = await axios.get(`https://griho-bandhan-server.vercel.app/favourites?userEmail=${user.email}`);
                setFavourites(data);
            }
        } catch (error) {
            console.error("Error fetching favourites:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFavourite = async (id) => {
        try {
            await axios.delete(`https://griho-bandhan-server.vercel.app/favourites/${id}`);
            setFavourites(favourites.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting favourite biodata:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Favourite Biodata</h1>

            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Table for larger screens */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Biodata ID</th>
                                    <th className="border px-4 py-2">Permanent Address</th>
                                    <th className="border px-4 py-2">Occupation</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favourites.map((favourite, index) => (
                                    <tr key={favourite._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="border px-4 py-2">{favourite.name}</td>
                                        <td className="border px-4 py-2">{favourite.biodataId}</td>
                                        <td className="border px-4 py-2">{favourite.address || "N/A"}</td>
                                        <td className="border px-4 py-2">{favourite.occupation || "N/A"}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => deleteFavourite(favourite._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for smaller screens */}
                    <div className="block md:hidden">
                        {favourites.map((favourite) => (
                            <div key={favourite._id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
                                <p className="text-gray-700">
                                    <strong>Name:</strong> {favourite.name}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Biodata ID:</strong> {favourite.biodataId}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Permanent Address:</strong> {favourite.address || "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Occupation:</strong> {favourite.occupation || "N/A"}
                                </p>
                                <button
                                    onClick={() => deleteFavourite(favourite._id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FavouriteBiodata;

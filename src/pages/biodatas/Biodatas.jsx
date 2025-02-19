import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../shared/loading/Loading';

const Biodatas = () => {
    const [biodatas, setBiodatas] = useState([]);
    const [filters, setFilters] = useState({
        ageMin: '',
        ageMax: '',
        type: '',
        division: '',
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [biodatas]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Add state for current page
    const [totalPages, setTotalPages] = useState(1); // Add state for total pages

    useEffect(() => {
        document.title = "GrihoBondhon | Biodatas";
    }, []);

    const fetchBiodatas = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get('https://griho-bandhan-server.vercel.app/biodata', {
                params: { ...filters, page },
            });
            setBiodatas(response.data.biodatas);
            setTotalPages(response.data.totalPages); // Update total pages
        } catch (error) {
            console.error('Error fetching biodatas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchBiodatas(page);
    };

    useEffect(() => {
        fetchBiodatas(currentPage);
    }, [filters]);

    return (
        <div className='bg-gray-100'>
            <div className="flex md:flex-row flex-col gap-6 py-4 w-11/12 md:w-10/12 mx-auto">
                {/* Filter Section */}
                <div className="md:w-1/4 bg-white/70 shadow-lg border p-4 rounded-lg">
                    <h2 className="text-lg md:text-xl text-center font-bold mb-4">Filters</h2>
                    <label className="block mb-2">
                        Age Range:
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="ageMin"
                                placeholder="Min"
                                value={filters.ageMin}
                                onChange={handleInputChange}
                                className="border p-1 rounded w-1/2"
                            />
                            <input
                                type="number"
                                name="ageMax"
                                placeholder="Max"
                                value={filters.ageMax}
                                onChange={handleInputChange}
                                className="border p-1 rounded w-1/2"
                            />
                        </div>
                    </label>
                    <label className="block mb-2">
                        Biodata Type:
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleInputChange}
                            className="border p-1 rounded w-full"
                        >
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        Division:
                        <select
                            name="division"
                            value={filters.division}
                            onChange={handleInputChange}
                            className="border p-1 rounded w-full"
                        >
                            <option value="">All</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </label>
                    <button
                        onClick={() => fetchBiodatas(1)}
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Biodata Display Section */}
                <div className="md:w-3/4 border p-2 md:p-6 rounded-lg shadow-lg bg-white/60">
                    <h2 className="text-lg md:text-xl text-center font-bold mb-4">Biodatas</h2>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {biodatas.map((biodata) => (
                                <div
                                    key={biodata.biodataId}
                                    className="border p-4 rounded-lg shadow-md"
                                >
                                    <img
                                        src={biodata.profileImage}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <h3 className="text-center font-bold">{biodata.name}</h3>
                                    <p>Division: {biodata.permanentDivision}</p>
                                    <p>Age: {biodata.age}</p>
                                    <p>Occupation: {biodata.occupation}</p>
                                    <Link
                                        to={`/biodatas/${biodata.biodataId}`}
                                        className="bg-green-500 text-white py-1 px-4 rounded mt-2 block mx-auto text-center"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-center items-center gap-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`py-1 px-3 rounded ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Biodatas;

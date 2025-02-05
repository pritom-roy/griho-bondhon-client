import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

const Counter = () => {
    const [counters, setCounters] = useState({
        totalBiodata: 0,
        totalMaleBiodata: 0,
        totalFemaleBiodata: 0,
        successfulMarriages: 0,
    });

    useEffect(() => {
        fetchCounterData();
    }, []);

    const fetchCounterData = async () => {
        try {
            const response = await axios.get('https://griho-bandhan-server.vercel.app/counters');
            setCounters(response.data);
        } catch (error) {
            console.error('Error fetching counter data:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 text-center">
            <h2 className="text-3xl font-bold mb-6 uppercase">Important Counts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-bold text-gray-800">Total Biodata</h3>
                    <p className="text-4xl font-bold text-primary mt-4">
                        <CountUp end={counters.totalBiodata} duration={2.5} />
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-bold text-gray-800">Male Biodata</h3>
                    <p className="text-4xl font-bold text-primary mt-4">
                        <CountUp end={counters.totalMaleBiodata} duration={2.5} />
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-bold text-gray-800">Female Biodata</h3>
                    <p className="text-4xl font-bold text-primary mt-4">
                        <CountUp end={counters.totalFemaleBiodata} duration={2.5} />
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-bold text-gray-800">Marriages Completed</h3>
                    <p className="text-4xl font-bold text-green-400 mt-4">
                        <CountUp end={counters.successfulMarriages} duration={2.5} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Counter;

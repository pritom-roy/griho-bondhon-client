import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Loading from '../../../../shared/loading/Loading';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [revenue, setRevenue] = useState(null);

    useEffect(() => {
        document.title = "Dashboard | Admin";
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('https://griho-bandhan-server.vercel.app/admin/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        const fetchRevenue = async () => {
            try {
                const { data } = await axios.get('https://griho-bandhan-server.vercel.app/revenue');
                setRevenue(data);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchStats();
        fetchRevenue();
    }, []);

    if (!stats || !revenue) return <Loading />;

    const chartData = {
        labels: ['Total Biodata', 'Male Biodata', 'Female Biodata', 'Premium Biodata'],
        datasets: [
            {
                label: 'Biodata Statistics',
                data: [
                    stats.totalBiodata,
                    stats.maleBiodata,
                    stats.femaleBiodata,
                    stats.premiumBiodata
                ],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'],
                hoverBackgroundColor: ['#2980b9', '#27ae60', '#c0392b', '#f39c12']
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };

    return (
        <div className="md:p-6 p-2 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenue</h2>
                    <p className="text-lg mb-4">
                        Total Revenue: <span className="font-bold text-green-500">${revenue[0].totalRevenue}</span>
                    </p>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Biodata Statistics</h2>
                    <ul className="text-lg space-y-2">
                        <li>Total Biodata: <span className="font-bold">{stats.totalBiodata}</span></li>
                        <li>Male Biodata: <span className="font-bold text-blue-500">{stats.maleBiodata}</span></li>
                        <li>Female Biodata: <span className="font-bold text-red-500">{stats.femaleBiodata}</span></li>
                        <li>Premium Biodata: <span className="font-bold text-yellow-500">{stats.premiumBiodata}</span></li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 h-60 md:h-[400px] flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold py-2 text-gray-700">Biodata Distribution</h2>
                    <div className="w-full h-full">
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
